
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Download } from 'lucide-react';
import { TestResult } from '@/hooks/model-testing/types';
import { useRef, useEffect } from 'react';

interface ModelTestResultsProps {
  testResult: TestResult | null;
  onReset: () => void;
  imagePreview: string | null;
}

const ModelTestResults = ({ testResult, onReset, imagePreview }: ModelTestResultsProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (canvasRef.current && imagePreview && testResult?.detections && testResult.detections.length > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;
      
      const img = new Image();
      img.src = imagePreview;
      
      img.onload = () => {
        // Set canvas dimensions to match the image
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw the image
        ctx.drawImage(img, 0, 0, img.width, img.height);
        
        // Draw bounding boxes for detections
        testResult.detections.forEach((detection) => {
          if (detection.bbox) {
            const [x, y, width, height] = detection.bbox;
            
            // Draw the rectangle
            ctx.lineWidth = 3;
            ctx.strokeStyle = detection.label?.includes('missing') ? 'red' : 'orange';
            ctx.strokeRect(x, y, width, height);
            
            // Add label with background
            ctx.fillStyle = detection.label?.includes('missing') ? 'rgba(255, 0, 0, 0.7)' : 'rgba(255, 165, 0, 0.7)';
            const labelText = detection.label?.replace(/_/g, ' ') || 'Violation';
            const labelWidth = Math.min(labelText.length * 8, 200);
            ctx.fillRect(x, y - 20, labelWidth, 20);
            ctx.fillStyle = 'white';
            ctx.font = '14px Arial';
            ctx.fillText(labelText, x + 5, y - 5);
          }
        });
      };
    }
  }, [canvasRef, imagePreview, testResult]);
  
  const downloadAnnotatedImage = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = 'violation-detection.png';
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };
  
  if (!testResult) return null;
  
  const renderSeverityClass = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <Card className="mt-6 p-4 bg-gray-800 border-gray-700 text-white">
      <h3 className="text-lg font-semibold mb-4">Analysis Results</h3>
      
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-300">Confidence:</span>
          <span className="text-sm text-gray-300">{(testResult.confidence * 100).toFixed(1)}%</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-300">Severity:</span>
          <Badge className={renderSeverityClass(testResult.severity)}>
            {testResult.severity.charAt(0).toUpperCase() + testResult.severity.slice(1)}
          </Badge>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-300">Description:</p>
          <p className="text-sm text-gray-400">{testResult.description}</p>
        </div>
        
        {testResult.location && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-300">Location:</p>
            <p className="text-sm text-gray-400">{testResult.location}</p>
          </div>
        )}
        
        {testResult.regulationIds && testResult.regulationIds.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-300">Related Regulations:</p>
            <ul className="list-disc pl-5 space-y-1">
              {testResult.regulationIds.map((id, index) => (
                <li key={id} className="text-sm">
                  <span className="text-gray-300">{id}</span>
                  {testResult.relevanceScores && (
                    <span className="text-gray-500 ml-2">
                      (Relevance: {(testResult.relevanceScores[index] * 100).toFixed(1)}%)
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {imagePreview && testResult.detections && testResult.detections.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-300">Annotated Image:</p>
            <div className="relative rounded-md border border-gray-700 overflow-hidden">
              <canvas 
                ref={canvasRef} 
                className="max-w-full h-auto" 
              />
              <Button 
                size="sm" 
                variant="outline" 
                className="absolute bottom-2 right-2 bg-gray-700 hover:bg-gray-600"
                onClick={downloadAnnotatedImage}
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        )}
        
        <div className="flex items-start gap-2 mt-4 pt-3 border-t border-gray-700">
          <AlertTriangle size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-gray-500">
            AI model results are approximations and should be reviewed by safety experts.
          </p>
        </div>
        
        <div className="flex justify-end">
          <Button 
            variant="default" 
            onClick={onReset}
            className="mt-2 bg-blue-600 hover:bg-blue-700"
          >
            Run New Analysis
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ModelTestResults;
