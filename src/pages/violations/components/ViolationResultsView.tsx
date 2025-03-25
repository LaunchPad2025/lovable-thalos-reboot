
import React, { useState, useRef, useEffect } from 'react';
import ViolationResults, { ViolationResult } from '@/components/violations/ViolationResults';
import ViolationImageCard from '@/components/violations/ViolationImageCard';
import { Button } from '@/components/ui/button';
import { TaskCreation } from '@/components/tasks/TaskCreation';
import { toast } from 'sonner';
import { TestResult } from '@/hooks/model-testing/types';
import { AlertCircle, ClipboardCheck, ArrowLeft } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { generateRemediationSteps } from '@/components/violations/utils/violationHelpers';
import NoViolationsCard from '@/components/violations/NoViolationsCard';

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
  
  // Add remediation steps to detections if they don't exist
  const enhancedDetections = testResults?.detections?.map(detection => {
    if (!detection.remediationSteps && detection.label) {
      return {
        ...detection,
        remediationSteps: generateRemediationSteps(detection.label)
      };
    }
    return detection;
  });
  
  // Enhanced test results with location if not provided
  const enhancedResults = {
    ...testResults,
    location: testResults.location || (testResults.industry === 'Construction' ? 'Construction Site' : 'Work Area'),
    detections: enhancedDetections
  };
  
  // Convert testResults to the format expected by ViolationResults
  const formattedResults: ViolationResult[] = enhancedResults?.detections?.length > 0 ? [
    {
      id: enhancedResults?.id || '1',
      test_name: 'Safety Violation Analysis',
      result: 'Violation Detected',
      severity: enhancedResults?.severity || 'medium',
      location: enhancedResults?.location || 'Work Area',
      timestamp: new Date().toISOString(),
      image_url: enhancedResults?.imagePreview || undefined,
      description: enhancedResults?.description,
      detections: enhancedResults?.detections,
      regulationIds: enhancedResults?.regulationIds,
      industry: enhancedResults?.industry
    }
  ] : [];
  
  // Check if we have actual violations detected
  const hasDetections = enhancedResults?.detections && enhancedResults.detections.length > 0;
  const violationsCount = hasDetections ? enhancedResults.detections.length : 0;
  
  // Show dialog if no violations detected
  useEffect(() => {
    if (enhancedResults && (!hasDetections || violationsCount === 0)) {
      setShowNoViolationsDialog(true);
    }
  }, [enhancedResults, hasDetections, violationsCount]);
  
  const handleSaveViolation = () => {
    if (!hasDetections) {
      toast.info("No violations to save", { 
        description: "Creating a safety report for documentation purposes."
      });
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
          Industry: {enhancedResults?.industry || 'Construction'} | 
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
              results={enhancedResults}
              imageUrl={enhancedResults?.imagePreview}
              violationsCount={violationsCount} 
              onSave={handleSaveViolation} 
            />
          </div>
          
          <div className="md:col-span-1">
            <ViolationsList 
              detections={enhancedResults?.detections || []}
              violationsCount={violationsCount}
              imageUrl={enhancedResults?.imagePreview}
              severity={enhancedResults?.severity || 'medium'}
              description={enhancedResults?.description}
              location={enhancedResults?.location}
              regulations={enhancedResults?.regulationIds}
              onCreateTask={handleSaveViolation}
            />
          </div>
        </div>
      ) : (
        <NoViolationsCard 
          imageUrl={enhancedResults?.imagePreview} 
          onNewAnalysis={onBackToUpload}
          industry={enhancedResults?.industry}
        />
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
      
      {showTaskModal && enhancedResults && (
        <TaskCreation 
          violationId={enhancedResults.id || "1"} 
          autoOpen={true}
        />
      )}
      
      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} className="hidden" />
    </>
  );
};

export default ViolationResultsView;
