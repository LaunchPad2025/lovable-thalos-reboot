
import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PriorityBadgeProps {
  priority: string;
}

const PriorityBadge = ({ priority }: PriorityBadgeProps) => {
  const getBadgeStyles = () => {
    switch (priority) {
      case 'high':
        return 'bg-orange-500 text-white';
      case 'medium':
        return 'bg-blue-500 text-white';
      case 'low':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getBadgeStyles()}`}>
      {priority}
    </div>
  );
};

interface StatusBadgeProps {
  status: string;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getBadgeStyles = () => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 text-white';
      case 'in-progress':
        return 'bg-blue-500 text-white';
      case 'pending':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getBadgeStyles()}`}>
      {status === 'in-progress' ? 'In Progress' : status}
    </div>
  );
};

interface TasksListProps {
  tasks: any[];
  onItemSelect: (item: any) => void;
}

const TasksList = ({ tasks, onItemSelect }: TasksListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 border border-gray-800 rounded-md bg-[#161b22]">
        <div className="text-center p-6">
          <h3 className="text-lg font-medium text-white mb-2">No tasks found</h3>
          <p className="text-gray-400 mb-4">
            There are no tasks matching your current filters
          </p>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => {}}
          >
            Create a new task
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Table header */}
      <div className="grid grid-cols-12 gap-4 py-2 text-sm text-gray-400 border-b border-gray-800">
        <div className="col-span-4">Task</div>
        <div className="col-span-2">Worksite</div>
        <div className="col-span-2">Assignee</div>
        <div className="col-span-1">Due Date</div>
        <div className="col-span-1">Priority</div>
        <div className="col-span-1">Status</div>
        <div className="col-span-1 text-right">Actions</div>
      </div>

      {/* Task rows */}
      <div className="divide-y divide-gray-800">
        {tasks.map((task) => (
          <div 
            key={task.id} 
            className="grid grid-cols-12 gap-4 py-4 hover:bg-[#1a1f29] cursor-pointer"
            onClick={() => onItemSelect(task)}
          >
            <div className="col-span-4 flex items-center">
              <div className="w-8 h-8 mr-2 flex-shrink-0 rounded bg-blue-900/30 flex items-center justify-center">
              </div>
              <div className="truncate">
                <div className="font-medium text-white truncate">{task.title}</div>
              </div>
            </div>
            <div className="col-span-2 text-gray-300 flex items-center">{task.worksite_id || "Unknown"}</div>
            <div className="col-span-2 text-gray-300 flex items-center">{task.assignee_id || "Unassigned"}</div>
            <div className="col-span-1 flex items-center">
              <div className="text-red-400 text-sm">
                {new Date(task.due_date || '').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                <div className="text-xs">Overdue</div>
              </div>
            </div>
            <div className="col-span-1 flex items-center">
              <PriorityBadge priority={task.priority} />
            </div>
            <div className="col-span-1 flex items-center">
              <StatusBadge status={task.status} />
            </div>
            <div className="col-span-1 flex items-center justify-end">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TasksList;
