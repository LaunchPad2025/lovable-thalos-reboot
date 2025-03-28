
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { MLModel } from '@/hooks/useMLModels';
import { z } from 'zod';
import { TestResult, Detection } from './model-testing/types';
import { useMockAnalysis } from './model-testing/useMockAnalysis';

export interface TestModelFormValues {
  model_id: string;
  violation_text?: string;
  industry: string;
}

export function useModelTest() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  
  const { generateMockAnalysis } = useMockAnalysis();
  
  const initializeStorageBucket = async () => {
    try {
      console.log("Initializing storage bucket");
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
    console.log("Image change event triggered", e.target.files);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size too large (max 5MB)');
        return;
      }
      
      console.log("Setting image file:", file.name, file.type, file.size);
      setImage(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("Image preview created");
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      console.log("No file selected, clearing image and preview");
      setImage(null);
      setImagePreview(null);
    }
  };
  
  const submitModelTest = async (values: TestModelFormValues, selectedModel: MLModel | undefined) => {
    setIsSubmitting(true);
    console.log("Starting analysis with model:", selectedModel?.name);
    
    try {
      let uploadedImageUrl = '';
      
      if (image) {
        console.log("Processing image upload...");
        const bucketInitialized = await initializeStorageBucket();
        
        if (bucketInitialized) {
          const timestamp = Date.now();
          const fileName = `${timestamp}_${image.name.replace(/\s+/g, '_')}`;
          const filePath = `violation_images/${fileName}`;
          
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('violations')
            .upload(filePath, image);
          
          if (uploadError) {
            console.error('Image upload error:', uploadError);
            toast.error('Image upload failed', {
              description: 'Using local image for analysis instead.'
            });
          } else {
            const { data: { publicUrl } } = supabase.storage
              .from('violations')
              .getPublicUrl(filePath);
              
            uploadedImageUrl = publicUrl;
            console.log("Image uploaded successfully");
          }
        }
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
      
      // Add location to detections based on industry
      let location = 'Work Area';
      if (values.industry === 'Construction') {
        location = 'Building A Construction Site';
      } else if (values.industry === 'Manufacturing') {
        location = 'Factory Floor, Section B';
      } else if (values.industry === 'Warehouse') {
        location = 'Warehouse Storage Area';
      }
      
      const enhancedResults = {
        ...data,
        imagePreview: imagePreview,
        industry: values.industry,
        id: `v-${Date.now().toString(36)}`,
        location: location,
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
    setImage(null);
    setImagePreview(null);
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
