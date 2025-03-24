
import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  due_date: z.date({
    required_error: "Due date is required",
  }),
  assignee_id: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']),
  status: z.enum(['open', 'in-progress', 'completed', 'overdue', 'pending']).default('open'),
  violation_id: z.string().optional(),
});

export type TaskFormData = z.infer<typeof taskSchema>;
