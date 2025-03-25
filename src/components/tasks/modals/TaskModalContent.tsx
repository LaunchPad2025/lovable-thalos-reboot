
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { taskSchema } from '@/components/tasks/schemas/taskFormSchema';
import { Task } from '@/types/models';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Control } from 'react-hook-form';

interface TaskModalContentProps {
  initialData?: Partial<Task>;
  onSubmit: (data: any) => void;
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
  onViolationChange,
  violations = [],
}) => {
  // Create form with default values if no external control is provided
  const defaultForm = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      status: initialData?.status || 'pending',
      priority: initialData?.priority || 'medium',
      due_date: initialData?.due_date ? new Date(initialData.due_date) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      assignee_id: initialData?.assignee_id || '',
      violation_id: initialData?.violation_id || '',
    },
  });

  // Use either the external control or our default form
  const form = externalControl ? { control: externalControl } : defaultForm;
  const formErrors = externalErrors || defaultForm.formState.errors;

  const handleFormSubmit = (data: z.infer<typeof taskSchema>) => {
    // Convert the date object to ISO string for database storage
    const formattedData = {
      ...data,
      due_date: data.due_date.toISOString(),
    };
    onSubmit(formattedData);
  };

  return (
    <div className="p-6 space-y-4">
      {title && (
        <h2 className="text-xl font-semibold text-white">{title}</h2>
      )}
      
      <Form {...(externalControl ? {} : defaultForm)}>
        <form onSubmit={externalControl ? undefined : defaultForm.handleSubmit(handleFormSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Task title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Task description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="due_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className="pl-3 text-left font-normal"
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="assignee_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assignee</FormLabel>
                  <FormControl>
                    <Input placeholder="Assignee ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="violation_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Related Violation (optional)</FormLabel>
                <FormControl>
                  {violations && violations.length > 0 ? (
                    <Select 
                      onValueChange={(value) => {
                        field.onChange(value);
                        if (onViolationChange) onViolationChange(value);
                      }} 
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a violation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        {violations.map((violation) => (
                          <SelectItem key={violation.id} value={violation.id}>
                            {violation.title || violation.violation}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input placeholder="Violation ID" {...field} />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end pt-4">
            {onClose && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose} 
                className="mr-2 border-gray-700 text-gray-300"
              >
                Cancel
              </Button>
            )}
            {!externalControl && (
              <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                {isLoading ? 'Saving...' : submitButtonText}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TaskModalContent;
