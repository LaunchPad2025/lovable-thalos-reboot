
import React from 'react';
import { TestResult } from '@/hooks/useModelTest';
import { getSeverityClass } from './utils/violationHelpers';
import NoViolationsCard from './NoViolationsCard';
import ViolationImageCard from './ViolationImageCard';
import ViolationSummaryCard from './ViolationSummaryCard';
import ViolationsList from './ViolationsList';

interface ViolationResultsProps {
  results: TestResult;
  onSave: () => void;
}

const ViolationResults = ({ results, onSave }: ViolationResultsProps) => {
  if (!results) return null;
  
  const violationsCount = results.detections?.length || 0;
  
  // If no violations found
  if (violationsCount === 0 || !results.detections) {
    return <NoViolationsCard onSave={onSave} />;
  }
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ViolationImageCard 
          results={results} 
          violationsCount={violationsCount} 
          onSave={onSave} 
        />
        <ViolationSummaryCard 
          results={results} 
          renderSeverityClass={getSeverityClass} 
        />
      </div>
      
      <ViolationsList 
        detections={results.detections} 
        violationsCount={violationsCount} 
        renderSeverityClass={getSeverityClass} 
      />
    </div>
  );
};

export default ViolationResults;
