
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Control, FieldErrors } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import { TaskFormData } from "@/components/tasks/schemas/taskFormSchema";
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Violation } from '@/types/models';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TaskModalContentProps {
  title: string;
  control: Control<TaskFormData>;
  errors: FieldErrors<TaskFormData>;
  isSubmitting: boolean;
  onClose: () => void;
  onViolationChange?: (violationId: string) => void;
  violations?: Violation[];
  submitButtonText?: string;
}

const TaskModalContent = ({
  title,
  control,
  errors,
  isSubmitting,
  onClose,
  onViolationChange,
  violations = [],
  submitButtonText = "Create Task"
}: TaskModalContentProps) => {
  return (
    <>
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-white mb-1">{title}</h2>
          <p className="text-sm text-gray-400">Fill out the form below to create a new task.</p>
        </div>
        
        <Separator className="bg-gray-800" />
        
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Title</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter task title" 
                  className="bg-[#1a1f29] border-gray-700 text-white"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter task description" 
                  className="bg-[#1a1f29] border-gray-700 text-white resize-none min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={control}
            name="worksite_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Worksite</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-[#1a1f29] border-gray-700 text-white">
                      <SelectValue placeholder="Select worksite" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-[#1a1f29] border-gray-700 text-white">
                    <SelectItem value="north">North Production Facility</SelectItem>
                    <SelectItem value="south">South Warehouse</SelectItem>
                    <SelectItem value="main">Main Office</SelectItem>
                    <SelectItem value="west">West Distribution Center</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="assignee_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Assignee</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-[#1a1f29] border-gray-700 text-white">
                      <SelectValue placeholder="Select assignee" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-[#1a1f29] border-gray-700 text-white">
                    <SelectItem value="john">John Smith</SelectItem>
                    <SelectItem value="sarah">Sarah Johnson</SelectItem>
                    <SelectItem value="michael">Michael Chen</SelectItem>
                    <SelectItem value="lisa">Lisa Rodriguez</SelectItem>
                    <SelectItem value="david">David Wilson</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={control}
            name="due_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-gray-300">Due Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={`bg-[#1a1f29] border-gray-700 text-white w-full justify-start text-left font-normal ${!field.value && "text-muted-foreground"}`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Select date</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="bg-[#1a1f29] border-gray-700 text-white p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      className="bg-[#1a1f29] text-white"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Priority</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-[#1a1f29] border-gray-700 text-white">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-[#1a1f29] border-gray-700 text-white">
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
            control={control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-[#1a1f29] border-gray-700 text-white">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-[#1a1f29] border-gray-700 text-white">
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        {violations && violations.length > 0 && (
          <FormField
            control={control}
            name="violation_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Related Violation</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    onViolationChange?.(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-[#1a1f29] border-gray-700 text-white">
                      <SelectValue placeholder="Select violation" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-[#1a1f29] border-gray-700 text-white">
                    <SelectItem value="">None</SelectItem>
                    {violations.map((violation) => (
                      <SelectItem key={violation.id} value={violation.id}>
                        {violation.violation}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </div>
      
      <div className="flex justify-end gap-2 mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="border-gray-700 text-white hover:bg-gray-800"
        >
          Cancel
        </Button>
        <Button 
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isSubmitting ? "Creating..." : submitButtonText}
        </Button>
      </div>
    </>
  );
};

export default TaskModalContent;
