
import React from 'react';
import ViolationResults from '@/components/violations/ViolationResults';
import { Button } from '@/components/ui/button';

interface ViolationResultsViewProps {
  testResults: any;
  onBackToUpload: () => void;
  onViewViolationsList: () => void;
}

const ViolationResultsView = ({ 
  testResults, 
  onBackToUpload, 
  onViewViolationsList 
}: ViolationResultsViewProps) => {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-medium text-white mb-1">Analysis Results</h1>
        <p className="text-gray-400">AI-detected safety violations</p>
      </div>
      
      <div className="flex justify-end mb-6 space-x-2">
        <Button 
          onClick={onBackToUpload}
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded flex items-center"
        >
          New Analysis
        </Button>
        <Button 
          onClick={onViewViolationsList}
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded flex items-center"
        >
          View All Violations
        </Button>
      </div>
      
      <ViolationResults 
        results={testResults} 
        onSave={() => {
          // In a real implementation, this would save the violation to the database
          onViewViolationsList();
        }} 
      />
    </>
  );
};

export default ViolationResultsView;
