
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TasksHeaderProps {
  onAddNewTask: () => void;
}

const TasksHeader = ({ onAddNewTask }: TasksHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-medium text-gray-900">Tasks</h2>
      <Button 
        onClick={onAddNewTask}
        className="flex items-center text-sm bg-thalos-blue hover:bg-blue-600"
      >
        <Plus size={16} className="mr-1" />
        New Task
      </Button>
    </div>
  );
};

export default TasksHeader;
