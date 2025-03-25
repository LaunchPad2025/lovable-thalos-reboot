
import { useState } from 'react';
import { useMLModelsByIndustry, useAnalyzeViolation } from './ml-models/useModelQueries';
import { generateRemediationSteps } from '@/utils/violationAnalysis';
import { toast } from 'sonner';

export interface DetectedViolation {
  label: string;
  confidence: number;
  bbox?: [number, number, number, number];
  regulations?: {
    id: string;
    title: string;
    relevance: number;
  }[];
  remediationSteps?: string;
}

export interface AnalysisResult {
  imagePreview: string;
  detections: DetectedViolation[];
  description?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  industry: string;
  id: string;
  regulationIds?: string[];
  relevanceScores?: number[];
}

export function useViolationAnalysis(industry: string) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { data: models } = useMLModelsByIndustry(industry);
  const analyzeMutation = useAnalyzeViolation();
  
  const analyzeImage = async (image: File): Promise<AnalysisResult | null> => {
    setIsAnalyzing(true);
    try {
      // Find the best model for this industry
      const bestModel = models?.find(m => m.industry === industry && m.active) || 
                       models?.find(m => m.active);
                       
      console.log('Using model for analysis:', bestModel?.name);
      
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
      
      // Create an analysis result with a unique ID
      const analysisResult: AnalysisResult = {
        ...result,
        detections: violationsWithSteps,
        id: `v-${Date.now().toString(36)}`,
        severity: result.severity || 'medium',
        confidence: result.confidence || 0.7,
        industry: industry,
        imagePreview: result.imagePreview || ''
      };
      
      console.log('Analysis completed successfully:', analysisResult);
      return analysisResult;
      
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
