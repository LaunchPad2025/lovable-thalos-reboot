
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const regulationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  industry: z.string().optional(),
  document_type: z.string().min(1, 'Document type is required'),
  version: z.string().optional(),
  effective_date: z.string().optional(),
});

type RegulationFormValues = z.infer<typeof regulationSchema>;

// Document types for the dropdown
const documentTypes = [
  'Regulation',
  'Standard',
  'Code',
  'Guideline',
  'Policy',
  'Rulebook',
  'Specification'
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

const RegulationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<RegulationFormValues>({
    resolver: zodResolver(regulationSchema),
    defaultValues: {
      title: '',
      description: '',
      industry: '',
      document_type: '',
      version: '',
      effective_date: '',
    },
  });

  const onSubmit = async (values: RegulationFormValues) => {
    setIsSubmitting(true);
    try {
      let filePath = null;
      let fileType = null;
      let fileSize = null;

      // If a file was selected, upload it to storage
      if (file) {
        const fileName = `${Date.now()}_${file.name}`;
        fileType = file.type;
        fileSize = file.size;
        
        // Upload file to Supabase Storage (you'd need to create a storage bucket for this)
        // This is just a placeholder - you'll need to implement actual file storage
        // const { data, error } = await supabase.storage
        //  .from('regulations')
        //  .upload(fileName, file);
        // 
        // if (error) throw error;
        // filePath = data?.path;
      }

      // Insert the regulation record
      const { data, error } = await supabase
        .from('regulations')
        .insert({
          ...values,
          file_path: filePath,
          file_type: fileType,
          file_size: fileSize,
          effective_date: values.effective_date || null,
        })
        .select();

      if (error) throw error;

      toast.success('Regulation added successfully');
      form.reset();
      setFile(null);
    } catch (error: any) {
      console.error('Error adding regulation:', error);
      toast.error(error.message || 'Failed to add regulation');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Regulation title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="document_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Document Type</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {documentTypes.map(type => (
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
              name="effective_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Effective Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
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
                    placeholder="Brief description of the regulation"
                    className="min-h-[120px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <FormLabel>Document File (Optional)</FormLabel>
            <Input 
              type="file" 
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.txt"
            />
            {file && (
              <div className="text-sm text-muted-foreground">
                Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)
              </div>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding Regulation...' : 'Add Regulation'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegulationForm;
