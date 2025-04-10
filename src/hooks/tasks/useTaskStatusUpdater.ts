
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Task } from '@/types/models';
import { toast } from 'sonner';
import { mockTasks } from './mockTasks';

export function useTaskStatusUpdater() {
  const queryClient = useQueryClient();

  const updateTaskMutation = useMutation({
    mutationFn: async ({
      taskId,
      newStatus
    }: {
      taskId: string;
      newStatus: Task['status'];
    }) => {
      if (mockTasks.some(t => t.id === taskId)) {
        // Mock update for demo tasks
        console.log("Updating mock task status:", taskId, newStatus);
        return { id: taskId, status: newStatus };
      }
      
      console.log("Updating task status in database:", taskId, newStatus);
      const { data, error } = await supabase
        .from('tasks')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', taskId)
        .select();
      
      if (error) throw error;
      return data[0];
    },
    onSuccess: (data) => {
      // Using the correct Sonner toast format
      toast(`Task status changed to ${data.status.replace('-', ' ')}.`);
      
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['task', data.id] });
    },
    onError: (error) => {
      console.error("Error updating task status:", error);
      // Using the correct Sonner toast format for errors
      toast.error("There was an error updating the status. Please try again.");
    }
  });

  const updateTaskStatus = (taskId: string, newStatus: Task['status']) => {
    return updateTaskMutation.mutate({ taskId, newStatus });
  };

  return { updateTaskStatus };
}
