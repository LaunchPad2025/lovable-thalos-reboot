
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';
import { TestResult } from '@/hooks/model-testing/types';

interface ViolationSummaryCardProps {
  results: TestResult;
  renderSeverityClass: (severity: string) => string;
}

const ViolationSummaryCard = ({ results, renderSeverityClass }: ViolationSummaryCardProps) => {
  return (
    <Card className="bg-[#0d1117] border-gray-800">
      <CardHeader className="bg-[#0f1419] border-b border-gray-800 p-4">
        <CardTitle className="text-white">Violation Summary</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-300">Confidence:</span>
            <span className="text-sm text-gray-300">{(results.confidence * 100).toFixed(1)}%</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-300">Severity:</span>
            <Badge className={renderSeverityClass(results.severity)}>
              {results.severity.charAt(0).toUpperCase() + results.severity.slice(1)}
            </Badge>
          </div>
          
          <div className="py-3 border-y border-gray-800">
            <h4 className="text-sm font-medium mb-2 text-gray-300">Description:</h4>
            <p className="text-sm text-gray-400">{results.description}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2 text-gray-300">Related Regulations:</h4>
            {results.regulationIds && results.regulationIds.length > 0 ? (
              <ul className="list-disc pl-5 space-y-1">
                {results.regulationIds.map((id, index) => (
                  <li key={id} className="text-sm">
                    <span className="text-gray-300">{id.substring(0, 8)}...</span>
                    {' '}
                    <span className="text-gray-500">
                      (Relevance: {(results.relevanceScores[index] * 100).toFixed(1)}%)
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No specific regulations matched</p>
            )}
          </div>
          
          <div className="flex items-start gap-2 mt-4 pt-3 border-t border-gray-800">
            <AlertTriangle size={16} className="text-amber-500 mt-0.5 shrink-0" />
            <p className="text-xs text-gray-500">
              AI model results are approximations and should be reviewed by safety experts.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ViolationSummaryCard;
