
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Task } from '@/types/models';
import { useState } from 'react';
import { toast } from 'sonner';
import { mockTasks } from './mockTasks';

export function useTaskFetcher() {
  // State to track if real data has been found
  const [hasRealData, setHasRealData] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  
  // Create a query to fetch tasks
  const {
    data: tasks,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['tasks', retryCount],
    queryFn: async () => {
      try {
        console.log("Fetching tasks from Supabase...");
        
        // First try to see if the RLS error is fixed
        // If there's still an RLS error, this will throw and we'll catch it
        const { data: testRLS, error: rlsError } = await supabase
          .from('organization_members')
          .select('organization_id')
          .limit(1);
          
        if (rlsError && rlsError.message.includes('infinite recursion')) {
          console.error("Still experiencing RLS recursion errors. Using mock data:", rlsError);
          toast.error("Database policy error. Using demo data until fixed.", { 
            id: "rls-error",
            duration: 10000
          });
          return hasRealData ? [] : mockTasks;
        }
        
        // If RLS check passed, fetch the actual tasks
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error("Error fetching tasks from Supabase:", error);
          
          // Show a toast notification about the error
          toast.error("Error fetching tasks: " + error.message, {
            id: "task-fetch-error",
            duration: 5000
          });
          
          // Return mock data if we haven't found real data yet
          return hasRealData ? [] : mockTasks;
        }
        
        console.log(`Successfully fetched ${data?.length} tasks`);
        
        // If tasks were found, set the flag to true
        if (data && data.length > 0) {
          setHasRealData(true);
          return data as Task[];
        }
        
        // If no tasks were found and we don't have real data yet, return mock data
        if (!hasRealData) {
          console.log("No tasks found, returning demo data");
          toast.info("No tasks found. Showing demo data until you create tasks.", {
            id: "no-tasks-found"
          });
          return mockTasks;
        }
        
        // Otherwise return empty array
        return [] as Task[];
      } catch (err) {
        console.error("Exception in task fetch:", err);
        
        // Show a toast notification about using mock data
        toast.error("Error connecting to database. Using demo data instead.", {
          id: "db-connection-error"
        });
        
        // Return fallback data for any other errors, but only if no real data exists
        return hasRealData ? [] : mockTasks;
      }
    },
    retry: 1,
    retryDelay: attempt => Math.min(attempt > 1 ? 2000 : 1000, 30 * 1000),
    refetchOnWindowFocus: false,
    staleTime: 2 * 60 * 1000 // 2 minutes
  });

  // Function to manually retry connection with a fresh query key
  const retryConnection = () => {
    setRetryCount(prev => prev + 1);
    toast.info("Retrying database connection...");
  };

  return {
    tasks: tasks || [],
    hasRealData,
    isLoading,
    isError,
    error,
    refetch,
    retryConnection
  };
}
