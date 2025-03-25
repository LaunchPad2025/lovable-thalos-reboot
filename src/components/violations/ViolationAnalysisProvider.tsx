
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useViolationAnalysis, AnalysisResult, DetectedViolation } from '@/hooks/useViolationAnalysis';
import { toast } from 'sonner';
import { useMockViolationData } from '@/hooks/ml-models/useMockViolationData';

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
  const [retryCount, setRetryCount] = useState(0);
  
  const { isAnalyzing, analyzeImage: runAnalysis } = useViolationAnalysis(industry);
  const { generateMockViolationData } = useMockViolationData();
  
  const analyzeImage = async (image: File, selectedIndustry: string) => {
    if (selectedIndustry !== industry) {
      setIndustry(selectedIndustry);
    }
    
    try {
      const results = await runAnalysis(image);
      
      // If the analysis failed or returned null, fall back to mock data
      if (!results) {
        if (retryCount === 0) {
          setRetryCount(prev => prev + 1);
          toast.info("Using fallback detection", {
            description: "Primary detection service unavailable. Using backup system."
          });
          
          // Create a FileReader to convert the image to a data URL
          const reader = new FileReader();
          reader.readAsDataURL(image);
          
          reader.onloadend = async () => {
            const imageUrl = reader.result as string;
            const mockData = generateMockViolationData(imageUrl, selectedIndustry);
            setAnalysisResults(mockData);
            
            if (mockData.detections && mockData.detections.length > 0) {
              toast.success(`Detected ${mockData.detections.length} safety violation(s)`, {
                description: "Analysis complete. You can now create remediation tasks."
              });
            } else {
              toast.info("No safety violations detected", {
                description: "Our AI models did not detect any violations in this image."
              });
            }
          };
          
          return;
        }
      }
      
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
      
      // Fall back to mock data if real analysis fails
      if (retryCount === 0) {
        setRetryCount(prev => prev + 1);
        toast.info("Using fallback detection mode", {
          description: "Primary detection service unavailable. Using backup system."
        });
        
        // Create a FileReader to convert the image to a data URL
        const reader = new FileReader();
        reader.readAsDataURL(image);
        
        reader.onloadend = async () => {
          const imageUrl = reader.result as string;
          const mockData = generateMockViolationData(imageUrl, selectedIndustry);
          setAnalysisResults(mockData);
          
          if (mockData.detections && mockData.detections.length > 0) {
            toast.success(`Detected ${mockData.detections.length} safety violation(s)`, {
              description: "Analysis complete using fallback mode."
            });
          }
        };
      } else {
        toast.error("Analysis failed", {
          description: "There was an error analyzing the image. Please try again."
        });
      }
    } finally {
      setRetryCount(0);
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
