
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
        
        // First check if there's a policy error without doing a full query
        const { error: policyCheckError } = await supabase
          .from('tasks')
          .select('count')
          .limit(1);
          
        if (policyCheckError) {
          console.error("Policy check error:", policyCheckError.message);
          
          // Check specifically for RLS issues
          if (isPolicyError(policyCheckError.message)) {
            console.warn("RLS policy error detected, falling back to demo data");
            return fallbackToMockData(hasRealData);
          }
        }
        
        // If policy check passed, fetch the actual tasks
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error("Error fetching tasks:", error.message);
          
          // Handle RLS policy issues
          if (isPolicyError(error.message)) {
            return fallbackToMockData(hasRealData);
          }
          
          toast.error("Error fetching tasks: " + error.message, {
            id: "task-fetch-error",
            duration: 5000
          });
          
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
      } catch (err: any) {
        console.error("Exception in task fetch:", err);
        
        if (err.message && isPolicyError(err.message)) {
          return fallbackToMockData(hasRealData);
        }
        
        toast.error("Error connecting to database. Using demo data instead.", {
          id: "db-connection-error"
        });
        
        return hasRealData ? [] : mockTasks;
      }
    },
    retry: 1,
    retryDelay: attempt => Math.min(attempt > 1 ? 2000 : 1000, 30 * 1000),
    refetchOnWindowFocus: false,
    staleTime: 2 * 60 * 1000 // 2 minutes
  });

  // Helper function to check for policy related errors
  function isPolicyError(message: string): boolean {
    return message.includes('infinite recursion') || 
           message.includes('policy for relation') ||
           message.includes('organization_members') ||
           message.includes('violates row-level security policy');
  }
  
  // Helper function to handle fallback to mock data
  function fallbackToMockData(hasExistingData: boolean): Task[] {
    toast.error("Database policy error detected. Using demo data.", {
      id: "rls-error",
      duration: 10000
    });
    
    return hasExistingData ? [] : mockTasks;
  }

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
