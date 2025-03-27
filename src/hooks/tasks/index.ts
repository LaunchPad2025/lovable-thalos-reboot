
import { useTaskFetcher } from './useTaskFetcher';
import { useTaskStatusUpdater } from './useTaskStatusUpdater';

export function useTasks() {
  const { tasks, isLoading, isError, refetch, hasRealData, retryConnection } = useTaskFetcher();
  const { updateTaskStatus } = useTaskStatusUpdater();

  return {
    tasks,
    hasRealData,
    isLoading,
    isError,
    refetch,
    retryConnection,
    updateTaskStatus
  };
}

export * from './mockTasks';
