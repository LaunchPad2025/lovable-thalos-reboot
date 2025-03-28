
import React, { useState, useEffect } from 'react';
import { PlusCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NewTaskModal from '@/components/tasks/NewTaskModal';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { toast } from 'sonner';
import { Task } from '@/types/models';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/auth';
import { useOrganization } from '@/hooks/useOrganization';

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
  const { organization, isLoading: isLoadingOrg } = useOrganization();

  // For debugging
  useEffect(() => {
    console.log("TaskCreation component:", {
      user: user?.id,
      organization: organization?.organization_id,
      // Fix the type issue by safely accessing the name property
      orgName: organization?.organizations && 'name' in organization.organizations 
        ? organization.organizations.name 
        : 'Unknown',
      isLoadingOrg
    });
  }, [user, organization, isLoadingOrg]);

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

    // Always use the organization ID from the context
    const organizationId = organization?.organization_id;
    
    setIsSubmitting(true);
    try {
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
        toast.error(error.message || "Failed to create task");
        return;
      }
      
      if (data && data[0]) {
        if (violationId) {
          try {
            const { error: relationError } = await supabase
              .from('violation_tasks')
              .insert({
                violation_id: violationId,
                task_id: data[0].id
              });
              
            if (relationError) {
              toast.warning("Task created, but couldn't link it to the violation");
            }
          } catch (relationError) {
          }
        }
        
        toast.success("Task created successfully");
        await queryClient.invalidateQueries({ queryKey: ['tasks'] });
        
        setIsModalOpen(false);
        navigate(`/tasks/${data[0].id}`);
      }
    } catch (error: any) {
      toast.error("Failed to create task");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button 
        className="bg-blue-600 hover:bg-blue-700" 
        onClick={() => setIsModalOpen(true)}
        disabled={isLoadingOrg}
      >
        {isLoadingOrg ? (
          <>
            <Loader2 size={16} className="mr-2 animate-spin" />
            Loading...
          </>
        ) : (
          <>
            <PlusCircle size={16} className="mr-2" />
            Create Task
          </>
        )}
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
