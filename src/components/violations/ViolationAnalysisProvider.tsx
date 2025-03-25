
import React, { createContext, useContext, ReactNode, useState } from 'react';
import { useViolationAnalysis } from '@/hooks/useViolationAnalysis';

type ViolationAnalysisContextType = {
  isAnalyzing: boolean;
  analyzeImage: (image: File, industry: string) => Promise<any>;
};

const ViolationAnalysisContext = createContext<ViolationAnalysisContextType | undefined>(undefined);

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

export const ViolationAnalysisProvider = ({ 
  children, 
  defaultIndustry = 'Construction' 
}: ViolationAnalysisProviderProps) => {
  const [currentIndustry, setCurrentIndustry] = useState<string>(defaultIndustry);
  const { isAnalyzing, analyzeImage: analyzeViolation } = useViolationAnalysis(currentIndustry);
  
  const analyzeImage = async (image: File, industry: string) => {
    try {
      // Update current industry if it's different
      if (industry !== currentIndustry) {
        setCurrentIndustry(industry);
      }
      
      // Call the analyze function with the image and return results
      return await analyzeViolation(image);
    } catch (error) {
      console.error('Error in ViolationAnalysisProvider:', error);
      throw error;
    }
  };
  
  return (
    <ViolationAnalysisContext.Provider
      value={{
        isAnalyzing,
        analyzeImage
      }}
    >
      {children}
    </ViolationAnalysisContext.Provider>
  );
};
