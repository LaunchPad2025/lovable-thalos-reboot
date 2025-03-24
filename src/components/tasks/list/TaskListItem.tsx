
import React from 'react';
import { cn } from '@/lib/utils';
import StatusBadge from '@/components/ui/StatusBadge';
import { Task } from '@/types/models';

interface TaskListItemProps {
  task: Task;
  isSelected: boolean;
  onSelect: (task: Task) => void;
}

const TaskListItem = ({ task, isSelected, onSelect }: TaskListItemProps) => {
  return (
    <div 
      onClick={() => onSelect(task)}
      className={cn(
        "p-4 hover:bg-gray-50 cursor-pointer transition-colors",
        isSelected && "bg-blue-50 hover:bg-blue-50 border-l-4 border-thalos-blue"
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900">{task.title}</h3>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{task.description}</p>
          <div className="mt-2 flex items-center">
            <span className="text-xs text-gray-500 mr-2">Due: {task.dueDate}</span>
            <span className="text-xs text-gray-500">Assignee: {task.assignee}</span>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <StatusBadge status={task.status} />
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full
              ${task.priority === 'low' ? 'bg-green-100 text-green-800' : 
                task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'}`}
          >
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskListItem;
