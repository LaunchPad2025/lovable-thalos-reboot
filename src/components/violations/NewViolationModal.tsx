import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Violation } from '@/types/models';

const violationSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  location: z.string().min(3, 'Location must be at least 3 characters'),
  reported_by: z.string().min(3, 'Reporter name must be at least 3 characters'),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  assignee: z.string().min(3, 'Assignee name must be at least 3 characters'),
  status: z.enum(['open', 'in-progress', 'resolved', 'pending']).default('open'),
});

type ViolationFormData = z.infer<typeof violationSchema>;

interface NewViolationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Violation, 'id' | 'created_at' | 'updated_at'>) => void;
}

const NewViolationModal = ({ isOpen, onClose, onSubmit }: NewViolationModalProps) => {
  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ViolationFormData>({
    resolver: zodResolver(violationSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
      reported_by: '',
      severity: 'medium',
      assignee: '',
      status: 'open',
    },
  });

  const handleFormSubmit = async (data: ViolationFormData) => {
    await onSubmit({
      title: data.title,
      description: data.description,
      location: data.location,
      reported_by: data.reported_by,
      severity: data.severity,
      assignee: data.assignee,
      status: data.status,
      date: new Date().toISOString(),
      notes: [],
    });
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Violation</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Controller
              control={control}
              name="title"
              render={({ field }) => (
                <Input id="title" placeholder="Enter violation title" {...field} />
              )}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <Textarea
                  id="description"
                  placeholder="Enter violation description"
                  {...field}
                />
              )}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <Controller
              control={control}
              name="location"
              render={({ field }) => (
                <Input id="location" placeholder="Enter violation location" {...field} />
              )}
            />
            {errors.location && (
              <p className="text-sm text-red-500">{errors.location.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="reported_by">Reported By</Label>
            <Controller
              control={control}
              name="reported_by"
              render={({ field }) => (
                <Input
                  id="reported_by"
                  placeholder="Enter reporter's name"
                  {...field}
                />
              )}
            />
            {errors.reported_by && (
              <p className="text-sm text-red-500">{errors.reported_by.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="assignee">Assignee</Label>
            <Controller
              control={control}
              name="assignee"
              render={({ field }) => (
                <Input id="assignee" placeholder="Enter assignee's name" {...field} />
              )}
            />
            {errors.assignee && (
              <p className="text-sm text-red-500">{errors.assignee.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="severity">Severity</Label>
            <Controller
              control={control}
              name="severity"
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger id="severity">
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.severity && (
              <p className="text-sm text-red-500">{errors.severity.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.status && (
              <p className="text-sm text-red-500">{errors.status.message}</p>
            )}
          </div>
        </form>
        <DialogFooter>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Violation'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewViolationModal;
