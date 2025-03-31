
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface AnalysisUsageProps {
  analysesUsed: number;
  analysesTotal: number;
  analysesRemaining: number;
  analysesPercentage: number;
}

const AnalysisUsage = ({ 
  analysesUsed, 
  analysesTotal, 
  analysesRemaining, 
  analysesPercentage 
}: AnalysisUsageProps) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-muted-foreground">Analyses Used</span>
        <span className="text-sm font-semibold">{analysesUsed} of {analysesTotal}</span>
      </div>
      <Progress value={analysesPercentage} className="h-2" />
      <div className="flex justify-between text-xs text-muted-foreground mt-1">
        <span>{analysesRemaining} analyses remaining</span>
        <span>{analysesPercentage}%</span>
      </div>
    </div>
  );
};

export default AnalysisUsage;
