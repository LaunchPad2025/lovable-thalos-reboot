
import React, { useState } from 'react';
import { Calendar, Clock, User, AlertCircle, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import StatusBadge from '../ui/StatusBadge';
import { Task } from '@/types/models';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface TaskDetailsProps {
  task: Task | null;
  onStatusChange?: (newStatus: Task['status']) => void;
}

const TaskDetails = ({ task, onStatusChange }: TaskDetailsProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [newComment, setNewComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  
  const { data: violationDetails } = useQuery({
    queryKey: ['violation-for-task', task?.violation_id],
    queryFn: async () => {
      if (!task?.violation_id) return null;
      
      const { data, error } = await supabase
        .from('violations')
        .select('id, title')
        .eq('id', task.violation_id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!task?.violation_id
  });
  
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
  
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    setSubmittingComment(true);
    
    try {
      // In a real app, we would store comments in a separate table with relation to tasks
      // For now, we'll just show a toast
      toast({
        title: "Comment added",
        description: "Your comment has been added to the task.",
      });
      setNewComment('');
    } catch (error) {
      console.error("Error adding comment:", error);
      toast({
        title: "Failed to add comment",
        description: "There was an error adding your comment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmittingComment(false);
    }
  };

  const formattedDueDate = new Date(task.due_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
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
          <p className="text-sm text-white">{task.description}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center">
            <Calendar size={16} className="text-gray-400 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Due Date</p>
              <p className="text-sm font-medium text-gray-300">{formattedDueDate}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <User size={16} className="text-gray-400 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Assigned To</p>
              <p className="text-sm font-medium text-gray-300">{task.assignee}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Clock size={16} className="text-gray-400 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Status</p>
              <p className="text-sm font-medium text-gray-300">{task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ')}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <AlertCircle size={16} className="text-gray-400 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Priority</p>
              <p className="text-sm font-medium text-gray-300">{task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</p>
            </div>
          </div>
        </div>
        
        {violationDetails && (
          <div className="mb-6 p-3 bg-[#131920] border border-gray-800 rounded-md">
            <div className="flex items-center">
              <Link2 size={16} className="text-thalos-blue mr-2" />
              <div>
                <p className="text-xs text-gray-500">Related Violation</p>
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-sm font-medium text-thalos-blue hover:text-blue-400"
                  onClick={() => navigate(`/violations/${violationDetails.id}`)}
                >
                  {violationDetails.title}
                </Button>
              </div>
            </div>
          </div>
        )}
        
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-300 mb-3">Update Status</h3>
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
                    : "bg-[#1a1f29] border-gray-700 text-gray-300 hover:bg-gray-800"
                }
              >
                {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
              </Button>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-300 mb-3">Comments</h3>
          <div className="space-y-4 mb-4">
            <div className="p-3 bg-[#1a1f29] rounded-md border border-gray-700">
              <div className="flex justify-between items-start">
                <p className="text-xs font-medium text-gray-300">System</p>
                <span className="text-xs text-gray-500">Today</span>
              </div>
              <p className="text-sm mt-1 text-gray-300">Task created and assigned to {task.assignee}.</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmitComment}>
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mb-2 bg-[#1a1f29] border-gray-700 text-white"
              rows={3}
            />
            <Button 
              type="submit" 
              className="bg-thalos-blue hover:bg-blue-600"
              disabled={submittingComment || !newComment.trim()}
            >
              {submittingComment ? 'Adding...' : 'Add Comment'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
