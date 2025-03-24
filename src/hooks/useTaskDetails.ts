
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Task } from '@/types/models';

export function useTaskDetails(id: string | undefined) {
  const {
    data: taskDetails,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['task', id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as Task;
    },
    enabled: !!id
  });

  return {
    taskDetails,
    isLoading,
    isError
  };
}
