
import { Task } from '@/types/models';

export interface FormattedTask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: Task['status'];
  assignee: string;
  priority: 'low' | 'medium' | 'high';
}

export function formatTasksForList(data: Task[] | undefined): FormattedTask[] {
  if (!data) return [];
  
  return data.map(item => ({
    id: item.id,
    title: item.title,
    description: item.description || '',
    dueDate: item.due_date ? new Date(item.due_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'No due date',
    status: item.status,
    assignee: item.assignee_id || 'Unassigned',
    priority: item.priority
  }));
}
