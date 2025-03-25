
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { MLModel } from '@/hooks/useMLModels';
import { z } from 'zod';

export interface Detection {
  label?: string;
  confidence?: number;
  bbox?: [number, number, number, number];
  text?: string;
}

export interface TestResult {
  regulationIds: string[];
  relevanceScores: number[];
  confidence: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'open' | 'in-progress' | 'resolved';
  description: string;
  detections?: Detection[];
  imagePreview?: string | null;
  industry?: string;
  id?: string;
}

export const testModelSchema = z.object({
  model_id: z.string().min(1, 'Model is required'),
  violation_text: z.string().min(1, 'Violation description is required').or(z.literal('')),
  industry: z.string().min(1, 'Industry is required'),
});

export type TestModelFormValues = z.infer<typeof testModelSchema>;

export function useModelTest() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Initialize the violations bucket
  const initializeStorageBucket = async () => {
    try {
      // Call our edge function to ensure the storage bucket exists
      const { data, error } = await supabase.functions.invoke('create-storage-buckets');
      
      if (error) {
        console.error('Error initializing storage bucket:', error);
      }
      
      return !error;
    } catch (error) {
      console.error('Failed to initialize storage bucket:', error);
      return false;
    }
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size too large (max 5MB)');
        return;
      }
      
      setImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      // Clear the image and preview if no file selected
      setImage(null);
      setImagePreview(null);
    }
  };
  
  const submitModelTest = async (values: TestModelFormValues, selectedModel: MLModel | undefined) => {
    if (!values.violation_text && !image && selectedModel?.model_type !== 'Multimodal (Image + Text)') {
      toast.error('Please provide either text or an image');
      return null;
    }
    
    setIsSubmitting(true);
    
    try {
      // First, make sure the storage bucket is initialized
      const bucketInitialized = await initializeStorageBucket();
      if (!bucketInitialized && image) {
        throw new Error('Storage bucket could not be initialized. Please try again.');
      }
      
      // If there's an image, upload it to Supabase Storage first
      let uploadedImageUrl = '';
      
      if (image) {
        const timestamp = Date.now();
        const fileName = `${timestamp}_${image.name.replace(/\s+/g, '_')}`;
        const filePath = `violation_images/${fileName}`;
        
        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('violations')
          .upload(filePath, image);
        
        if (uploadError) {
          console.error('Error uploading image:', uploadError);
          throw new Error('Failed to upload image. Please try again.');
        }
        
        // Get the public URL
        const { data: { publicUrl } } = supabase.storage
          .from('violations')
          .getPublicUrl(filePath);
          
        uploadedImageUrl = publicUrl;
      }
      
      // Prepare the request payload
      const requestData: any = {
        violationText: values.violation_text || undefined,
        industry: values.industry,
        modelId: selectedModel?.name.toLowerCase().split(' ')[0].replace(/\+/g, '') || 'yolov8'
      };
      
      // If we have an uploaded image URL, include it
      if (uploadedImageUrl) {
        requestData.violationImageUrl = uploadedImageUrl;
      }
      
      // Call the Edge Function
      const { data, error } = await supabase.functions.invoke('analyze-violation', {
        body: requestData
      });
      
      if (error) throw error;
      
      // If no detections or very low confidence, show a warning
      if (!data.detections || data.detections.length === 0 || data.confidence < 0.3) {
        toast.info('No significant safety violations detected', {
          description: 'Our AI did not detect any clear safety violations in this image.'
        });
      }
      
      // Generate a unique ID for this result
      const resultId = `v-${Date.now().toString(36)}`;
      
      // Add the image preview and additional data to the result
      const resultWithImage = {
        ...data,
        imagePreview: imagePreview,
        industry: values.industry,
        id: resultId
      };
      
      setTestResult(resultWithImage);
      toast.success('Model analysis completed successfully');
      
      return resultWithImage;
    } catch (error: any) {
      console.error('Error testing model:', error);
      toast.error(error.message || 'Failed to test model');
      return null;
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const resetTest = () => {
    setTestResult(null);
    setImage(null);
    setImagePreview(null);
  };
  
  return {
    isSubmitting,
    image,
    testResult,
    imagePreview,
    handleImageChange,
    submitModelTest,
    resetTest
  };
}
