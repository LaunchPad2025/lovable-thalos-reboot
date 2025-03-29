
import React from 'react';
import { Task } from '@/types/models';
import StatusBadge from '../ui/StatusBadge';
import TaskMetadata from './metadata/TaskMetadata';
import TaskStatusControl from './status/TaskStatusControl';
import { useTaskViolation } from '@/hooks/useTaskViolation';
import { Calendar, User, MapPin, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  
  const isOverdue = task.due_date && new Date(task.due_date) < new Date();
  
  return (
    <div className="h-full border border-gray-800 bg-[#0f1419] rounded-lg shadow-sm overflow-hidden flex flex-col">
      {/* Task Header */}
      <div className="p-4 border-b border-gray-800 bg-[#1a1f29]">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-medium text-white">{task.title}</h2>
            <div className="flex items-center text-sm text-gray-400 mt-1">
              <span>ID: {task.id}</span>
            </div>
          </div>
          <StatusBadge status={task.status} />
        </div>
      </div>
      
      {/* Task Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Task Metadata */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-gray-300">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span>Created: {new Date(task.created_at).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <User className="h-4 w-4 text-gray-500" />
            <span>Created by: System Admin</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span>Location: {task.worksite_id || "Unassigned"}</span>
          </div>
          {violationDetails && (
            <div className="flex items-center gap-2 text-gray-300">
              <FileText className="h-4 w-4 text-gray-500" />
              <span>Related Documents: Safety-Protocol-1.pdf</span>
            </div>
          )}
        </div>
        
        {/* Task Description */}
        <div>
          <h3 className="text-sm font-medium text-gray-300 mb-2">Description</h3>
          <div className="bg-[#1a1f29] p-4 rounded-md border border-gray-800 text-white">
            {task.description || "No description provided"}
          </div>
        </div>
        
        {/* Task Assignment Info */}
        <div>
          <h3 className="text-sm font-medium text-gray-300 mb-2">Assignment Details</h3>
          <div className="bg-[#1a1f29] p-4 rounded-md border border-gray-800">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">Assignee</p>
                <p className="text-white">{assigneeName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Due Date</p>
                <p className={isOverdue ? "text-red-400" : "text-white"}>
                  {formattedDueDate}
                  {isOverdue && <span className="text-red-400 ml-2 text-sm">Overdue</span>}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">Priority</p>
                <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                  ${task.priority === 'high' ? 'bg-orange-500 text-white' : 
                    task.priority === 'medium' ? 'bg-blue-500 text-white' :
                    'bg-gray-700 text-white'}`}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Violation Information */}
        {violationDetails && (
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-2">Related Violation</h3>
            <div className="bg-[#1a1f29] p-4 rounded-md border border-gray-800">
              <p className="font-medium text-white mb-1">{violationDetails.violation}</p>
              <div className="text-sm text-gray-300">
                <p>This task was automatically generated from a detected safety violation.</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Task Status Control */}
        <TaskStatusControl 
          status={task.status} 
          onStatusChange={onStatusChange} 
        />
      </div>
      
      {/* Task Actions */}
      <div className="p-4 border-t border-gray-800 bg-[#1a1f29]">
        <Button className="bg-blue-600 hover:bg-blue-700">
          Edit Task
        </Button>
      </div>
    </div>
  );
};

export default TaskDetails;
