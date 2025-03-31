
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';
import { Task } from '@/types/models';
import { cn } from '@/lib/utils';

interface TaskListRowProps {
  task: Task;
  isSelected: boolean;
  isExpanded: boolean;
  onSelect: (task: Task) => void;
  onToggleExpand: (taskId: string, e: React.MouseEvent) => void;
}

const TaskListRow: React.FC<TaskListRowProps> = ({ 
  task, 
  isSelected, 
  isExpanded,
  onSelect, 
  onToggleExpand 
}) => {
  const isOverdue = task.due_date && new Date(task.due_date) < new Date();
  
  return (
    <tr 
      className={cn(
        "cursor-pointer hover:bg-[#1a1f29]",
        isSelected && "bg-[#1a1f29]"
      )}
      onClick={() => onSelect(task)}
    >
      <td className="px-4 py-4">
        <button 
          onClick={(e) => onToggleExpand(task.id, e)} 
          className="focus:outline-none"
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </button>
      </td>
      <td className="px-4 py-4">
        <div className="font-medium text-white">{task.title}</div>
      </td>
      <td className="px-4 py-4 text-gray-300">
        {task.worksite_id || "Unassigned"}
      </td>
      <td className="px-4 py-4 text-gray-300">
        {task.assignee_id || "Unassigned"}
      </td>
      <td className="px-4 py-4">
        <div className={isOverdue ? "text-red-500" : "text-gray-300"}>
          {task.due_date ? new Date(task.due_date).toLocaleDateString() : "No due date"}
          {isOverdue && <div className="text-xs text-red-500">Overdue</div>}
        </div>
      </td>
      <td className="px-4 py-4">
        <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
          ${task.priority === 'high' ? 'bg-orange-500 text-white' : 
            task.priority === 'medium' ? 'bg-blue-500 text-white' :
            'bg-gray-700 text-white'}`}>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </div>
      </td>
      <td className="px-4 py-4">
        <StatusBadge status={task.status as 'open' | 'in-progress' | 'resolved' | 'pending' | 'completed' | 'overdue' | 'cancelled'} />
      </td>
      <td className="px-4 py-4 text-gray-500">
        ...
      </td>
    </tr>
  );
};

export default TaskListRow;
