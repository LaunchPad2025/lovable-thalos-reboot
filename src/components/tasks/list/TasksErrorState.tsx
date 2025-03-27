
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface TasksErrorStateProps {
  onRetry: () => void;
  error?: any;
}

const TasksErrorState: React.FC<TasksErrorStateProps> = ({ onRetry, error }) => {
  const errorMessage = error?.message || "There was an error loading the tasks";
  const isRecursionError = errorMessage.includes("infinite recursion") || 
                           errorMessage.includes("organization_members") ||
                           errorMessage.includes("policy for relation");
  
  return (
    <div className="p-6 text-center bg-[#0d1117] border border-gray-800 rounded-lg">
      <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
      <h2 className="text-xl font-bold mb-2 text-white">Database Policy Issue Detected</h2>
      <p className="mb-4 text-gray-400">{errorMessage}</p>
      
      {isRecursionError ? (
        <div className="mb-6 text-gray-400 text-sm p-4 bg-gray-800/50 rounded">
          <p className="font-medium text-amber-400 mb-2">Row Level Security Policy Issue</p>
          <p>
            We're experiencing an issue with database policies affecting organization memberships.
            This is a common issue when first setting up RLS policies. The application is using
            demo data until the issue is resolved.
          </p>
          <p className="mt-2 text-gray-300">
            If you're the database administrator, please check the Postgres logs for 
            "infinite recursion detected in policy" errors and update your RLS policies to use
            security definer functions.
          </p>
        </div>
      ) : (
        <p className="mb-6 text-gray-400 text-sm">
          This could be due to a database connection issue or permission problem.
          The application will use demo data while this issue is being resolved.
        </p>
      )}
      
      <Button 
        onClick={onRetry} 
        className="bg-blue-600 hover:bg-blue-700"
      >
        <RefreshCw className="mr-2 h-4 w-4" />
        Try Again
      </Button>
    </div>
  );
};

export default TasksErrorState;
