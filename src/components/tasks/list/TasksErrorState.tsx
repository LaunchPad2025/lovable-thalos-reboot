
import React from 'react';
import { Button } from '@/components/ui/button';

interface TasksErrorStateProps {
  onRetry: () => void;
}

const TasksErrorState: React.FC<TasksErrorStateProps> = ({ onRetry }) => {
  return (
    <div className="p-6 text-center text-white">
      <h2 className="text-xl font-bold mb-2">Failed to load tasks</h2>
      <p className="mb-4">There was an error loading the tasks. Please try again later.</p>
      <Button onClick={onRetry}>Retry</Button>
    </div>
  );
};

export default TasksErrorState;
