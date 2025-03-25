import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, ClipboardList } from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';
import { TestResult } from '@/hooks/useModelTest';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

interface ViolationResultsProps {
  results: TestResult;
  onSave?: () => void;
}

const ViolationResults = ({ results, onSave }: ViolationResultsProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isCreatingTask, setIsCreatingTask] = React.useState(false);
  const [violationId, setViolationId] = React.useState<string | null>(null);
  
  // Create a task from the violation
  const handleCreateTask = async () => {
    try {
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please log in to create tasks from violations.",
          variant: "destructive"
        });
        return;
      }
      
      setIsCreatingTask(true);
      
      // If we don't have a violation ID yet, we need to create the violation first
      let vId = violationId;
      
      if (!vId) {
        // First create the violation record
        const { data: violationData, error: violationError } = await supabase
          .from('violations')
          .insert({
            violation: results.description,
            description: results.description,
            severity: results.severity,
            status: results.status,
            organization_id: user.id, // Using user ID as org ID for demo
            created_by: user.id,
            confidence: results.confidence,
            // Other fields as needed
          })
          .select();
        
        if (violationError) throw violationError;
        
        vId = violationData?.[0]?.id;
        setViolationId(vId);
      }
      
      // Now navigate to create a task with this violation ID
      if (vId) {
        navigate(`/tasks?violation=${vId}&newTask=true`);
      } else {
        throw new Error("Failed to create violation record");
      }
      
    } catch (error) {
      console.error("Error creating task from violation:", error);
      toast({
        title: "Error",
        description: "Failed to create task from violation. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsCreatingTask(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <Card className="border-gray-700 bg-gray-800/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
              <CardTitle>Safety Violation Detected</CardTitle>
            </div>
            <StatusBadge status={results.severity} />
          </div>
          <CardDescription>
            Our AI has detected a potential safety violation. Review the details below.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-1">Violation Description</h3>
            <p className="text-white text-sm p-3 bg-gray-800 rounded-md border border-gray-700">
              {results.description}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-1">Confidence</h3>
              <p className="text-white text-sm p-3 bg-gray-800 rounded-md border border-gray-700">
                {Math.round(results.confidence * 100)}%
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-1">Industry</h3>
              <p className="text-white text-sm p-3 bg-gray-800 rounded-md border border-gray-700">
                {results.industry || "Construction"}
              </p>
            </div>
          </div>
          
          {results.imagePreview && (
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-1">Image Evidence</h3>
              <div className="overflow-hidden rounded-md border border-gray-700">
                <img 
                  src={results.imagePreview} 
                  alt="Violation evidence" 
                  className="w-full h-auto max-h-[300px] object-contain bg-black"
                />
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex gap-3 pt-2 justify-between">
          <div className="flex items-center text-sm text-gray-400">
            <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
            Safety analysis complete
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={onSave} 
              className="border-gray-600"
            >
              Back
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleCreateTask}
              disabled={isCreatingTask}
            >
              <ClipboardList className="h-4 w-4 mr-2" />
              {isCreatingTask ? "Creating..." : "Create Remediation Task"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ViolationResults;
