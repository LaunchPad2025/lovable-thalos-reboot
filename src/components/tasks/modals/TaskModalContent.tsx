
import React from 'react';
import { Control } from 'react-hook-form';
import { Task } from '@/types/models';
import { 
  TitleField, 
  DescriptionField, 
  DueDateField, 
  AssigneeField,
  PriorityField,
  ViolationField,
  StatusField
} from '@/components/tasks/FormFields';
import FormActions from './FormActions';

interface TaskModalContentProps {
  initialData?: Partial<Task>;
  onSubmit?: (data: any) => void;
  isLoading?: boolean;
  control?: Control<any>;
  errors?: any;
  title?: string;
  submitButtonText?: string;
  onClose?: () => void;
  onViolationChange?: (id: string) => void;
  violations?: any[];
}

const TaskModalContent: React.FC<TaskModalContentProps> = ({
  initialData,
  onSubmit,
  isLoading = false,
  control: externalControl,
  errors: externalErrors,
  title,
  submitButtonText = 'Save Task',
  onClose,
  onViolationChange = () => {},
  violations = [],
}) => {
  return (
    <div className="p-6 space-y-4">
      {title && (
        <h2 className="text-xl font-semibold text-white">{title}</h2>
      )}
      
      <div className="space-y-4">
        {/* Title field */}
        {externalControl && <TitleField control={externalControl} errors={externalErrors} />}

        {/* Description field */}
        {externalControl && <DescriptionField control={externalControl} errors={externalErrors} />}

        <div className="grid grid-cols-2 gap-4">
          {/* Status field */}
          {externalControl && <StatusField control={externalControl} errors={externalErrors} />}

          {/* Priority field */}
          {externalControl && <PriorityField control={externalControl} errors={externalErrors} />}

          {/* Due date field */}
          {externalControl && <DueDateField control={externalControl} errors={externalErrors} />}

          {/* Assignee field */}
          {externalControl && <AssigneeField control={externalControl} errors={externalErrors} />}
        </div>

        {/* Violation field */}
        {externalControl && (
          <ViolationField 
            control={externalControl} 
            violations={violations} 
            onViolationChange={onViolationChange} 
          />
        )}

        {/* Form actions */}
        <FormActions 
          onClose={onClose}
          isLoading={isLoading}
          submitButtonText={submitButtonText}
          showSubmitButton={!!onSubmit}
        />
      </div>
    </div>
  );
};

export default TaskModalContent;
