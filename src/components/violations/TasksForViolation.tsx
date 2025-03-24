
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Task } from '@/types/models';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TasksForViolationProps {
  violationId: string;
}

const TasksForViolation = ({ violationId }: TasksForViolationProps) => {
  const navigate = useNavigate();
  
  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks-for-violation', violationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('violation_id', violationId);
      
      if (error) throw error;
      // Cast to Task[] type - this is safe as we've updated our Task model
      return data as Task[];
    }
  });
  
  if (isLoading) {
    return <div>Loading tasks...</div>;
  }
  
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-white">Related Tasks</h3>
        <Button 
          size="sm" 
          className="bg-thalos-blue hover:bg-blue-600"
          onClick={() => navigate(`/tasks?violation=${violationId}`)}
        >
          <PlusCircle size={16} className="mr-1" />
          Add Task
        </Button>
      </div>
      
      {tasks && tasks.length > 0 ? (
        <div className="space-y-3">
          {tasks.map(task => (
            <div 
              key={task.id} 
              className="p-3 bg-[#1a1f29] rounded-md border border-gray-800 cursor-pointer hover:bg-[#212836] transition-colors"
              onClick={() => navigate(`/tasks/${task.id}`)}
            >
              <div className="flex justify-between">
                <p className="font-medium text-white">{task.title}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  task.priority === 'high' ? 'bg-red-900/30 text-red-400' :
                  task.priority === 'medium' ? 'bg-amber-900/30 text-amber-400' :
                  'bg-green-900/30 text-green-400'
                }`}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-1">{
                task.due_date 
                  ? `Due: ${new Date(task.due_date).toLocaleDateString()}`
                  : 'No due date'
              }</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 bg-[#1a1f29] rounded-md border border-gray-800">
          <p className="text-gray-400">No tasks have been assigned to this violation yet</p>
          <Button 
            variant="outline" 
            size="sm"
            className="mt-2 bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800"
            onClick={() => navigate(`/tasks?violation=${violationId}`)}
          >
            Create Task
          </Button>
        </div>
      )}
    </div>
  );
};

export default TasksForViolation;
