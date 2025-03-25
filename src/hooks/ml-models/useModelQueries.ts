
import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { MLModel } from './types';
import { defaultModels } from './defaultModels';
import { mapViolationsToRegulations } from '@/utils/violationAnalysis';

/**
 * Hook to fetch a single ML model by ID
 */
export function useMLModelById(modelId: string | undefined) {
  return useQuery({
    queryKey: ['ml-models', 'id', modelId],
    queryFn: async () => {
      if (!modelId) return null;
      
      const { data, error } = await supabase
        .from('ml_models')
        .select('*')
        .eq('id', modelId)
        .maybeSingle();
      
      if (error) throw error;
      return data as MLModel | null;
    },
    enabled: !!modelId
  });
}

/**
 * Hook to fetch ML models filtered by industry
 */
export function useMLModelsByIndustry(industry: string | null) {
  return useQuery({
    queryKey: ['ml-models', 'industry', industry],
    queryFn: async () => {
      if (!industry) return [];
      
      const { data, error } = await supabase
        .from('ml_models')
        .select('*')
        .eq(industry === 'All' ? 'active' : 'industry', industry === 'All' ? true : industry)
        .eq('active', true)
        .order('accuracy', { ascending: false });
      
      if (error) throw error;
      return data as MLModel[];
    },
    enabled: !!industry
  });
}

export function useAnalyzeViolation() {
  return useMutation({
    mutationFn: async ({ 
      image, 
      modelId, 
      industry 
    }: { 
      image: File | null, 
      modelId?: string,
      industry: string 
    }) => {
      if (!image) throw new Error('Image is required');
      
      // Upload image to temporary storage
      const timestamp = Date.now();
      const fileName = `${timestamp}_${image.name.replace(/\s+/g, '_')}`;
      const filePath = `temp_violations/${fileName}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('violations')
        .upload(filePath, image);
        
      if (uploadError) throw uploadError;
      
      // Get public URL for the uploaded image
      const { data: { publicUrl } } = supabase.storage
        .from('violations')
        .getPublicUrl(filePath);
        
      // Call the analyze-violation function
      const { data, error } = await supabase.functions.invoke('analyze-violation', {
        body: {
          imageUrl: publicUrl,
          modelId: modelId || 'yolov8',
          industry
        }
      });
      
      if (error) throw error;
      
      // Map violations to regulations
      const detections = await mapViolationsToRegulations(data.detections || [], industry);
      
      // Clean up temporary image
      await supabase.storage
        .from('violations')
        .remove([filePath]);
        
      return {
        ...data,
        detections,
        imagePreview: URL.createObjectURL(image)
      };
    }
  });
}
