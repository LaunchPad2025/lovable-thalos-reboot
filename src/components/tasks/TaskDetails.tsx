
import React from 'react';
import { Task } from '@/types/models';
import StatusBadge from '../ui/StatusBadge';
import TaskMetadata from './metadata/TaskMetadata';
import TaskStatusControl from './status/TaskStatusControl';
import TaskComments from './comments/TaskComments';
import { useTaskViolation } from '@/hooks/useTaskViolation';

interface TaskDetailsProps {
  task: Task | null;
  onStatusChange?: (newStatus: Task['status']) => void;
}

const TaskDetails = ({ task, onStatusChange }: TaskDetailsProps) => {
  // If the task has a violation_id, we'll try to fetch the related violation
  const { data: violationDetails } = useTaskViolation(task?.violation_id);
  
  if (!task) {
    return (
      <div className="h-full border border-gray-800 bg-[#0f1419] rounded-lg shadow-sm flex items-center justify-center p-6">
        <div className="text-center text-gray-400">
          <p>Select a task to view details</p>
          <p className="text-sm mt-1">or create a new task</p>
        </div>
      </div>
    );
  }
  
  // Get assignee name from the assignee_id (for display purposes)
  const assigneeName = task.assignee_id || "Unassigned";
  
  const formattedDueDate = task.due_date 
    ? new Date(task.due_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : "No due date";
  
  return (
    <div className="h-full border border-gray-800 bg-[#0f1419] rounded-lg shadow-sm overflow-hidden flex flex-col">
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium text-white">{task.title}</h2>
          <p className="text-sm text-gray-400">ID: {task.id}</p>
        </div>
        <StatusBadge status={task.status} />
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-300 mb-2">Description</h3>
          <p className="text-sm text-white">{task.description || "No description provided"}</p>
        </div>
        
        <TaskMetadata
          dueDate={formattedDueDate}
          assigneeName={assigneeName}
          status={task.status}
          priority={task.priority}
          violationDetails={violationDetails}
        />
        
        <TaskStatusControl 
          status={task.status} 
          onStatusChange={onStatusChange} 
        />
        
        <TaskComments 
          taskId={task.id}
          assigneeName={assigneeName}
        />
      </div>
    </div>
  );
};

export default TaskDetails;
