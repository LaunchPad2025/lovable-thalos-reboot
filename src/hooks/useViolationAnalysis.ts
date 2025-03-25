
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
  location: string;
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
      
      // Create regulation IDs based on the violation type
      const regulationIds = violationsWithSteps.map(violation => {
        const label = violation.label?.toLowerCase() || '';
        if (label.includes('hardhat') || label.includes('helmet') || label.includes('head')) {
          return '29 CFR 1926.100(a)';
        } else if (label.includes('vest') || label.includes('visibility')) {
          return '29 CFR 1926.201(a)(4)';
        } else if (label.includes('scaffold') || label.includes('platform')) {
          return '29 CFR 1926.451(g)(1)';
        } else if (label.includes('fall') || label.includes('height') || label.includes('guardrail')) {
          return '29 CFR 1926.501(b)(1)';
        } else if (label.includes('electrical') || label.includes('wiring')) {
          return '29 CFR 1926.403(a)';
        } else if (label.includes('housekeep') || label.includes('trip') || label.includes('debris')) {
          return '29 CFR 1926.25(a)';
        } else if (label.includes('fire') || label.includes('exit')) {
          return '29 CFR 1926.34(a)';
        } else if (label.includes('ladder')) {
          return '29 CFR 1926.1053(b)';
        } else {
          return '29 CFR 1926.20(b)(1)';
        }
      });
      
      // Create relevance scores for regulations
      const relevanceScores = violationsWithSteps.map(violation => 
        violation.confidence ? Math.min(violation.confidence + 0.15, 0.98) : 0.85
      );
      
      // Generate a comprehensive description
      let description = '';
      if (violationsWithSteps.length === 1) {
        const v = violationsWithSteps[0];
        description = `Detected ${v.label?.replace(/_/g, ' ') || 'safety violation'} in ${industry} environment with ${(v.confidence ? (v.confidence * 100).toFixed(0) : 75)}% confidence.`;
      } else {
        description = `Detected ${violationsWithSteps.length} safety violations in ${industry} environment, including ${violationsWithSteps.map(v => v.label?.replace(/_/g, ' ')).slice(0, 2).join(', ')}${violationsWithSteps.length > 2 ? ', and more' : ''}.`;
      }
      
      // Determine overall severity based on highest violation severity and confidence
      let severity: 'low' | 'medium' | 'high' | 'critical' = 'medium';
      const highestConfidence = Math.max(...violationsWithSteps.map(v => v.confidence || 0));
      const criticalLabels = ['fall', 'electrical', 'fire', 'trapped', 'confined'];
      
      if (violationsWithSteps.some(v => criticalLabels.some(label => v.label?.toLowerCase().includes(label)))) {
        severity = highestConfidence > 0.8 ? 'critical' : 'high';
      } else if (highestConfidence > 0.85) {
        severity = 'high';
      } else if (highestConfidence < 0.6) {
        severity = 'low';
      }
      
      // Determine a more specific location based on detection content
      let locationDetail = 'Work Area';
      if (violationsWithSteps.some(v => v.label?.toLowerCase().includes('ladder'))) {
        locationDetail = 'Elevated Work Area';
      } else if (violationsWithSteps.some(v => v.label?.toLowerCase().includes('scaffold'))) {
        locationDetail = 'Scaffolding Zone';
      } else if (violationsWithSteps.some(v => v.label?.toLowerCase().includes('electrical'))) {
        locationDetail = 'Electrical Installation Area';
      } else if (violationsWithSteps.some(v => v.label?.toLowerCase().includes('tripping'))) {
        locationDetail = 'Walkway/Access Route';
      }
      
      // Create an analysis result with a unique ID and additional information
      const analysisResult: AnalysisResult = {
        ...result,
        detections: violationsWithSteps,
        id: `v-${Date.now().toString(36)}`,
        severity: severity,
        confidence: highestConfidence || 0.7,
        industry: industry,
        imagePreview: result.imagePreview || '',
        regulationIds: regulationIds,
        relevanceScores: relevanceScores,
        description: description,
        location: locationDetail
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
