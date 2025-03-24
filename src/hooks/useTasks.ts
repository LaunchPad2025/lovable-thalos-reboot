
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Task } from '@/types/models';
import { useToast } from '@/hooks/use-toast';

export function useTasks() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: tasks,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Task[];
    }
  });

  const updateTaskStatus = async (taskId: string, newStatus: Task['status']) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', taskId);
      
      if (error) throw error;
      
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
    tasks,
    isLoading,
    isError,
    refetch,
    updateTaskStatus
  };
}
