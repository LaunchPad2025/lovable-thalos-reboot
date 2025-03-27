
import { useTaskFetcher } from './useTaskFetcher';
import { useTaskStatusUpdater } from './useTaskStatusUpdater';

export function useTasks() {
  const { tasks, isLoading, isError, refetch, hasRealData } = useTaskFetcher();
  const { updateTaskStatus } = useTaskStatusUpdater();

  return {
    tasks,
    hasRealData,
    isLoading,
    isError,
    refetch,
    updateTaskStatus
  };
}

export * from './mockTasks';
