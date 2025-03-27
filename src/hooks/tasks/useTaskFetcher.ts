
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Task } from '@/types/models';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { mockTasks } from './mockTasks';

export function useTaskFetcher() {
  // State to track if real data has been found
  const [hasRealData, setHasRealData] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

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
        console.log("Fetching tasks...");
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error("Error fetching tasks from Supabase:", error);
          
          // Check if this is a recursive policy error
          if (error.code === '42P17' && error.message.includes('infinite recursion')) {
            toast.error("Database policy error. Please contact support.", {
              id: "db-policy-error",
              duration: 5000
            });
            return hasRealData ? [] : mockTasks;
          }
          
          console.log("Returning fallback data");
          // Show a toast notification about using mock data
          toast("Using demo data since we couldn't connect to the database", {
            id: "using-mock-data" // Use an ID to prevent duplicate toasts
          });
          
          // Return fallback data when Supabase fails
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
            id: "no-tasks-found" // Use an ID to prevent duplicate toasts
          });
          return mockTasks;
        }
        
        // Otherwise return empty array
        return [] as Task[];
      } catch (err) {
        console.error("Exception in task fetch:", err);
        console.log("Returning fallback data due to exception");
        // Show a toast notification about using mock data
        toast.error("Error connecting to database. Using demo data instead.", {
          id: "db-connection-error" // Use an ID to prevent duplicate toasts
        });
        // Return fallback data for any other errors, but only if no real data exists
        return hasRealData ? [] : mockTasks;
      }
    },
    retry: 2, // Reduced retry count to prevent excessive retries
    retryDelay: attempt => Math.min(attempt > 1 ? 2000 : 1000, 30 * 1000),
    refetchOnWindowFocus: false,
    staleTime: 2 * 60 * 1000 // 2 minutes
  });

  // Function to manually retry connection with a fresh query key
  const retryConnection = () => {
    setRetryCount(prev => prev + 1);
  };

  // Log error to console
  useEffect(() => {
    if (error) {
      console.error("Task query error:", error);
    }
  }, [error]);

  return {
    tasks: tasks || [],
    hasRealData,
    isLoading,
    isError,
    refetch,
    retryConnection
  };
}
