import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Regulation {
  id: string;
  title: string;
  description: string;
  file_url: string;
  file_size: number;
  effective_date: string;
  created_at: string;
  // New fields
  jurisdiction: string | null;
  authority: string | null;
  keywords: string[] | null;
  source_url: string | null;
  status: string;
  category: string | null;
  applicable_to: string[] | null;
  last_reviewed_date: string | null;
  document_type: string; // Added missing property
}

interface RegulationFormProps {
  onSuccess: () => void;
  editingRegulation?: Regulation | null;
}

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  file_url: z.string().url({
    message: "Please enter a valid URL.",
  }),
  file_size: z.string().refine((value) => {
    const num = Number(value);
    return !isNaN(num) && num > 0;
  }, {
    message: "File size must be a positive number.",
  }),
  effective_date: z.date(),
  // New fields
  jurisdiction: z.string().nullable().optional(),
  authority: z.string().nullable().optional(),
  keywords: z.string().nullable().optional(),
  source_url: z.string().url().nullable().optional(),
  status: z.string().default("active"),
  category: z.string().nullable().optional(),
  applicable_to: z.string().nullable().optional(),
  last_reviewed_date: z.date().nullable().optional(),
  document_type: z.string().default("standard"), // Added to match database schema requirement
});

const RegulationForm: React.FC<RegulationFormProps> = ({ onSuccess, editingRegulation }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: editingRegulation?.title || "",
      description: editingRegulation?.description || "",
      file_url: editingRegulation?.file_url || "",
      file_size: editingRegulation?.file_size?.toString() || "",
      effective_date: editingRegulation ? new Date(editingRegulation.effective_date) : new Date(),
      // New fields
      jurisdiction: editingRegulation?.jurisdiction || null,
      authority: editingRegulation?.authority || null,
      keywords: editingRegulation?.keywords ? editingRegulation.keywords.join(", ") : null,
      source_url: editingRegulation?.source_url || null,
      status: editingRegulation?.status || "active",
      category: editingRegulation?.category || null,
      applicable_to: editingRegulation?.applicable_to ? editingRegulation.applicable_to.join(", ") : null,
      last_reviewed_date: editingRegulation?.last_reviewed_date ? new Date(editingRegulation.last_reviewed_date) : null,
      document_type: editingRegulation?.document_type || "standard", // Default value for document_type
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Process arrays from comma-separated strings
      const keywords = values.keywords ? values.keywords.split(',').map(k => k.trim()) : null;
      const applicable_to = values.applicable_to ? values.applicable_to.split(',').map(a => a.trim()) : null;
      
      // Convert Date objects to ISO string format for the database
      const formattedValues = {
        title: values.title,
        description: values.description,
        document_type: values.document_type,
        effective_date: values.effective_date instanceof Date 
          ? values.effective_date.toISOString()
          : values.effective_date,
        last_reviewed_date: values.last_reviewed_date instanceof Date 
          ? values.last_reviewed_date.toISOString()
          : values.last_reviewed_date,
        file_path: values.file_url, // Map file_url to file_path in database
        file_size: Number(values.file_size) || 0, // Convert to number
        keywords,
        applicable_to,
        jurisdiction: values.jurisdiction,
        authority: values.authority,
        source_url: values.source_url,
        status: values.status,
        category: values.category
      };
      
      if (editingRegulation) {
        const { error } = await supabase
          .from('regulations')
          .update(formattedValues)
          .eq('id', editingRegulation.id);
          
        if (error) throw error;
        onSuccess();
      } else {
        const { error } = await supabase
          .from('regulations')
          .insert([formattedValues]);
          
        if (error) throw error;
        onSuccess();
      }
      
      toast.success(`Regulation ${editingRegulation ? 'updated' : 'created'} successfully`);
      form.reset();
    } catch (error: any) {
      console.error('Error submitting regulation:', error);
      toast.error(error.message || 'Failed to submit regulation');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Regulation Title" {...field} />
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
                    <Textarea
                      placeholder="Regulation Description"
                      className="resize-none min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="file_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>File URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Regulation File URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="file_size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>File Size (KB)</FormLabel>
                  <FormControl>
                    <Input placeholder="Regulation File Size in KB" type="number" {...field} />
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
                  <FormControl>
                    <Input placeholder="Type of document" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="effective_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Effective Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
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
              name="jurisdiction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jurisdiction</FormLabel>
                  <FormControl>
                    <Input placeholder="Country, State, or Province" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="authority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Authority</FormLabel>
                  <FormControl>
                    <Input placeholder="Issuing organization (e.g., OSHA)" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="General category (e.g., occupational health)" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-6">
          <FormField
            control={form.control}
            name="keywords"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Keywords</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter keywords separated by commas" 
                    {...field} 
                    value={field.value || ''} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="applicable_to"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Applicable To</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Job roles or equipment (comma separated)" 
                    {...field} 
                    value={field.value || ''} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="source_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Source URL</FormLabel>
                <FormControl>
                  <Input placeholder="Link to the original source" {...field} value={field.value || ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="active" id="active" />
                      <Label htmlFor="active">Active</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="archived" id="archived" />
                      <Label htmlFor="archived">Archived</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="superseded" id="superseded" />
                      <Label htmlFor="superseded">Superseded</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="last_reviewed_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Last Reviewed Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
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
                      selected={field.value || undefined}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Submitting..." : editingRegulation ? "Update Regulation" : "Create Regulation"}
        </Button>
      </form>
    </Form>
  );
};

export default RegulationForm;
