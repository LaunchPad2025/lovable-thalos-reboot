
import { useState } from 'react';
import { useMLModelsByIndustry, useAnalyzeViolation } from './ml-models/useModelQueries';
import { generateRemediationSteps } from '@/utils/violationAnalysis';
import { toast } from 'sonner';

export function useViolationAnalysis(industry: string) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { data: models } = useMLModelsByIndustry(industry);
  const analyzeMutation = useAnalyzeViolation();
  
  const analyzeImage = async (image: File) => {
    setIsAnalyzing(true);
    try {
      // Find the best model for this industry
      const bestModel = models?.find(m => m.industry === industry && m.active) || 
                       models?.find(m => m.active);
                       
      const result = await analyzeMutation.mutateAsync({
        image,
        modelId: bestModel?.id,
        industry
      });
      
      if (!result.detections || result.detections.length === 0) {
        toast.info('No violations detected', {
          description: 'Our AI models did not detect any safety violations in this image.'
        });
        return null;
      }
      
      // Generate remediation steps for each violation
      const violationsWithSteps = result.detections.map(violation => ({
        ...violation,
        remediationSteps: generateRemediationSteps(violation)
      }));
      
      return {
        ...result,
        detections: violationsWithSteps
      };
      
    } catch (error) {
      console.error('Error analyzing image:', error);
      toast.error('Analysis failed', {
        description: 'There was an error analyzing the image. Please try again.'
      });
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  return {
    isAnalyzing,
    analyzeImage,
    models
  };
}
