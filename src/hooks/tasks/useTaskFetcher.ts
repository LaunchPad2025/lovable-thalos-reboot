
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Task } from '@/types/models';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { mockTasks } from './mockTasks';
import { useAuthStatus } from '@/hooks/useAuthStatus';

export function useTaskFetcher() {
  const { isAuthenticated, isDemoMode } = useAuthStatus();

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
          
          // Only use fallback data in demo mode
          if (isDemoMode) {
            console.log("Using demo data since in demo mode");
            toast.info("Using demo data since we're in demo mode");
            return mockTasks;
          }
          
          // For authenticated users, show the error but return empty array
          toast.error("Error fetching your tasks. Please try again.");
          return [];
        }
        
        console.log(`Successfully fetched ${data?.length} tasks`);
        
        // In demo mode, if no tasks were found, return mock data
        if (isDemoMode && (!data || data.length === 0)) {
          console.log("No tasks found in demo mode, returning demo data");
          return mockTasks;
        }
        
        // For authenticated users or if we have real data, return it
        return data as Task[];
      } catch (err) {
        console.error("Exception in task fetch:", err);
        
        // Only use fallback data in demo mode
        if (isDemoMode) {
          console.log("Returning fallback data in demo mode due to exception");
          toast.info("Using demo data instead");
          return mockTasks;
        }
        
        // For authenticated users, return empty array
        toast.error("Error connecting to database. Please try again later.");
        return [];
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
    // For authenticated users with errors, return empty array
    // For demo mode with errors, return mock data
    tasks: isAuthenticated ? (isError ? [] : tasks) : (isError ? mockTasks : tasks || mockTasks),
    isLoading,
    isError,
    refetch,
  };
}
