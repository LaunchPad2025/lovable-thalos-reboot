
import React from 'react';
import NoViolationsCard from '@/components/violations/NoViolationsCard';
import ViolationResultsHeader from './results/ViolationResultsHeader';
import ViolationSummaryCard from './results/ViolationSummaryCard';
import ViolationDetectionsList, { ViolationDetection } from './results/ViolationDetectionsList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ViolationResultsViewProps {
  testResults: {
    detections: ViolationDetection[];
    severity: string;
    description: string;
    imagePreview?: string;
    location?: string;
    industry?: string;
  };
  onBackToUpload: () => void;
  onViewViolationsList: () => void;
}

const ViolationResultsView = ({ 
  testResults, 
  onBackToUpload, 
  onViewViolationsList 
}: ViolationResultsViewProps) => {
  const hasDetections = testResults.detections && testResults.detections.length > 0;
  
  const handleSave = () => {
    // Simulating save operation
    setTimeout(() => {
      console.log('Saved violation:', testResults);
      onViewViolationsList();
    }, 500);
  };
  
  if (!hasDetections) {
    return (
      <div className="space-y-4">
        <ViolationResultsHeader 
          onBackToUpload={onBackToUpload}
          onSave={handleSave}
          hasDetections={false}
        />
        
        <NoViolationsCard 
          description={testResults.description || "No safety violations were detected in the analysis."}
          onReset={onBackToUpload}
        />
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <ViolationResultsHeader 
        onBackToUpload={onBackToUpload}
        onSave={handleSave}
        hasDetections={true}
      />
      
      <div className="grid gap-4 md:grid-cols-2">
        <ViolationSummaryCard 
          severity={testResults.severity}
          location={testResults.location}
          industry={testResults.industry}
          description={testResults.description}
        />
        
        {testResults.imagePreview && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Image Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <img 
                  src={testResults.imagePreview} 
                  alt="Violation" 
                  className="w-full h-auto rounded-md"
                />
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      <ViolationDetectionsList detections={testResults.detections} />
    </div>
  );
};

export default ViolationResultsView;
