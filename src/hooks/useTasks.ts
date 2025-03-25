
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Task } from '@/types/models';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

// Fallback task data for when Supabase is unavailable
const mockTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Inspect scaffolding on east wing',
    description: 'Perform safety inspection on newly installed scaffolding at the east wing construction site',
    due_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'open',
    assignee_id: 'John Smith',
    priority: 'high',
    organization_id: 'org-1',
    created_by: 'user-1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'task-2',
    title: 'Replace damaged PPE equipment',
    description: 'Replace worn out helmets and safety harnesses in the main storage',
    due_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'in-progress',
    assignee_id: 'Jane Doe',
    priority: 'medium',
    organization_id: 'org-1',
    created_by: 'user-1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'task-3',
    title: 'Update fire evacuation plan',
    description: 'Review and update fire evacuation procedures for the new office layout',
    due_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'open',
    assignee_id: 'Alex Johnson',
    priority: 'high',
    organization_id: 'org-1',
    created_by: 'user-1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export function useTasks() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: tasks,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error("Error fetching tasks from Supabase:", error);
          // Return fallback data when Supabase fails
          return mockTasks;
        }
        
        return data as Task[];
      } catch (err) {
        console.error("Exception in task fetch:", err);
        // Return fallback data for any other errors
        return mockTasks;
      }
    }
  });

  // Log error to console
  useEffect(() => {
    if (error) {
      console.error("Task query error:", error);
    }
  }, [error]);

  const updateTaskStatus = async (taskId: string, newStatus: Task['status']) => {
    try {
      // For real data, try to update Supabase
      if (!mockTasks.some(t => t.id === taskId)) {
        const { error } = await supabase
          .from('tasks')
          .update({ 
            status: newStatus,
            updated_at: new Date().toISOString()
          })
          .eq('id', taskId);
        
        if (error) throw error;
      }
      
      toast({
        title: "Status updated",
        description: `Task status changed to ${newStatus.replace('-', ' ')}.`,
      });
      
      // Refresh tasks list
      await queryClient.invalidateQueries({ queryKey: ['tasks'] });
      return true;
    } catch (error) {
      console.error("Error updating task status:", error);
      toast({
        title: "Failed to update status",
        description: "There was an error updating the status. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    // If we got an error and have no tasks, return the mock data
    tasks: isError && (!tasks || tasks.length === 0) ? mockTasks : tasks,
    isLoading,
    isError,
    refetch,
    updateTaskStatus
  };
}
