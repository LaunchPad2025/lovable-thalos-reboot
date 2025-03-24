
import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { TaskFormData } from '../schemas/taskFormSchema';

interface TitleFieldProps {
  control: Control<TaskFormData>;
  errors: any;
}

export const TitleField = ({ control, errors }: TitleFieldProps) => (
  <div className="space-y-2">
    <Label htmlFor="title" className="text-gray-300">Task Title</Label>
    <Controller
      name="title"
      control={control}
      render={({ field }) => (
        <Input
          id="title"
          placeholder="Brief description of the task"
          className="bg-[#1a1f29] border-gray-700 text-white"
          {...field}
        />
      )}
    />
    {errors.title && (
      <p className="text-sm text-red-500">{errors.title.message}</p>
    )}
  </div>
);

export default TitleField;
