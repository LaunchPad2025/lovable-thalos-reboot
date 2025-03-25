
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useViolationAnalysis, AnalysisResult, DetectedViolation } from '@/hooks/useViolationAnalysis';
import { toast } from 'sonner';

interface ViolationAnalysisContextProps {
  isAnalyzing: boolean;
  analysisResults: AnalysisResult | null;
  analyzeImage: (image: File, industry: string) => Promise<void>;
  clearResults: () => void;
  selectedViolation: DetectedViolation | null;
  setSelectedViolation: (violation: DetectedViolation | null) => void;
}

const ViolationAnalysisContext = createContext<ViolationAnalysisContextProps | undefined>(undefined);

export const useViolationAnalysisContext = () => {
  const context = useContext(ViolationAnalysisContext);
  if (!context) {
    throw new Error('useViolationAnalysisContext must be used within a ViolationAnalysisProvider');
  }
  return context;
};

interface ViolationAnalysisProviderProps {
  children: ReactNode;
  defaultIndustry?: string;
}

export const ViolationAnalysisProvider: React.FC<ViolationAnalysisProviderProps> = ({ 
  children, 
  defaultIndustry = 'Construction' 
}) => {
  const [industry, setIndustry] = useState(defaultIndustry);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult | null>(null);
  const [selectedViolation, setSelectedViolation] = useState<DetectedViolation | null>(null);
  
  const { isAnalyzing, analyzeImage: runAnalysis } = useViolationAnalysis(industry);
  
  const analyzeImage = async (image: File, selectedIndustry: string) => {
    if (selectedIndustry !== industry) {
      setIndustry(selectedIndustry);
    }
    
    try {
      const results = await runAnalysis(image);
      setAnalysisResults(results);
      
      if (results && results.detections && results.detections.length > 0) {
        toast.success(`Detected ${results.detections.length} safety violation(s)`, {
          description: "Analysis complete. You can now create remediation tasks."
        });
      } else {
        toast.info("No safety violations detected", {
          description: "Our AI models did not detect any violations in this image."
        });
      }
    } catch (error) {
      console.error("Error during analysis:", error);
      toast.error("Analysis failed", {
        description: "There was an error analyzing the image. Please try again."
      });
    }
  };
  
  const clearResults = () => {
    setAnalysisResults(null);
    setSelectedViolation(null);
  };
  
  return (
    <ViolationAnalysisContext.Provider
      value={{
        isAnalyzing,
        analysisResults,
        analyzeImage,
        clearResults,
        selectedViolation,
        setSelectedViolation
      }}
    >
      {children}
    </ViolationAnalysisContext.Provider>
  );
};
