import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Task } from '@/types/models';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

const taskSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  due_date: z.date({
    required_error: "Due date is required",
  }),
  assignee: z.string().min(3, 'Assignee name must be at least 3 characters'),
  priority: z.enum(['low', 'medium', 'high']),
  status: z.enum(['open', 'in-progress', 'completed', 'overdue']).default('open'),
  violation_id: z.string().optional(),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface NewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => void;
  violationId?: string;
}

const NewTaskModal = ({ isOpen, onClose, onSubmit, violationId }: NewTaskModalProps) => {
  const [selectedViolationId, setSelectedViolationId] = useState<string | undefined>(violationId);
  
  const { data: violations } = useQuery({
    queryKey: ['violations-select'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('violations')
        .select('id, title')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const { control, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
      assignee: '',
      priority: 'medium',
      status: 'open',
      violation_id: violationId,
    },
  });

  useEffect(() => {
    if (violationId) {
      setValue('violation_id', violationId);
      setSelectedViolationId(violationId);
    }
  }, [violationId, setValue, isOpen]);

  const handleFormSubmit = async (data: TaskFormData) => {
    // Convert the data to the right format for Task - ensuring all required properties are present
    const taskData: Omit<Task, 'id' | 'created_at' | 'updated_at'> = {
      title: data.title,
      description: data.description,
      due_date: data.due_date.toISOString(),
      assignee: data.assignee,
      priority: data.priority,
      status: data.status,
      violation_id: data.violation_id
    };
    
    await onSubmit(taskData);
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" control={control} {...control.register('title')} />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              control={control}
              {...control.register('description')}
              rows={4}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="due_date">Due Date</Label>
            <Controller
              control={control}
              name="due_date"
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] justify-start text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date(Date.now() - 24 * 60 * 60 * 1000)
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
            {errors.due_date && (
              <p className="text-sm text-red-500">{errors.due_date.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="assignee">Assignee</Label>
            <Input id="assignee" control={control} {...control.register('assignee')} />
            {errors.assignee && (
              <p className="text-sm text-red-500">{errors.assignee.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="priority">Priority</Label>
            <Controller
              control={control}
              name="priority"
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
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
          {violations && (
            <div className="grid gap-2">
              <Label htmlFor="violation_id">Violation</Label>
              <Select
                onValueChange={(value) => {
                  setValue('violation_id', value);
                  setSelectedViolationId(value);
                }}
                defaultValue={selectedViolationId}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Violation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {violations.map((violation) => (
                    <SelectItem key={violation.id} value={violation.id}>
                      {violation.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Task'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewTaskModal;
