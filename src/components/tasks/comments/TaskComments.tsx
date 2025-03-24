
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface TaskCommentsProps {
  taskId: string;
  assigneeName: string;
}

const TaskComments = ({ taskId, assigneeName }: TaskCommentsProps) => {
  const { toast } = useToast();
  const [newComment, setNewComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  
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
  
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-300 mb-3">Comments</h3>
      <div className="space-y-4 mb-4">
        <div className="p-3 bg-[#1a1f29] rounded-md border border-gray-700">
          <div className="flex justify-between items-start">
            <p className="text-xs font-medium text-gray-300">System</p>
            <span className="text-xs text-gray-500">Today</span>
          </div>
          <p className="text-sm mt-1 text-gray-300">Task created and assigned to {assigneeName}.</p>
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
  );
};

export default TaskComments;
