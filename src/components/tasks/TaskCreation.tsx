
import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NewTaskModal from '@/components/tasks/NewTaskModal';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Task } from '@/types/models';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

interface TaskCreationProps {
  violationId?: string;
}

export function TaskCreation({ violationId }: TaskCreationProps) {
  const [isModalOpen, setIsModalOpen] = useState(!!violationId);
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

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
        violation_id: newTask.violation_id,
        updated_at: new Date().toISOString()
      };

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

  return (
    <>
      <Button className="bg-thalos-blue hover:bg-blue-600" onClick={() => setIsModalOpen(true)}>
        <PlusCircle size={16} className="mr-2" />
        New Task
      </Button>
      
      <NewTaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTask}
        violationId={violationId}
      />
    </>
  );
}
