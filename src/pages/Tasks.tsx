
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import TasksList, { Task as TaskItem } from '@/components/tasks/TasksList';
import TaskDetails from '@/components/tasks/TaskDetails';
import PageTitle from '@/components/ui/PageTitle';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Task } from '@/types/models';
import NewTaskModal from '@/components/tasks/NewTaskModal';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Tasks = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const violationId = searchParams.get('violation');
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(!!violationId);
  const { user } = useAuth();
  
  const {
    data: tasks,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      // Convert the DB response to our Task type
      return data.map(task => ({
        ...task,
        // Map any fields that need transformation
      })) as Task[];
    }
  });

  const {
    data: taskDetails,
    isLoading: isLoadingDetails,
  } = useQuery({
    queryKey: ['task', id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as Task;
    },
    enabled: !!id
  });

  useEffect(() => {
    if (id && taskDetails) {
      setSelectedTask(taskDetails);
    } else if (!id) {
      setSelectedTask(null);
    }
  }, [id, taskDetails]);

  const handleCreateTask = async (newTask: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      if (!user) {
        toast({
          title: "Authentication required",
          description: "You must be logged in to create tasks.",
          variant: "destructive",
        });
        return;
      }

      const taskToInsert = {
        title: newTask.title,
        description: newTask.description,
        due_date: newTask.due_date,
        status: newTask.status,
        priority: newTask.priority,
        assignee_id: newTask.assignee_id,
        created_by: user.id,
        organization_id: newTask.organization_id,
        worksite_id: newTask.worksite_id,
        updated_at: new Date().toISOString()
      };

      if (newTask.violation_id) {
        taskToInsert.violation_id = newTask.violation_id;
      }

      const { data, error } = await supabase
        .from('tasks')
        .insert(taskToInsert)
        .select();
      
      if (error) throw error;
      
      toast({
        title: "Task created",
        description: "The task has been successfully created.",
      });
      
      await queryClient.invalidateQueries({ queryKey: ['tasks'] });
      if (newTask.violation_id) {
        await queryClient.invalidateQueries({ queryKey: ['tasks', newTask.violation_id] });
      }
      
      setIsModalOpen(false);
      
      // Navigate to the new task
      if (data && data[0]) {
        navigate(`/tasks/${data[0].id}`);
      }
    } catch (error) {
      console.error("Error creating task:", error);
      toast({
        title: "Failed to create task",
        description: "There was an error creating the task. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateTaskStatus = async (taskId: string, newStatus: Task['status']) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', taskId);
      
      if (error) throw error;
      
      toast({
        title: "Status updated",
        description: `Task status changed to ${newStatus.replace('-', ' ')}.`,
      });
      
      setSelectedTask(prev => prev ? {...prev, status: newStatus} : null);
      
      // Refresh tasks list
      refetch();
    } catch (error) {
      console.error("Error updating task status:", error);
      toast({
        title: "Failed to update status",
        description: "There was an error updating the status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatTasksForList = (data: Task[] | undefined): TaskItem[] => {
    if (!data) return [];
    
    return data.map(item => ({
      id: item.id,
      title: item.title,
      description: item.description || '',
      dueDate: item.due_date ? new Date(item.due_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'No due date',
      status: item.status,
      assignee: item.assignee_id || 'Unassigned',
      priority: item.priority
    }));
  };
  
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
        action={
          <Button className="bg-thalos-blue hover:bg-blue-600" onClick={() => setIsModalOpen(true)}>
            <PlusCircle size={16} className="mr-2" />
            New Task
          </Button>
        }
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[calc(100vh-12rem)]">
        {isLoading ? (
          <div className="col-span-2 flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-thalos-blue"></div>
          </div>
        ) : (
          <>
            <TasksList 
              tasks={formatTasksForList(tasks)} 
              onTaskSelect={(task) => navigate(`/tasks/${task.id}`)}
              selectedTaskId={selectedTask?.id}
              onAddNewTask={() => setIsModalOpen(true)}
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
                    handleUpdateTaskStatus(selectedTask.id, newStatus);
                  }
                }}
              />
            )}
          </>
        )}
      </div>
      
      <NewTaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTask}
        violationId={violationId || undefined}
      />
    </PageContainer>
  );
};

export default Tasks;
