
import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TaskFormData } from '../schemas/taskFormSchema';
import { Violation } from '@/types/models';

interface ViolationFieldProps {
  control: Control<TaskFormData>;
  violations?: Violation[];
  onViolationChange: (value: string) => void;
}

export const ViolationField = ({ control, violations, onViolationChange }: ViolationFieldProps) => (
  <div className="space-y-2">
    <Label htmlFor="violation_id" className="text-gray-300">Related to Violation (Optional)</Label>
    <Controller
      name="violation_id"
      control={control}
      render={({ field }) => (
        <Select 
          onValueChange={(value) => {
            field.onChange(value);
            onViolationChange(value);
          }} 
          defaultValue={field.value}
        >
          <SelectTrigger id="violation_id" className="bg-[#1a1f29] border-gray-700 text-white">
            <SelectValue placeholder="Select a violation" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1f29] border-gray-700 text-white max-h-60">
            <SelectItem value="">None</SelectItem>
            {violations?.map(violation => (
              <SelectItem key={violation.id} value={violation.id}>
                {violation.violation}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  </div>
);

export default ViolationField;
