
import React, { useState, useRef, useEffect } from 'react';
import ViolationResults, { ViolationResult } from '@/components/violations/ViolationResults';
import ViolationImageCard from '@/components/violations/ViolationImageCard';
import { Button } from '@/components/ui/button';
import { TaskCreation } from '@/components/tasks/TaskCreation';
import { toast } from 'sonner';
import { TestResult } from '@/hooks/useModelTest';

interface ViolationResultsViewProps {
  testResults: TestResult;
  onBackToUpload: () => void;
  onViewViolationsList: () => void;
}

const ViolationResultsView = ({ 
  testResults, 
  onBackToUpload, 
  onViewViolationsList 
}: ViolationResultsViewProps) => {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Convert testResults to the format expected by ViolationResults
  const formattedResults: ViolationResult[] = [
    {
      id: testResults?.id || '1',
      test_name: 'Safety Violation Analysis',
      result: 'Violation Detected',
      severity: testResults?.severity || 'medium',
      location: testResults?.industry || 'Unknown',
      timestamp: new Date().toISOString(),
      image_url: testResults?.imagePreview || undefined,
      description: testResults?.description,
      detections: testResults?.detections,
      regulationIds: testResults?.regulationIds,
      industry: testResults?.industry
    }
  ];
  
  // Draw violation annotations on the image
  useEffect(() => {
    if (canvasRef.current && testResults?.imagePreview && testResults?.detections && testResults.detections.length > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;
      
      const img = new Image();
      img.src = testResults.imagePreview;
      
      img.onload = () => {
        // Set canvas dimensions to match the image
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw the image
        ctx.drawImage(img, 0, 0, img.width, img.height);
        
        // Draw bounding boxes for detections
        testResults.detections.forEach((detection: any) => {
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
            ctx.fillText(detection.label?.replace(/_/g, ' ') || 'Violation', x + 5, y - 7);
          }
        });
      };
    }
  }, [testResults]);
  
  // Check if we have actual violations detected
  const hasDetections = testResults?.detections && testResults.detections.length > 0;
  const violationsCount = hasDetections ? testResults.detections.length : 0;
  
  // Show toast if no violations detected
  useEffect(() => {
    if (testResults && (!hasDetections || violationsCount === 0)) {
      toast.info("No safety violations detected in this image", {
        duration: 5000,
        description: "Our AI models didn't identify any safety issues in this upload."
      });
    }
  }, [testResults, hasDetections, violationsCount]);
  
  const handleSaveViolation = () => {
    if (!hasDetections) {
      toast.error("No violations to save", { 
        description: "Our AI didn't detect any safety violations in this image."
      });
      return;
    }
    
    // Show task creation modal
    setShowTaskModal(true);
  };
  
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
      
      {violationsCount > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            <ViolationImageCard 
              results={testResults} 
              violationsCount={violationsCount} 
              onSave={handleSaveViolation} 
            />
          </div>
          
          <div className="md:col-span-1">
            <ViolationResults 
              results={formattedResults} 
              onSave={handleSaveViolation} 
            />
          </div>
        </div>
      ) : (
        <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700 text-center">
          <h3 className="text-xl mb-2">No Violations Detected</h3>
          <p className="text-gray-400 mb-4">
            Our AI analysis didn't detect any safety violations in this image.
          </p>
          <Button onClick={onBackToUpload} className="bg-blue-600 hover:bg-blue-700">
            Try Another Image
          </Button>
        </div>
      )}
      
      {showTaskModal && testResults && (
        <TaskCreation 
          violationId={testResults.id || "1"} 
          autoOpen={true}
        />
      )}
      
      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} className="hidden" />
    </>
  );
};

export default ViolationResultsView;
