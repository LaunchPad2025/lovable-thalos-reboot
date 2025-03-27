
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Task } from '@/types/models';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth';

export function useTaskCreator() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  const createTaskMutation = useMutation({
    mutationFn: async (taskData: Partial<Task>) => {
      console.log("Creating new task:", taskData);
      
      const newTask = {
        ...taskData,
        created_by: user?.id || null,
        organization_id: taskData.organization_id || 'default-org', // This should be replaced with the user's actual org
        status: taskData.status || 'pending',
        priority: taskData.priority || 'medium',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      const { data, error } = await supabase
        .from('tasks')
        .insert(newTask)
        .select()
        .single();
      
      if (error) {
        console.error("Error creating task:", error);
        throw error;
      }
      
      return data;
    },
    onSuccess: (data) => {
      toast.success("Task created successfully");
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error) => {
      console.error("Error in task creation:", error);
      toast.error("Failed to create task. Please try again.");
    }
  });

  return {
    createTask: createTaskMutation.mutate,
    isCreating: createTaskMutation.isPending,
    createError: createTaskMutation.error
  };
}
