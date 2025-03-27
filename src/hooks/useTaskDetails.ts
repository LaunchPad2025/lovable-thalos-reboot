
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Task } from '@/types/models';
import { useTasks } from '@/hooks/useTasks';

export function useTaskDetails(id: string | undefined) {
  // Get the hasRealData flag from the tasks hook
  const { hasRealData } = useTasks();
  
  // Check if we should bypass task queries due to the RLS issues
  const shouldBypassTaskQueries = typeof window !== 'undefined' && 
    window.localStorage.getItem('bypass_task_query') === 'true';

  const {
    data: taskDetails,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['task', id],
    queryFn: async () => {
      if (!id) return null;
      
      // If we're bypassing queries due to RLS issues and this is a mock task, return mock data
      if (shouldBypassTaskQueries && id.startsWith('task-')) {
        console.log("Using bypass mode for task details query");
        return {
          id,
          title: id === 'task-1' ? 'Inspect scaffolding on east wing' : 
                 id === 'task-2' ? 'Replace damaged PPE equipment' : 
                 'Update fire evacuation plan',
          description: 'Task details unavailable in fallback mode.',
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
      
      try {
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .eq('id', id)
          .maybeSingle(); // Using maybeSingle instead of single to avoid errors
        
        if (error) {
          console.error("Error fetching task details:", error);
          
          // If we have real data but this specific task isn't found, don't fall back to mock data
          if (hasRealData) {
            return null;
          }
          
          // If we're trying to get details for one of our mock tasks and no real data exists
          if (id.startsWith('task-') && !hasRealData) {
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
