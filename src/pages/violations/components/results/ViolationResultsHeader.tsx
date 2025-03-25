
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Save } from 'lucide-react';

interface ViolationResultsHeaderProps {
  onBackToUpload: () => void;
  onSave: () => void;
  hasDetections: boolean;
}

const ViolationResultsHeader = ({ 
  onBackToUpload, 
  onSave, 
  hasDetections 
}: ViolationResultsHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          className="mr-2"
          onClick={onBackToUpload}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h2 className="text-xl font-bold">
          {hasDetections ? "Safety Violation Analysis" : "Safety Analysis Results"}
        </h2>
      </div>
      
      {hasDetections && (
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => {
              // Create download handler
              const element = document.createElement('a');
              
              const reportData = {
                title: 'Safety Violation Analysis',
                date: new Date().toLocaleDateString(),
                status: hasDetections ? 'Violations Detected' : 'No Violations',
              };
              
              const reportBlob = new Blob(
                [JSON.stringify(reportData, null, 2)], 
                { type: 'application/json' }
              );
              
              element.href = URL.createObjectURL(reportBlob);
              element.download = `safety-report-${new Date().toISOString().slice(0, 10)}.json`;
              document.body.appendChild(element);
              element.click();
              document.body.removeChild(element);
            }}
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button onClick={onSave}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      )}
    </div>
  );
};

export default ViolationResultsHeader;
