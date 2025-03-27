
import { useTaskFetcher } from './useTaskFetcher';
import { useTaskStatusUpdater } from './useTaskStatusUpdater';

export function useTasks() {
  const { tasks, isLoading, isError, refetch } = useTaskFetcher();
  const { updateTaskStatus } = useTaskStatusUpdater();

  return {
    tasks,
    isLoading,
    isError,
    refetch,
    updateTaskStatus
  };
}

export * from './mockTasks';
