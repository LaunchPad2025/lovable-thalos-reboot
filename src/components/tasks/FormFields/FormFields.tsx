
import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { TaskFormData } from '../schemas/taskFormSchema';
import { Violation } from '@/types/models';

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
              className="bg-[#1a1f29] text-white"
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
