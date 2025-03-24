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

interface Regulation {
  id: string;
  title: string;
  description: string;
  file_url: string;
  file_size: number;
  effective_date: string;
  created_at: string;
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
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Convert Date object to ISO string format for the database
      const formattedValues = {
        ...values,
        effective_date: values.effective_date instanceof Date 
          ? values.effective_date.toISOString()
          : values.effective_date,
        file_size: Number(values.file_size) || 0, // Convert to number
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
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
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
                  className="resize-none"
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
                        "w-[240px] pl-3 text-left font-normal",
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
                    disabled={(date) =>
                      date > new Date()
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : editingRegulation ? "Update Regulation" : "Create Regulation"}
        </Button>
      </form>
    </Form>
  );
};

export default RegulationForm;
