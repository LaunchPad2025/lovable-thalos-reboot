
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
    
    if (!user) {
      toast.error("Please log in to create tasks");
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Create task with default organization if we can't verify membership
      // This prevents blocking the entire app functionality
      let organizationId = "00000000-0000-0000-0000-000000000000"; // Default fallback
      
      try {
        // Try to get user's organization, but don't block if it fails
        const { data: orgMember, error: orgError } = await supabase
          .from('organization_members')
          .select('organization_id, role')
          .eq('user_id', user.id)
          .maybeSingle();

        if (!orgError && orgMember) {
          organizationId = orgMember.organization_id;
        }
      } catch (orgLookupError) {
        console.warn("Could not verify organization membership:", orgLookupError);
        // Continue with default organization
      }

      const taskToInsert = {
        title: newTask.title,
        description: newTask.description,
        due_date: newTask.due_date,
        status: newTask.status || 'open',
        priority: newTask.priority,
        assignee_id: newTask.assignee_id,
        created_by: user.id,
        organization_id: organizationId,
        worksite_id: newTask.worksite_id,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('tasks')
        .insert(taskToInsert)
        .select();
      
      if (error) {
        console.error("Error inserting task:", error);
        toast.error(error.message || "Failed to create task");
        return;
      }
      
      if (data && data[0]) {
        // If we have a violation ID, create the relationship
        if (violationId) {
          try {
            const { error: relationError } = await supabase
              .from('violation_tasks')
              .insert({
                violation_id: violationId,
                task_id: data[0].id
              });
              
            if (relationError) {
              console.error("Error linking task to violation:", relationError);
              toast.warning("Task created, but couldn't link it to the violation");
            }
          } catch (relationError) {
            console.error("Exception linking task to violation:", relationError);
            // Don't block if this fails
          }
        }
        
        toast.success("Task created successfully");
        await queryClient.invalidateQueries({ queryKey: ['tasks'] });
        
        setIsModalOpen(false);
        navigate(`/tasks/${data[0].id}`);
      }
    } catch (error: any) {
      console.error("Error creating task:", error);
      toast.error("Failed to create task");
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
