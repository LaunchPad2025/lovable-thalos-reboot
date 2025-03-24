
import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { TaskFormData } from '../schemas/taskFormSchema';

interface AssigneeFieldProps {
  control: Control<TaskFormData>;
  errors: any;
}

export const AssigneeField = ({ control, errors }: AssigneeFieldProps) => (
  <div className="space-y-2">
    <Label htmlFor="assignee_id" className="text-gray-300">Assign To</Label>
    <Controller
      name="assignee_id"
      control={control}
      render={({ field }) => (
        <Input
          id="assignee_id"
          placeholder="Person responsible for this task"
          className="bg-[#1a1f29] border-gray-700 text-white"
          {...field}
        />
      )}
    />
    {errors.assignee_id && (
      <p className="text-sm text-red-500">{errors.assignee_id.message}</p>
    )}
  </div>
);

export default AssigneeField;
