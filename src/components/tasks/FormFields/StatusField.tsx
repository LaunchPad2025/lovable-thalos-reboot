
import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TaskFormData } from '../schemas/taskFormSchema';

interface StatusFieldProps {
  control: Control<TaskFormData>;
  errors: any;
}

export const StatusField = ({ control, errors }: StatusFieldProps) => (
  <div className="space-y-2">
    <Label htmlFor="status" className="text-gray-300">Status</Label>
    <Controller
      name="status"
      control={control}
      render={({ field }) => (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger id="status" className="bg-[#1a1f29] border-gray-700 text-white">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1f29] border-gray-700 text-white">
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
      )}
    />
    {errors.status && (
      <p className="text-sm text-red-500">{errors.status.message}</p>
    )}
  </div>
);

export default StatusField;
