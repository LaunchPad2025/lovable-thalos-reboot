
import React from 'react';
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import { TabsContent } from "@/components/ui/tabs";
import { ViolationAnalysisProvider } from "@/components/violations/ViolationAnalysisProvider";
import ViolationUpload from "@/components/violations/ViolationUpload";
import { TestResult } from "@/hooks/model-testing/types";

interface ViolationUploadSectionProps {
  onUploadComplete: (results: TestResult) => void;
  userIndustry: string;
  isLoading: boolean;
  isLoadingOverride: boolean;
  setIsLoadingOverride: (value: boolean) => void;
  modelInitError: string | null;
}

const ViolationUploadSection = ({ 
  onUploadComplete, 
  userIndustry, 
  isLoading, 
  isLoadingOverride, 
  setIsLoadingOverride, 
  modelInitError 
}: ViolationUploadSectionProps) => {
  return (
    <TabsContent value="upload">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-[#f59e0b] mb-2" />
          <span>Preparing safety models...</span>
          <p className="mt-4 text-muted-foreground text-sm max-w-md text-center">
            Our AI safety inspection tools are being calibrated. You can proceed with your upload and we'll automatically select the most appropriate safety standards and compliance guidelines for your analysis.
          </p>
          <Button 
            onClick={() => setIsLoadingOverride(false)} 
            variant="outline" 
            className="mt-4"
          >
            Continue to safety analysis
          </Button>
        </div>
      ) : (
        <ViolationAnalysisProvider>
          <ViolationUpload 
            onUploadComplete={onUploadComplete} 
            userIndustry={userIndustry}
            hideModelSelection={true}
            modelInitError={modelInitError}
          />
        </ViolationAnalysisProvider>
      )}
    </TabsContent>
  );
};

export default ViolationUploadSection;
