
import React, { useState } from 'react';
import { Calendar, Clock, User, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Task } from './TasksList';
import StatusBadge from '../ui/StatusBadge';

interface TaskDetailsProps {
  task?: Task;
  onStatusChange?: (newStatus: Task['status']) => void;
}

const TaskDetails = ({ task, onStatusChange }: TaskDetailsProps) => {
  const [newComment, setNewComment] = useState('');
  
  if (!task) {
    return (
      <div className="h-full border border-gray-200 bg-white rounded-lg shadow-sm flex items-center justify-center p-6">
        <div className="text-center text-gray-500">
          <p>Select a task to view details</p>
          <p className="text-sm mt-1">or create a new task</p>
        </div>
      </div>
    );
  }
  
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would submit the comment to the backend
    setNewComment('');
  };
  
  return (
    <div className="h-full border border-gray-200 bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium text-gray-900">{task.title}</h2>
          <p className="text-sm text-gray-500">ID: {task.id}</p>
        </div>
        <StatusBadge status={task.status} />
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
          <p className="text-sm text-gray-900">{task.description}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center">
            <Calendar size={16} className="text-gray-400 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Due Date</p>
              <p className="text-sm font-medium">{task.dueDate}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <User size={16} className="text-gray-400 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Assigned To</p>
              <p className="text-sm font-medium">{task.assignee}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Clock size={16} className="text-gray-400 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Status</p>
              <p className="text-sm font-medium">{task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ')}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <AlertCircle size={16} className="text-gray-400 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Priority</p>
              <p className="text-sm font-medium">{task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</p>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Update Status</h3>
          <div className="flex space-x-2">
            {['open', 'in-progress', 'completed', 'overdue'].map((status) => (
              <Button
                key={status}
                variant={task.status === status ? "default" : "outline"}
                size="sm"
                onClick={() => onStatusChange?.(status as Task['status'])}
                className={
                  task.status === status
                    ? "bg-thalos-blue hover:bg-blue-600"
                    : ""
                }
              >
                {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
              </Button>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Comments</h3>
          <div className="space-y-4 mb-4">
            <div className="p-3 bg-gray-50 rounded-md">
              <div className="flex justify-between items-start">
                <p className="text-xs font-medium text-gray-700">System</p>
                <span className="text-xs text-gray-500">Today</span>
              </div>
              <p className="text-sm mt-1">Task created and assigned to {task.assignee}.</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmitComment}>
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mb-2"
              rows={3}
            />
            <Button 
              type="submit" 
              className="bg-thalos-blue hover:bg-blue-600"
              disabled={!newComment.trim()}
            >
              Add Comment
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
