
import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, AlertTriangle, ShieldAlert } from 'lucide-react';
import { TestResult } from '@/hooks/model-testing/types';
import { toast } from 'sonner';

interface ViolationImageCardProps {
  results: TestResult;
  violationsCount: number;
  onSave?: () => void;
}

const ViolationImageCard = ({ results, violationsCount, onSave }: ViolationImageCardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current || !results.imagePreview || !results.detections) return;

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
      results.detections?.forEach((detection) => {
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
  }, [results.imagePreview, results.detections]);
  
  const downloadAnnotatedImage = () => {
    if (!canvasRef.current) return;
    
    try {
      const link = document.createElement('a');
      link.download = 'violation-detection.png';
      link.href = canvasRef.current.toDataURL();
      link.click();
      toast.success('Image downloaded successfully');
    } catch (error) {
      console.error('Error downloading image:', error);
      toast.error('Failed to download image');
    }
  };
  
  return (
    <Card className="bg-[#0d1117] border-gray-800 text-white shadow-none h-full">
      <CardHeader className="bg-[#0f1419] border-b border-gray-800 px-6 py-4">
        <CardTitle className="text-lg flex items-center">
          <ShieldAlert className="mr-2 h-5 w-5 text-yellow-400" />
          Safety Analysis Results
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {results.imagePreview ? (
          <div>
            <div className="relative rounded-md border border-gray-700 overflow-hidden">
              <canvas 
                ref={canvasRef} 
                className="max-w-full h-auto" 
              />
              <Button 
                size="sm" 
                variant="outline" 
                className="absolute bottom-2 right-2 bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                onClick={downloadAnnotatedImage}
              >
                <Download size={16} className="mr-1" />
                Download
              </Button>
            </div>
            <div className="mt-4 bg-[#161b22] rounded-md border border-gray-700 p-3">
              <div className="text-sm">
                <span className="text-gray-400">Industry: </span>
                <span className="text-gray-300">{results.industry || 'Construction'}</span>
              </div>
              <div className="text-sm mt-1">
                <span className="text-gray-400">Description: </span>
                <span className="text-gray-300">{results.description}</span>
              </div>
              <div className="text-sm mt-1">
                <span className="text-gray-400">Location: </span>
                <span className="text-gray-300">{results.location || 'Work Area'}</span>
              </div>
            </div>
            {violationsCount > 0 && (
              <div className="mt-4 flex items-start gap-2 p-3 bg-yellow-900/20 border border-yellow-800 rounded-md">
                <AlertTriangle size={18} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-yellow-300">
                  {violationsCount === 1 
                    ? '1 safety violation detected that requires immediate attention.' 
                    : `${violationsCount} safety violations detected that require immediate attention.`}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 bg-gray-800 rounded-md border border-gray-700">
            <p className="text-gray-400">No image available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ViolationImageCard;
