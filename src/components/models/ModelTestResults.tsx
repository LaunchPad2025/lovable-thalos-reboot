
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';
import { TestResult } from '@/hooks/useModelTest';

interface ModelTestResultsProps {
  testResult: TestResult | null;
  onReset: () => void;
}

const ModelTestResults = ({ testResult, onReset }: ModelTestResultsProps) => {
  if (!testResult) return null;
  
  const renderSeverityClass = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="mt-6 p-4">
      <h3 className="text-lg font-semibold mb-4">Analysis Results</h3>
      
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Confidence:</span>
          <span className="text-sm">{(testResult.confidence * 100).toFixed(1)}%</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Severity:</span>
          <Badge className={renderSeverityClass(testResult.severity)}>
            {testResult.severity.charAt(0).toUpperCase() + testResult.severity.slice(1)}
          </Badge>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium">Description:</p>
          <p className="text-sm text-muted-foreground">{testResult.description}</p>
        </div>
        
        {testResult.detections && testResult.detections.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Detections:</p>
            <ul className="list-disc pl-5 space-y-1">
              {testResult.detections.map((detection, idx) => (
                <li key={idx} className="text-sm">
                  {detection.label ? (
                    <>
                      <span className="font-medium">{detection.label.replace('_', ' ')}</span>
                      {detection.confidence && (
                        <span className="text-muted-foreground"> (Confidence: {(detection.confidence * 100).toFixed(1)}%)</span>
                      )}
                    </>
                  ) : (
                    <span className="text-muted-foreground">See analysis in description</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="space-y-2">
          <p className="text-sm font-medium">Related Regulations:</p>
          {testResult.regulationIds && testResult.regulationIds.length > 0 ? (
            <ul className="list-disc pl-5 space-y-1">
              {testResult.regulationIds.map((id, index) => (
                <li key={id} className="text-sm">
                  Regulation ID: {id.substring(0, 8)}... 
                  (Relevance: {(testResult.relevanceScores[index] * 100).toFixed(1)}%)
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No regulations matched</p>
          )}
        </div>
        
        <div className="pt-3 border-t flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm">
            <AlertTriangle size={16} className="text-yellow-500" />
            <span className="text-muted-foreground">AI model results are approximations and should be reviewed by safety experts.</span>
          </div>
          
          <Button variant="outline" size="sm" onClick={onReset}>
            Reset
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ModelTestResults;
