
import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NewTaskModal from '@/components/tasks/NewTaskModal';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { toast } from 'sonner';
import { Task } from '@/types/models';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

interface TaskCreationProps {
  violationId?: string;
  autoOpen?: boolean;
}

export function TaskCreation({ violationId, autoOpen = false }: TaskCreationProps) {
  const [isModalOpen, setIsModalOpen] = useState(autoOpen || !!violationId);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast: uiToast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // Auto-open modal when violationId changes
  useEffect(() => {
    if (violationId) {
      setIsModalOpen(true);
    }
  }, [violationId]);

  const handleCreateTask = async (newTask: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      if (!user) {
        uiToast({
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
        status: newTask.status || 'open',
        priority: newTask.priority,
        assignee_id: newTask.assignee_id,
        created_by: user.id,
        organization_id: newTask.organization_id || user.user_metadata?.organization_id || '00000000-0000-0000-0000-000000000000',
        worksite_id: newTask.worksite_id,
        violation_id: newTask.violation_id,
        updated_at: new Date().toISOString()
      };

      console.log("Creating task with data:", taskToInsert);

      const { data, error } = await supabase
        .from('tasks')
        .insert(taskToInsert)
        .select();
      
      if (error) {
        console.error("Error inserting task:", error);
        
        // Show a more user-friendly error message
        if (error.code === '23503') {
          toast.error("Failed to create task: One of the references (assignee, violation) is invalid.");
        } else if (error.code === '23505') {
          toast.error("A task with these details already exists.");
        } else if (error.code.startsWith('42')) {
          toast.error("Database configuration error. Please contact support.");
        } else {
          toast.error(`Error creating task: ${error.message}`);
        }
        
        throw error;
      }
      
      console.log("Task created successfully:", data);
      
      // If successful, update the violation with the task ID if applicable
      if (data && data[0] && violationId) {
        console.log("Linking task to violation:", violationId, data[0].id);
        
        const { error: violationError } = await supabase
          .from('violation_tasks')
          .insert({
            violation_id: violationId,
            task_id: data[0].id
          });
          
        if (violationError) {
          console.error("Error linking task to violation:", violationError);
          // Show warning but don't fail the whole operation
          toast.warning("Task created, but couldn't link it to the violation.");
        } else {
          console.log("Successfully linked task to violation");
        }
      }
      
      toast.success("Task created successfully!");
      
      // Invalidate relevant queries
      await queryClient.invalidateQueries({ queryKey: ['tasks'] });
      if (newTask.violation_id) {
        await queryClient.invalidateQueries({ queryKey: ['tasks', newTask.violation_id] });
        await queryClient.invalidateQueries({ queryKey: ['violations'] });
      }
      
      setIsModalOpen(false);
      
      // Navigate to the new task
      if (data && data[0]) {
        navigate(`/tasks/${data[0].id}`);
      }
    } catch (error: any) {
      console.error("Error creating task:", error);
      toast.error(`Failed to create task: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsModalOpen(true)}>
        <PlusCircle size={16} className="mr-2" />
        Create Task
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
