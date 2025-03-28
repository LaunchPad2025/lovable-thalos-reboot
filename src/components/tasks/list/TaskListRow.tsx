
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';
import { Task } from '@/types/models';
import { cn } from '@/lib/utils';
import { getDateStatus } from '@/utils/dateUtils';

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
  // Get the date status information
  const dueDateStatus = task.due_date ? getDateStatus(new Date(task.due_date)) : null;
  
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
        <div className={dueDateStatus ? dueDateStatus.className : "text-gray-300"}>
          {task.due_date ? new Date(task.due_date).toLocaleDateString() : "No due date"}
          {dueDateStatus && dueDateStatus.isPastDue && <div className="text-xs text-red-500">Past Due</div>}
          {dueDateStatus && dueDateStatus.isDueToday && <div className="text-xs text-yellow-500">Due Today</div>}
          {dueDateStatus && !dueDateStatus.isPastDue && !dueDateStatus.isDueToday && dueDateStatus.daysUntilDue && dueDateStatus.daysUntilDue <= 3 && 
            <div className="text-xs text-blue-500">Due Soon</div>
          }
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
        <StatusBadge status={task.status} />
      </td>
      <td className="px-4 py-4 text-gray-500">
        ...
      </td>
    </tr>
  );
};

export default TaskListRow;
