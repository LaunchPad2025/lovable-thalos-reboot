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

const Tasks = () => {
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const toast = useToast();

  const formatTasksForList = (data: Task[] | undefined): TaskItem[] => {
    if (!data) return [];
    
    return data.map(item => ({
      id: item.id,
      title: item.title,
      description: item.description,
      dueDate: new Date(item.due_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      status: item.status,
      assignee: item.assignee,
      priority: item.priority
    }));
  };

  const handleTaskSelect = (task: Task) => {
    setSelectedTask(task);
  };

  const handleAddNewTask = () => {
    console.log('Add new task');
    // In a real app, this would open a modal or navigate to a new task form
  };

  const handleStatusChange = (newStatus: Task['status']) => {
    if (!selectedTask) return;
    
    const updatedTasks = tasks.map(task => 
      task.id === selectedTask.id ? { ...task, status: newStatus } : task
    );
    
    setTasks(updatedTasks);
    setSelectedTask({ ...selectedTask, status: newStatus });
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('due_date', { ascending: true });

      if (error) {
        toast.error('Failed to fetch tasks');
        return;
      }

      setTasks(formatTasksForList(data));
    };

    fetchTasks();
  }, [queryClient]);

  return (
    <PageContainer>
      <PageTitle 
        title="Tasks"
        subtitle="Manage and track safety tasks"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[calc(100vh-12rem)]">
        <TasksList 
          tasks={tasks} 
          onTaskSelect={handleTaskSelect} 
          selectedTaskId={selectedTask?.id}
          onAddNewTask={handleAddNewTask}
        />
        <TaskDetails 
          task={selectedTask}
          onStatusChange={handleStatusChange}
        />
      </div>
    </PageContainer>
  );
};

export default Tasks;
