
import { useTaskFetcher } from './useTaskFetcher';
import { useTaskStatusUpdater } from './useTaskStatusUpdater';

export function useTasks() {
  const { tasks, isLoading, isError, refetch, hasRealData, retryConnection, error } = useTaskFetcher();
  const { updateTaskStatus } = useTaskStatusUpdater();

  return {
    tasks,
    hasRealData,
    isLoading,
    isError,
    error,
    refetch,
    retryConnection,
    updateTaskStatus
  };
}

export * from './mockTasks';
