
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskSchema, TaskFormData } from '@/components/tasks/schemas/taskFormSchema';
import { useAuth } from '@/context/AuthContext';
import { Task } from '@/types/models';

interface UseTaskFormProps {
  violationId?: string;
  onSubmit: (data: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => void;
}

export function useTaskForm({ violationId, onSubmit }: UseTaskFormProps) {
  const [selectedViolationId, setSelectedViolationId] = useState<string | undefined>(violationId);
  const { user } = useAuth();

  const { control, handleSubmit, reset, setValue, formState } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
      assignee_id: '',
      priority: 'medium',
      status: 'open',
      violation_id: violationId,
    },
  });

  useEffect(() => {
    if (violationId) {
      setValue('violation_id', violationId);
      setSelectedViolationId(violationId);
    }
  }, [violationId, setValue]);

  const handleFormSubmit = async (data: TaskFormData) => {
    if (!user) {
      return; // Handle unauthenticated state
    }
    
    // Convert the data to the right format for Task
    const taskData: Omit<Task, 'id' | 'created_at' | 'updated_at'> = {
      title: data.title,
      description: data.description,
      due_date: data.due_date.toISOString(),
      assignee_id: data.assignee_id,
      priority: data.priority,
      status: data.status,
      violation_id: data.violation_id,
      // Required fields for DB
      created_by: user.id,
      organization_id: '00000000-0000-0000-0000-000000000000', // Placeholder, should come from user's context
    };
    
    await onSubmit(taskData);
    reset();
  };

  return {
    control,
    formState,
    handleSubmit,
    handleFormSubmit,
    selectedViolationId,
    setSelectedViolationId,
  };
}
