
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Task } from '@/types/models';
import { useViolationsSelect } from '@/hooks/useViolationsSelect';
import TaskModalContent from './modals/TaskModalContent';
import { useTaskForm } from '@/hooks/useTaskForm';

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => void;
  violationId?: string;
}

const NewTaskModal = ({ isOpen, onClose, onSubmit, violationId }: NewTaskModalProps) => {
  const { data: violations } = useViolationsSelect();
  
  const { 
    control, 
    formState: { errors, isSubmitting }, 
    handleSubmit, 
    handleFormSubmit, 
    setSelectedViolationId 
  } = useTaskForm({ violationId, onSubmit });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] bg-[#0f1419] border border-gray-800 text-white">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <TaskModalContent
            title="Create New Task"
            control={control}
            errors={errors}
            isSubmitting={isSubmitting}
            onClose={onClose}
            onViolationChange={setSelectedViolationId}
            violations={violations}
            submitButtonText="Create Task"
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewTaskModal;
