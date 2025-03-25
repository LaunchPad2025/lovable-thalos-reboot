
import React, { useRef, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Save, AlertCircle } from 'lucide-react';
import { TestResult } from '@/hooks/useModelTest';

interface ViolationImageCardProps {
  results: TestResult;
  violationsCount: number;
  onSave: () => void;
}

const ViolationImageCard = ({ results, violationsCount, onSave }: ViolationImageCardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Draw violation annotations on the canvas
  useEffect(() => {
    if (canvasRef.current && results?.imagePreview && results?.detections && results.detections.length > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;
      
      const img = new Image();
      img.src = results.imagePreview;
      
      img.onload = () => {
        // Set canvas dimensions to match the image
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw the image
        ctx.drawImage(img, 0, 0, img.width, img.height);
        
        // Draw bounding boxes for detections
        results.detections.forEach((detection) => {
          if (detection.bbox) {
            const [x, y, width, height] = detection.bbox;
            
            // Draw the rectangle
            ctx.lineWidth = 3;
            ctx.strokeStyle = detection.label?.includes('missing') ? 'red' : 'orange';
            ctx.strokeRect(x, y, width, height);
            
            // Add label
            ctx.fillStyle = detection.label?.includes('missing') ? 'rgba(255, 0, 0, 0.7)' : 'rgba(255, 165, 0, 0.7)';
            ctx.fillRect(x, y - 25, detection.label ? detection.label.length * 7 : 80, 25);
            ctx.fillStyle = 'white';
            ctx.font = '16px Arial';
            ctx.fillText(detection.label?.replace('_', ' ') || 'Violation', x + 5, y - 7);
          }
        });
      };
    }
  }, [results]);
  
  const downloadImage = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = `safety-violation-${new Date().toISOString().slice(0, 10)}.png`;
      link.href = canvasRef.current.toDataURL('image/png');
      link.click();
    }
  };
  
  return (
    <Card className="bg-[#0d1117] border-gray-800">
      <CardHeader className="bg-[#0f1419] border-b border-gray-800 flex flex-row items-center justify-between p-4">
        <div>
          <CardTitle className="text-white">Analysis Results</CardTitle>
          <p className="text-sm text-gray-400">
            Industry: {results.industry || 'Construction'} | Report ID: VS-{Math.floor(Math.random() * 10000)}
          </p>
        </div>
        <div>
          <Badge className={`${violationsCount > 0 ? 'bg-red-900/50 text-red-300 border border-red-800' : 'bg-green-900/50 text-green-300 border border-green-800'}`}>
            {violationsCount > 0 ? `${violationsCount} ${violationsCount === 1 ? 'Violation' : 'Violations'} Detected` : 'No Violations'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-5">
          {results.detections && results.detections.length > 0 ? (
            <div className="relative rounded-md border border-gray-700 overflow-hidden">
              <canvas 
                ref={canvasRef}
                className="w-full h-auto max-h-[500px] object-contain"
              />
              <Button 
                size="sm" 
                variant="outline" 
                className="absolute bottom-2 right-2 border-gray-700 text-gray-300"
                onClick={downloadImage}
              >
                <Download size={16} className="mr-1" />
                Download
              </Button>
            </div>
          ) : (
            <div className="relative rounded-md border border-gray-700 overflow-hidden">
              <img 
                src={results.imagePreview || ''} 
                alt="Analyzed image" 
                className="w-full h-auto max-h-[500px] object-contain"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                <div className="text-center p-4">
                  <AlertCircle size={40} className="mx-auto mb-2 text-gray-300" />
                  <p className="text-white font-medium">No violations detected</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Analysis Summary</h3>
          <p className="text-gray-400 mb-4">{results.description || 'No safety violations were detected in this image.'}</p>
          
          {results.detections && results.detections.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Detected Violations:</h4>
              <ul className="space-y-1">
                {results.detections.map((detection, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                    <span className="text-gray-300">
                      {detection.label ? detection.label.replace('_', ' ') : 'Violation'} 
                      {detection.confidence && ` (${(detection.confidence * 100).toFixed(0)}% confidence)`}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="mt-4 flex justify-end space-x-2">
          <Button variant="outline" className="border-gray-700 text-gray-300" onClick={downloadImage}>
            <Download size={16} className="mr-1" />
            Export Report
          </Button>
          
          {results.detections && results.detections.length > 0 && (
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={onSave}>
              <Save size={16} className="mr-1" />
              Create Task
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ViolationImageCard;
