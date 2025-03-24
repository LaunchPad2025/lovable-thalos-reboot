
import React from 'react';
import { Button } from '@/components/ui/button';
import { Task } from '@/types/models';

interface TaskStatusControlProps {
  status: Task['status'];
  onStatusChange?: (newStatus: Task['status']) => void;
}

const TaskStatusControl = ({ status, onStatusChange }: TaskStatusControlProps) => {
  const statusOptions: Task['status'][] = ['open', 'in-progress', 'completed', 'overdue', 'pending'];
  
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-300 mb-3">Update Status</h3>
      <div className="flex flex-wrap gap-2">
        {statusOptions.map((statusOption) => (
          <Button
            key={statusOption}
            variant={status === statusOption ? "default" : "outline"}
            size="sm"
            onClick={() => onStatusChange?.(statusOption)}
            className={
              status === statusOption
                ? "bg-thalos-blue hover:bg-blue-600"
                : "bg-[#1a1f29] border-gray-700 text-gray-300 hover:bg-gray-800"
            }
          >
            {statusOption.charAt(0).toUpperCase() + statusOption.slice(1).replace('-', ' ')}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TaskStatusControl;
