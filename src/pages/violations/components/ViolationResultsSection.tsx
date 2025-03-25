
import React from 'react';
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { AlertCircle } from 'lucide-react';
import ViolationResults from "@/components/violations/ViolationResults";
import { TestResult } from "@/hooks/model-testing/types";

interface ViolationResultsSectionProps {
  analysisResults: TestResult | null;
  onReset: () => void;
  setActiveTab: (value: string) => void;
}

const ViolationResultsSection = ({ 
  analysisResults, 
  onReset,
  setActiveTab
}: ViolationResultsSectionProps) => {
  // Format results for the ViolationResults component
  const formattedResults = analysisResults ? [
    {
      id: analysisResults.id || '1',
      test_name: 'Safety Violation Analysis',
      result: 'Violation Detected',
      severity: analysisResults.severity || 'medium',
      location: analysisResults.location || 'Unknown',
      timestamp: new Date().toISOString(),
      image_url: analysisResults.imagePreview || undefined,
      description: analysisResults.description,
      detections: analysisResults.detections,
      regulationIds: analysisResults.regulationIds,
      industry: analysisResults.industry
    }
  ] : [];

  return (
    <TabsContent value="results">
      {analysisResults ? (
        <ViolationResults 
          results={formattedResults} 
          onSave={onReset} 
        />
      ) : (
        <div className="flex flex-col items-center justify-center p-8">
          <AlertCircle className="h-8 w-8 text-yellow-500 mb-2" />
          <p className="text-muted-foreground">No analysis results available. Please upload an image first.</p>
          <Button 
            onClick={() => setActiveTab("upload")} 
            variant="outline" 
            className="mt-4"
          >
            Go to Upload
          </Button>
        </div>
      )}
    </TabsContent>
  );
};

export default ViolationResultsSection;
