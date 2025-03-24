
import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { TaskFormData } from '../schemas/taskFormSchema';

interface DueDateFieldProps {
  control: Control<TaskFormData>;
  errors: any;
}

export const DueDateField = ({ control, errors }: DueDateFieldProps) => (
  <div className="space-y-2">
    <Label htmlFor="due_date" className="text-gray-300">Due Date</Label>
    <Controller
      name="due_date"
      control={control}
      render={({ field }) => (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal bg-[#1a1f29] border-gray-700 text-white",
                !field.value && "text-gray-400"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {field.value ? format(field.value, "PPP") : "Select a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-[#1a1f29] border-gray-700">
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={field.onChange}
              initialFocus
              className="bg-[#1a1f29] text-white pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      )}
    />
    {errors.due_date && (
      <p className="text-sm text-red-500">{errors.due_date.message}</p>
    )}
  </div>
);

export default DueDateField;
