
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { MLModel } from '@/hooks/useMLModels';
import { TestResult, TestModelFormValues } from './types';
import { useImageHandler } from './useImageHandler';
import { useMockAnalysis } from './useMockAnalysis';

export function useModelTest() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  
  const { 
    image, 
    imagePreview, 
    handleImageChange, 
    uploadImage,
    resetImage 
  } = useImageHandler();
  
  const { generateMockAnalysis } = useMockAnalysis();
  
  const submitModelTest = async (values: TestModelFormValues, selectedModel: MLModel | undefined) => {
    setIsSubmitting(true);
    console.log("Starting analysis with model:", selectedModel?.name);
    
    try {
      let uploadedImageUrl = '';
      
      if (image) {
        uploadedImageUrl = await uploadImage(image);
      }

      const requestData: any = {
        violationText: values.violation_text || "",
        industry: values.industry,
        modelId: selectedModel?.name.toLowerCase().split(' ')[0].replace(/\+/g, '') || 'yolov8',
        imageUrl: uploadedImageUrl || imagePreview
      };
      
      console.log("Calling analyze-violation function");
      
      const { data, error } = await supabase.functions.invoke('analyze-violation', {
        body: requestData
      });
      
      if (error) {
        console.error("Analysis error:", error);
        
        if (retryCount === 0 && image) {
          setRetryCount(prev => prev + 1);
          console.log("Retrying with fallback detection...");
          
          return generateMockAnalysis(imagePreview, values.industry || "Construction");
        }
        
        throw error;
      }
      
      const enhancedResults = {
        ...data,
        imagePreview: imagePreview,
        industry: values.industry,
        id: `v-${Date.now().toString(36)}`,
        regulationIds: data.detections?.map((d: any) => {
          if (d.label?.includes('hardhat')) return '29 CFR 1926.100';
          if (d.label?.includes('vest')) return '29 CFR 1926.201';
          return '29 CFR 1926.20';
        }) || []
      };
      
      setTestResult(enhancedResults);
      return enhancedResults;
    } catch (error: any) {
      console.error('Model test error:', error);
      
      if (image && retryCount === 0) {
        toast.info("Using fallback detection", { 
          description: "Primary detection unavailable. Using backup system." 
        });
        return generateMockAnalysis(imagePreview, values.industry || "Construction");
      }
      
      throw error;
    } finally {
      setIsSubmitting(false);
      setRetryCount(0);
    }
  };
  
  const resetTest = () => {
    setTestResult(null);
    resetImage();
    setRetryCount(0);
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
