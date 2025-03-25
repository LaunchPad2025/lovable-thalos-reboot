
import React, { useState, useRef, useEffect } from 'react';
import ViolationResults, { ViolationResult } from '@/components/violations/ViolationResults';
import ViolationImageCard from '@/components/violations/ViolationImageCard';
import { Button } from '@/components/ui/button';
import { TaskCreation } from '@/components/tasks/TaskCreation';
import { toast } from 'sonner';
import { TestResult } from '@/hooks/useModelTest';
import { AlertCircle, ClipboardCheck, ArrowLeft } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

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
  const [showNoViolationsDialog, setShowNoViolationsDialog] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Convert testResults to the format expected by ViolationResults
  const formattedResults: ViolationResult[] = testResults?.detections?.length > 0 ? [
    {
      id: testResults?.id || '1',
      test_name: 'Safety Violation Analysis',
      result: 'Violation Detected',
      severity: testResults?.severity || 'medium',
      location: testResults?.location || 'Work Area', // Use industry as location if not available
      timestamp: new Date().toISOString(),
      image_url: testResults?.imagePreview || undefined,
      description: testResults?.description,
      detections: testResults?.detections,
      regulationIds: testResults?.regulationIds,
      industry: testResults?.industry
    }
  ] : [];
  
  // Check if we have actual violations detected
  const hasDetections = testResults?.detections && testResults.detections.length > 0;
  const violationsCount = hasDetections ? testResults.detections.length : 0;
  
  // Show dialog if no violations detected
  useEffect(() => {
    if (testResults && (!hasDetections || violationsCount === 0)) {
      setShowNoViolationsDialog(true);
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
        <h1 className="text-2xl font-medium text-white mb-1">Safety Violation Analysis</h1>
        <p className="text-gray-400">
          Report ID: VS-{Math.floor(Math.random() * 10000)} | 
          Industry: {testResults?.industry || 'Construction'} | 
          Analysis Date: {new Date().toLocaleDateString()}
        </p>
      </div>
      
      <div className="flex justify-end mb-6 space-x-2">
        <Button 
          onClick={onBackToUpload}
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded flex items-center"
        >
          <ArrowLeft size={16} className="mr-2" />
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
              results={{
                ...testResults,
                location: testResults.location || 'Work Area'
              }} 
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
      
      {/* No Violations Dialog */}
      <Dialog open={showNoViolationsDialog} onOpenChange={setShowNoViolationsDialog}>
        <DialogContent className="bg-gray-900 border border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center text-green-400">
              <ClipboardCheck className="mr-2 h-5 w-5" />
              No Safety Violations Detected
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-300">
              Our AI analysis has examined the image and found no safety violations or hazards.
            </p>
            <p className="text-gray-400 mt-2 text-sm">
              This result indicates compliance with standard safety protocols, but we recommend 
              regular physical inspections to validate these findings.
            </p>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
              onClick={() => setShowNoViolationsDialog(false)}
            >
              Close
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={onBackToUpload}
            >
              Upload Another Image
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
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
