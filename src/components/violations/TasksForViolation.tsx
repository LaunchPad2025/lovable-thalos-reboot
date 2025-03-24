
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Task } from '@/types/models';
import { Button } from '@/components/ui/button';
import StatusBadge from '../ui/StatusBadge';
import { PlusCircle, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TasksForViolationProps {
  violationId: string;
}

const TasksForViolation = ({ violationId }: TasksForViolationProps) => {
  const navigate = useNavigate();
  
  const { data: tasks, isLoading, isError } = useQuery({
    queryKey: ['tasks', violationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('violation_id', violationId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Task[];
    }
  });

  if (isLoading) {
    return (
      <div className="mt-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium text-white">Remediation Tasks</h3>
        </div>
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-thalos-blue mx-auto"></div>
          <p className="mt-2 text-gray-400">Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium text-white">Remediation Tasks</h3>
        </div>
        <div className="p-4 bg-red-900/20 border border-red-700/30 rounded-md text-center">
          <p className="text-red-300">Failed to load tasks</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-medium text-white">Remediation Tasks</h3>
        <Button 
          size="sm" 
          className="bg-thalos-blue hover:bg-blue-600"
          onClick={() => navigate(`/tasks/new?violation=${violationId}`)}
        >
          <PlusCircle size={16} className="mr-1" />
          New Task
        </Button>
      </div>
      
      {tasks && tasks.length > 0 ? (
        <div className="space-y-3">
          {tasks.map(task => (
            <div 
              key={task.id} 
              className="p-4 bg-[#1a1f29] rounded-md border border-gray-700 hover:border-gray-600 cursor-pointer transition-all"
              onClick={() => navigate(`/tasks/${task.id}`)}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-white">{task.title}</h4>
                <StatusBadge status={task.status} />
              </div>
              <p className="text-sm text-gray-400 mb-3 line-clamp-2">{task.description}</p>
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center text-gray-400">
                  <Calendar size={14} className="mr-1" />
                  Due: {new Date(task.due_date).toLocaleDateString()}
                </div>
                <span className="text-gray-400">Assigned to: {task.assignee}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-6 text-center bg-[#1a1f29] rounded-md border border-gray-700">
          <p className="text-gray-400 mb-3">No remediation tasks have been created for this violation yet.</p>
          <Button 
            className="bg-thalos-blue hover:bg-blue-600"
            onClick={() => navigate(`/tasks/new?violation=${violationId}`)}
          >
            <PlusCircle size={16} className="mr-2" />
            Create First Task
          </Button>
        </div>
      )}
    </div>
  );
};

export default TasksForViolation;
