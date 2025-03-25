
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Task } from '@/types/models';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { mockTasks } from './mockTasks';

export function useTaskFetcher() {
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

  return {
    tasks: isError && (!tasks || tasks.length === 0) ? mockTasks : tasks,
    isLoading,
    isError,
    refetch,
  };
}
