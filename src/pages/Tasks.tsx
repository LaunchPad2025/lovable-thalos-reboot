
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import TasksList from '@/components/tasks/TasksList';
import TaskDetails from '@/components/tasks/TaskDetails';
import PageTitle from '@/components/ui/PageTitle';
import { Button } from '@/components/ui/button';
import { useTasks } from '@/hooks/useTasks';
import { useTaskDetails } from '@/hooks/useTaskDetails';
import { TaskCreation } from '@/components/tasks/TaskCreation';
import { formatTasksForList, FormattedTask } from '@/utils/taskFormatters';
import { Task } from '@/types/models';

const Tasks = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const violationId = searchParams.get('violation');
  const navigate = useNavigate();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  
  // Fetch all tasks
  const { tasks, isLoading, isError, refetch, updateTaskStatus } = useTasks();
  
  // Fetch single task details if an ID is provided
  const { taskDetails, isLoading: isLoadingDetails } = useTaskDetails(id);

  // Format tasks for display in the list
  const formattedTasks = formatTasksForList(tasks);

  useEffect(() => {
    if (id && taskDetails) {
      setSelectedTask(taskDetails);
    } else if (!id) {
      setSelectedTask(null);
    }
  }, [id, taskDetails]);

  if (isError) {
    return (
      <PageContainer>
        <div className="p-6 text-center text-white">
          <h2 className="text-xl font-bold mb-2">Failed to load tasks</h2>
          <p className="mb-4">There was an error loading the tasks. Please try again later.</p>
          <Button onClick={() => refetch()}>Retry</Button>
        </div>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <PageTitle 
        title="Tasks"
        subtitle="Manage and track safety remediation tasks"
        action={<TaskCreation violationId={violationId} />}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[calc(100vh-12rem)]">
        {isLoading ? (
          <div className="col-span-2 flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-thalos-blue"></div>
          </div>
        ) : (
          <>
            <TasksList 
              tasks={formattedTasks} 
              onTaskSelect={(task) => navigate(`/tasks/${task.id}`)}
              selectedTaskId={selectedTask?.id}
              onAddNewTask={() => navigate('/tasks?newTask=true')}
            />
            
            {isLoadingDetails && id ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-thalos-blue"></div>
              </div>
            ) : (
              <TaskDetails 
                task={selectedTask}
                onStatusChange={(newStatus) => {
                  if (selectedTask) {
                    updateTaskStatus(selectedTask.id, newStatus);
                  }
                }}
              />
            )}
          </>
        )}
      </div>
    </PageContainer>
  );
};

export default Tasks;
