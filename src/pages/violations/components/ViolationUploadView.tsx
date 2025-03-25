
import React from 'react';
import ViolationUpload from '@/components/violations/ViolationUpload';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, ShieldAlert } from 'lucide-react';

interface ViolationUploadViewProps {
  onUploadComplete: (results: any) => void;
  onViewViolationsList: () => void;
}

const ViolationUploadView = ({ onUploadComplete, onViewViolationsList }: ViolationUploadViewProps) => {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-medium text-white mb-1 flex items-center">
          <ShieldAlert className="mr-2 h-6 w-6 text-yellow-500" />
          Safety Violation Detection
        </h1>
        <p className="text-gray-400">Upload images to automatically detect and analyze workplace safety violations using AI</p>
      </div>
      
      <div className="flex justify-end mb-6">
        <Button 
          onClick={onViewViolationsList}
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded flex items-center"
        >
          View All Violations
        </Button>
      </div>
      
      <Alert className="mb-6 bg-blue-900/30 border border-blue-800 text-blue-200">
        <InfoIcon className="h-4 w-4 text-blue-400 mr-2" />
        <AlertDescription>
          Our AI analyzes your workplace images to identify safety violations and suggest corrective actions. 
          If no violations are detected, you'll receive a safety compliance confirmation. 
          Remember that AI analysis should supplement, not replace, regular physical safety inspections.
        </AlertDescription>
      </Alert>
      
      <ViolationUpload onUploadComplete={onUploadComplete} />
    </>
  );
};

export default ViolationUploadView;
