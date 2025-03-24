
import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TaskFormData } from '../schemas/taskFormSchema';

interface PriorityFieldProps {
  control: Control<TaskFormData>;
  errors: any;
}

export const PriorityField = ({ control, errors }: PriorityFieldProps) => (
  <div className="space-y-2">
    <Label htmlFor="priority" className="text-gray-300">Priority</Label>
    <Controller
      name="priority"
      control={control}
      render={({ field }) => (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger id="priority" className="bg-[#1a1f29] border-gray-700 text-white">
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1f29] border-gray-700 text-white">
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      )}
    />
    {errors.priority && (
      <p className="text-sm text-red-500">{errors.priority.message}</p>
    )}
  </div>
);

export default PriorityField;
