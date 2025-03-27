
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface TasksErrorStateProps {
  onRetry: () => void;
  error?: any;
}

const TasksErrorState: React.FC<TasksErrorStateProps> = ({ onRetry, error }) => {
  const errorMessage = error?.message || "There was an error loading the tasks";
  
  return (
    <div className="p-6 text-center bg-[#0d1117] border border-gray-800 rounded-lg">
      <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
      <h2 className="text-xl font-bold mb-2 text-white">Failed to load tasks</h2>
      <p className="mb-4 text-gray-400">{errorMessage}</p>
      <p className="mb-6 text-gray-400 text-sm">
        This could be due to a database connection issue or permission problem.
      </p>
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
