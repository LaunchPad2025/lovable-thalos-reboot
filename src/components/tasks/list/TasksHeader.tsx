
import React from 'react';
import { Button } from '@/components/ui/button';

interface TasksHeaderProps {
  onCreateTask: () => void;
}

const TasksHeader: React.FC<TasksHeaderProps> = ({ onCreateTask }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Tasks</h1>
        <p className="text-gray-400">Manage and track your safety compliance tasks</p>
      </div>
      <Button 
        className="bg-blue-600 hover:bg-blue-700"
        onClick={onCreateTask}
      >
        Create Task
      </Button>
    </div>
  );
};

export default TasksHeader;
