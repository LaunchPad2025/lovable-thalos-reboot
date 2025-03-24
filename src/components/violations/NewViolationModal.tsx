
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Violation } from '@/types/models';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

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
      ...data,
      date: new Date().toISOString(),
      notes: [],
    });
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] bg-[#0f1419] border border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">Report New Safety Violation</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-300">Title</Label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  id="title"
                  placeholder="Brief description of the violation"
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
            <Label htmlFor="description" className="text-gray-300">Detailed Description</Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="description"
                  placeholder="Provide a detailed description of the safety violation"
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
              <Label htmlFor="location" className="text-gray-300">Location</Label>
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <Input
                    id="location"
                    placeholder="Building, floor, area, etc."
                    className="bg-[#1a1f29] border-gray-700 text-white"
                    {...field}
                  />
                )}
              />
              {errors.location && (
                <p className="text-sm text-red-500">{errors.location.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reported_by" className="text-gray-300">Reported By</Label>
              <Controller
                name="reported_by"
                control={control}
                render={({ field }) => (
                  <Input
                    id="reported_by"
                    placeholder="Your name"
                    className="bg-[#1a1f29] border-gray-700 text-white"
                    {...field}
                  />
                )}
              />
              {errors.reported_by && (
                <p className="text-sm text-red-500">{errors.reported_by.message}</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="severity" className="text-gray-300">Severity</Label>
              <Controller
                name="severity"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger id="severity" className="bg-[#1a1f29] border-gray-700 text-white">
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a1f29] border-gray-700 text-white">
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
            
            <div className="space-y-2">
              <Label htmlFor="assignee" className="text-gray-300">Assign To</Label>
              <Controller
                name="assignee"
                control={control}
                render={({ field }) => (
                  <Input
                    id="assignee"
                    placeholder="Person responsible for addressing this"
                    className="bg-[#1a1f29] border-gray-700 text-white"
                    {...field}
                  />
                )}
              />
              {errors.assignee && (
                <p className="text-sm text-red-500">{errors.assignee.message}</p>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} className="border-gray-700 text-gray-300 hover:bg-gray-800">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-thalos-blue hover:bg-blue-600">
              {isSubmitting ? 'Submitting...' : 'Submit Violation'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewViolationModal;
