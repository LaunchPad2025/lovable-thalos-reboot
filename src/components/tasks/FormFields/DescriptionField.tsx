
import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { TaskFormData } from '../schemas/taskFormSchema';

interface DescriptionFieldProps {
  control: Control<TaskFormData>;
  errors: any;
}

export const DescriptionField = ({ control, errors }: DescriptionFieldProps) => (
  <div className="space-y-2">
    <Label htmlFor="description" className="text-gray-300">Task Description</Label>
    <Controller
      name="description"
      control={control}
      render={({ field }) => (
        <Textarea
          id="description"
          placeholder="Detailed description of what needs to be done"
          className="bg-[#1a1f29] border-gray-700 text-white"
          rows={4}
          {...field}
        />
      )}
    />
    {errors.description && (
      <p className="text-sm text-red-500">{errors.description.message}</p>
    )}
  </div>
);

export default DescriptionField;
