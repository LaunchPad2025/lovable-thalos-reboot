
import React, { useRef, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Shield, CheckCircle } from 'lucide-react';
import { getSeverityBadgeClass } from './utils/violationHelpers';
import ViolationsList from './ViolationsList';
import NoViolationsCard from './NoViolationsCard';

export interface ViolationResult {
  id: string;
  test_name?: string;
  result?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  location?: string;
  timestamp: string;
  image_url?: string;
  description?: string;
  detections?: Array<any>;
  regulationIds?: Array<string>;
  industry?: string;
}

export interface ViolationResultsProps {
  results: ViolationResult[];
  onSave?: () => void;
}

const ViolationResults = ({ results, onSave }: ViolationResultsProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (results.length > 0 && results[0].image_url && results[0].detections && results[0].detections.length > 0 && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;
      
      const img = new Image();
      img.src = results[0].image_url;
      
      img.onload = () => {
        // Set canvas dimensions to match the image
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw the image
        ctx.drawImage(img, 0, 0, img.width, img.height);
        
        // Draw bounding boxes for detections
        results[0].detections?.forEach((detection) => {
          if (detection.bbox) {
            const [x, y, width, height] = detection.bbox;
            
            // Calculate scaled dimensions if needed
            const scaleX = canvas.width / img.naturalWidth;
            const scaleY = canvas.height / img.naturalHeight;
            
            const scaledX = x * scaleX;
            const scaledY = y * scaleY;
            const scaledWidth = width * scaleX;
            const scaledHeight = height * scaleY;
            
            // Draw the rectangle
            ctx.lineWidth = 3;
            ctx.strokeStyle = detection.label?.includes('missing') ? 'red' : 'orange';
            ctx.strokeRect(scaledX, scaledY, scaledWidth, scaledHeight);
            
            // Add label with background
            ctx.fillStyle = detection.label?.includes('missing') ? 'rgba(255, 0, 0, 0.7)' : 'rgba(255, 165, 0, 0.7)';
            const labelText = detection.label?.replace(/_/g, ' ') || 'Violation';
            const labelWidth = Math.min(labelText.length * 8, 200);
            ctx.fillRect(scaledX, scaledY - 20, labelWidth, 20);
            ctx.fillStyle = 'white';
            ctx.font = '14px Arial';
            ctx.fillText(labelText, scaledX + 5, scaledY - 5);
          }
        });
      };
    }
  }, [results, canvasRef]);
  
  const downloadAnnotatedImage = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = 'violation-detection.png';
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };
  
  if (!results || results.length === 0) {
    return (
      <Card className="bg-[#0d1117] border-gray-800 text-white shadow-none">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Shield size={40} className="text-gray-500 mb-4" />
            <h3 className="text-xl font-medium mb-2">No Analysis Results</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              No safety violation analysis results are available. Please upload an image to analyze for safety violations.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const result = results[0];
  const violationsCount = result.detections?.length || 0;
  
  // If no violations were detected but we have an image, show the NoViolationsCard
  if (violationsCount === 0 && result.image_url) {
    return (
      <NoViolationsCard 
        imageUrl={result.image_url} 
        industry={result.industry}
        onSave={onSave}
        onNewAnalysis={onSave}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card className="bg-[#0d1117] border-gray-800 text-white shadow-none h-full">
          <CardHeader className="bg-[#0f1419] border-b border-gray-800 px-6 py-4">
            <CardTitle className="text-lg flex items-center">
              <Shield className="mr-2 h-5 w-5 text-yellow-400" />
              Safety Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {result.image_url ? (
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
                    <span className="text-gray-300">{result.industry || 'Construction'}</span>
                  </div>
                  <div className="text-sm mt-1">
                    <span className="text-gray-400">Description: </span>
                    <span className="text-gray-300">{result.description}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 bg-gray-800 rounded-md border border-gray-700">
                <p className="text-gray-400">No image available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-1">
        <ViolationsList 
          detections={result.detections || []}
          violationsCount={violationsCount}
          imageUrl={result.image_url}
          severity={result.severity}
          description={result.description}
          location={result.location}
          regulations={result.regulationIds}
          onCreateTask={onSave}
        />
      </div>
    </div>
  );
};

export default ViolationResults;
