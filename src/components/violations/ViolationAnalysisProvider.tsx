
import React, { createContext, useContext, ReactNode } from 'react';
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
}

export const ViolationAnalysisProvider = ({ children }: ViolationAnalysisProviderProps) => {
  // Default to 'Construction' industry if not specified
  const { isAnalyzing, analyzeImage } = useViolationAnalysis('Construction');
  
  return (
    <ViolationAnalysisContext.Provider
      value={{
        isAnalyzing,
        analyzeImage: async (image: File, industry: string) => {
          try {
            return await analyzeImage(image);
          } catch (error) {
            console.error('Error in ViolationAnalysisProvider:', error);
            throw error;
          }
        }
      }}
    >
      {children}
    </ViolationAnalysisContext.Provider>
  );
};
