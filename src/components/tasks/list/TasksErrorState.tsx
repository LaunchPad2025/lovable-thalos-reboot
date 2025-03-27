
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface TasksErrorStateProps {
  onRetry: () => void;
  error?: any;
}

const TasksErrorState: React.FC<TasksErrorStateProps> = ({ onRetry, error }) => {
  const errorMessage = error?.message || "There was an error loading the tasks";
  const isRecursionError = errorMessage.includes("infinite recursion") || 
                           errorMessage.includes("organization_members");
  
  return (
    <div className="p-6 text-center bg-[#0d1117] border border-gray-800 rounded-lg">
      <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
      <h2 className="text-xl font-bold mb-2 text-white">Failed to load tasks</h2>
      <p className="mb-4 text-gray-400">{errorMessage}</p>
      
      {isRecursionError ? (
        <div className="mb-6 text-gray-400 text-sm p-4 bg-gray-800/50 rounded">
          <p className="font-medium text-amber-400 mb-2">Database Policy Issue</p>
          <p>
            We're experiencing an issue with database policies affecting organization memberships.
            Our team has been notified and is working on a fix. In the meantime, 
            you can continue to use the application with demo data.
          </p>
        </div>
      ) : (
        <p className="mb-6 text-gray-400 text-sm">
          This could be due to a database connection issue or permission problem.
        </p>
      )}
      
      <Button 
        onClick={onRetry} 
        className="bg-blue-600 hover:bg-blue-700"
      >
        Retry Connection
      </Button>
    </div>
  );
};

export default TasksErrorState;
