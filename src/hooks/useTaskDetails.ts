
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
      
      try {
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) {
          console.error("Error fetching task details:", error);
          // If we're trying to get details for one of our mock tasks
          if (id.startsWith('task-')) {
            // Return a mock task that matches the id
            return {
              id,
              title: id === 'task-1' ? 'Inspect scaffolding on east wing' : 
                     id === 'task-2' ? 'Replace damaged PPE equipment' : 
                     'Update fire evacuation plan',
              description: 'Task details unavailable. Please check your connection.',
              due_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
              status: 'open',
              assignee_id: 'Unassigned',
              priority: 'medium',
              organization_id: 'org-1',
              created_by: 'user-1',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            } as Task;
          }
          throw error;
        }
        
        return data as Task;
      } catch (err) {
        console.error("Exception in task details fetch:", err);
        return null;
      }
    },
    enabled: !!id
  });

  return {
    taskDetails,
    isLoading,
    isError
  };
}
