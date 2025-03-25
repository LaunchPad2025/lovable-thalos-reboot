
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { MLModel } from '@/hooks/useMLModels';
import { z } from 'zod';

export interface TestResult {
  regulationIds: string[];
  relevanceScores: number[];
  confidence: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'open' | 'in-progress' | 'resolved';
  description: string;
  detections?: any[];
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
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
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
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare the request payload
      const requestData: any = {
        violationText: values.violation_text || undefined,
        industry: values.industry,
        modelId: selectedModel?.name.toLowerCase().split(' ')[0].replace(/\+/g, '') || 'yolov8'
      };
      
      // If there's an image, include information about it
      if (image) {
        // In a production app, you would upload the image to storage first
        // For now, we'll just simulate with the image name
        requestData.violationImageUrl = `mock_url_for_${image.name}`;
      }
      
      // Call the Edge Function
      const { data, error } = await supabase.functions.invoke('analyze-violation', {
        body: requestData
      });
      
      if (error) throw error;
      
      setTestResult(data);
      toast.success('Model analysis completed successfully');
    } catch (error: any) {
      console.error('Error testing model:', error);
      toast.error(error.message || 'Failed to test model');
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
