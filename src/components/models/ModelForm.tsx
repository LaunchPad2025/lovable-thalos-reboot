
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const modelSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  industry: z.string().min(1, 'Industry is required'),
  model_type: z.string().min(1, 'Model type is required'),
  version: z.string().min(1, 'Version is required'),
  accuracy: z.coerce.number().min(0).max(100).optional(),
  active: z.boolean().default(true),
});

type ModelFormValues = z.infer<typeof modelSchema>;

// Model types for the dropdown
const modelTypes = [
  'Image',
  'Text',
  'Audio',
  'Video',
  'Multimodal'
];

// Industry types for the dropdown
const industries = [
  'Construction',
  'Manufacturing',
  'Healthcare',
  'Energy',
  'Transportation',
  'Agriculture',
  'Food Processing',
  'Mining',
  'General'
];

const ModelForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ModelFormValues>({
    resolver: zodResolver(modelSchema),
    defaultValues: {
      name: '',
      description: '',
      industry: '',
      model_type: '',
      version: '1.0',
      accuracy: undefined,
      active: true,
    },
  });

  const onSubmit = async (values: ModelFormValues) => {
    setIsSubmitting(true);
    try {
      // Insert the model record
      const { data, error } = await supabase
        .from('ml_models')
        .insert({
          ...values,
        })
        .select();

      if (error) throw error;

      toast.success('ML model added successfully');
      form.reset();
    } catch (error: any) {
      console.error('Error adding ML model:', error);
      toast.error(error.message || 'Failed to add ML model');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Model name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="model_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model Type</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select model type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {modelTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {industries.map(industry => (
                      <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="version"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Version</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 1.0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="accuracy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Accuracy (%)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0"
                      max="100"
                      step="0.1"
                      placeholder="e.g., 95.5"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value === '' ? undefined : Number(e.target.value);
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Brief description of the model"
                    className="min-h-[120px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <FormLabel>Active</FormLabel>
                  <FormDescription>
                    Make this model available for violation detection
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding Model...' : 'Add Model'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ModelForm;
