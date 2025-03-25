
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { MLModel } from './types';
import { defaultModels } from './defaultModels';

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
