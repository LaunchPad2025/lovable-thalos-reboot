
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
import { Task, Violation } from '@/types/models';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

const taskSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  due_date: z.date({
    required_error: "Due date is required",
  }),
  assignee_id: z.string().optional(), // changed to match DB schema
  priority: z.enum(['low', 'medium', 'high']),
  status: z.enum(['open', 'in-progress', 'completed', 'overdue', 'pending']).default('open'),
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
  const { user } = useAuth();
  
  const { data: violations } = useQuery({
    queryKey: ['violations-select'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('violations')
        .select('id, violation')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Violation[];
    }
  });

  const { control, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      description: '',
      due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
      assignee_id: '',
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
    if (!user) {
      return; // Handle unauthenticated state
    }
    
    // Convert the data to the right format for Task
    const taskData: Omit<Task, 'id' | 'created_at' | 'updated_at'> = {
      title: data.title,
      description: data.description,
      due_date: data.due_date.toISOString(),
      assignee_id: data.assignee_id,
      priority: data.priority,
      status: data.status,
      violation_id: data.violation_id,
      // Required fields for DB
      created_by: user.id,
      organization_id: '00000000-0000-0000-0000-000000000000', // Placeholder, should come from user's context
    };
    
    await onSubmit(taskData);
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] bg-[#0f1419] border border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">Create New Task</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 pt-4">
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            
            <div className="space-y-2">
              <Label htmlFor="violation_id" className="text-gray-300">Related to Violation (Optional)</Label>
              <Controller
                name="violation_id"
                control={control}
                render={({ field }) => (
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedViolationId(value);
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
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} className="border-gray-700 text-gray-300 hover:bg-gray-800">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-thalos-blue hover:bg-blue-600">
              {isSubmitting ? 'Creating...' : 'Create Task'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewTaskModal;
