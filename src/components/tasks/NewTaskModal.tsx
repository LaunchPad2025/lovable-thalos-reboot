
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Task } from '@/types/models';
import { useAuth } from '@/context/AuthContext';
import { 
  TitleField, 
  DescriptionField, 
  DueDateField, 
  AssigneeField, 
  PriorityField,
  ViolationField 
} from './FormFields';
import { taskSchema, TaskFormData } from './schemas/taskFormSchema';
import { useViolationsSelect } from '@/hooks/useViolationsSelect';

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => void;
  violationId?: string;
}

const NewTaskModal = ({ isOpen, onClose, onSubmit, violationId }: NewTaskModalProps) => {
  const [selectedViolationId, setSelectedViolationId] = useState<string | undefined>(violationId);
  const { user } = useAuth();
  const { data: violations } = useViolationsSelect();

  const { control, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm<TaskFormData>({
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
  }, [violationId, setValue, isOpen]);

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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] bg-[#0f1419] border border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">Create New Task</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 pt-4">
          <TitleField control={control} errors={errors} />
          <DescriptionField control={control} errors={errors} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DueDateField control={control} errors={errors} />
            <AssigneeField control={control} errors={errors} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PriorityField control={control} errors={errors} />
            <ViolationField 
              control={control}
              violations={violations}
              onViolationChange={setSelectedViolationId}
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} className="border-gray-700 text-gray-300 hover:bg-gray-800">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-thalos-blue hover:bg-blue-600">
              {isSubmitting ? 'Creating...' : 'Create Task'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewTaskModal;
