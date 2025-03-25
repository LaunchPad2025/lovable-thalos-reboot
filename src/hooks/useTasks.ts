
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Task } from '@/types/models';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';
import { toast } from 'sonner';

// Fallback task data for when Supabase is unavailable
const mockTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Review PPE compliance for production floor',
    description: 'Conduct a thorough inspection of all personal protective equipment on the production floor. Document any violations or issues.',
    due_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'completed',
    assignee_id: 'John Smith',
    priority: 'high',
    organization_id: 'org-1',
    created_by: 'user-1',
    worksite_id: 'North Production Facility',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'task-2',
    title: 'Update fire safety evacuation plan',
    description: 'Review and update the current evacuation plan to include new building extensions. Ensure all fire exits are properly marked.',
    due_date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'in-progress',
    assignee_id: 'Sarah Johnson',
    priority: 'medium',
    organization_id: 'org-1',
    created_by: 'user-1',
    worksite_id: 'Main Office',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'task-3',
    title: 'Conduct monthly safety committee meeting',
    description: 'Organize and lead the monthly safety committee meeting. Prepare agenda and document minutes.',
    due_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
    assignee_id: 'Michael Chen',
    priority: 'high',
    organization_id: 'org-1',
    created_by: 'user-1',
    worksite_id: 'Main Office',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'task-4',
    title: 'Order new safety signage for chemical storage',
    description: 'Order GHS compliant safety signage for the chemical storage area to replace damaged signs.',
    due_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'in-progress',
    assignee_id: 'Lisa Rodriguez',
    priority: 'low',
    organization_id: 'org-1',
    created_by: 'user-1',
    worksite_id: 'South Warehouse',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'task-5',
    title: 'Complete OSHA compliance documentation',
    description: 'Fill out and submit required OSHA compliance documentation for the quarterly audit.',
    due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
    assignee_id: 'David Wilson',
    priority: 'high',
    organization_id: 'org-1',
    created_by: 'user-1',
    worksite_id: 'West Distribution Center',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export function useTasks() {
  const { toast: uiToast } = useToast();
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
        console.log("Fetching tasks...");
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error("Error fetching tasks from Supabase:", error);
          console.log("Returning fallback data");
          // Show a toast notification about using mock data
          toast("Using demo data since we couldn't connect to the database");
          // Return fallback data when Supabase fails
          return mockTasks;
        }
        
        console.log(`Successfully fetched ${data?.length} tasks`);
        
        // If no tasks were found, return mock data for demonstration
        if (!data || data.length === 0) {
          console.log("No tasks found, returning demo data");
          toast("No tasks found. Showing demo data.");
          return mockTasks;
        }
        
        return data as Task[];
      } catch (err) {
        console.error("Exception in task fetch:", err);
        console.log("Returning fallback data due to exception");
        // Show a toast notification about using mock data
        toast.error("Error connecting to database. Using demo data instead.");
        // Return fallback data for any other errors
        return mockTasks;
      }
    },
    retry: 3,
    retryDelay: attempt => Math.min(attempt > 1 ? 2000 : 1000, 30 * 1000),
    refetchOnWindowFocus: false,
    staleTime: 2 * 60 * 1000 // 2 minutes
  });

  // Log error to console
  useEffect(() => {
    if (error) {
      console.error("Task query error:", error);
    }
  }, [error]);

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
      toast({
        title: "Status updated",
        description: `Task status changed to ${data.status.replace('-', ' ')}.`,
      });
      
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['task', data.id] });
    },
    onError: (error) => {
      console.error("Error updating task status:", error);
      toast({
        title: "Failed to update status",
        description: "There was an error updating the status. Please try again.",
        variant: "destructive",
      });
    }
  });

  const updateTaskStatus = (taskId: string, newStatus: Task['status']) => {
    return updateTaskMutation.mutate({ taskId, newStatus });
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
