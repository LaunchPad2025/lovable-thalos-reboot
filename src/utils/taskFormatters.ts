
import { Task } from '@/types/models';

export interface FormattedTask extends Task {
  dueDate: string;
  assignee: string;
}

export function formatTasksForList(data: Task[] | undefined): FormattedTask[] {
  if (!data) return [];
  
  return data.map(item => ({
    ...item, // Copy all properties from the original task
    dueDate: item.due_date ? new Date(item.due_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'No due date',
    assignee: item.assignee_id || 'Unassigned',
  }));
}
