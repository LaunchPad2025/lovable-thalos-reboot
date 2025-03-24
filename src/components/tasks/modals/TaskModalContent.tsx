
import React from 'react';
import { DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Control } from 'react-hook-form';
import { TaskFormData } from '../schemas/taskFormSchema';
import { 
  TitleField, 
  DescriptionField, 
  DueDateField, 
  AssigneeField, 
  PriorityField,
  ViolationField 
} from '../FormFields';
import { Violation } from '@/types/models';

interface TaskModalContentProps {
  title: string;
  control: Control<TaskFormData>;
  errors: any;
  isSubmitting: boolean;
  onClose: () => void;
  onViolationChange: (id: string) => void;
  violations?: Violation[];
  submitButtonText: string;
}

const TaskModalContent = ({
  title,
  control,
  errors,
  isSubmitting,
  onClose,
  onViolationChange,
  violations,
  submitButtonText
}: TaskModalContentProps) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-xl font-semibold text-white">{title}</DialogTitle>
      </DialogHeader>
      
      <div className="space-y-4 pt-4">
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
            onViolationChange={onViolationChange}
          />
        </div>
      </div>
        
      <DialogFooter>
        <Button 
          type="button" 
          variant="outline" 
          onClick={onClose} 
          className="border-gray-700 text-gray-300 hover:bg-gray-800"
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting} 
          className="bg-thalos-blue hover:bg-blue-600"
        >
          {isSubmitting ? 'Creating...' : submitButtonText}
        </Button>
      </DialogFooter>
    </>
  );
};

export default TaskModalContent;
