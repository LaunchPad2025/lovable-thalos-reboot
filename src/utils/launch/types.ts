
/**
 * Represents an item in the go-live checklist
 */
export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  category: 'content' | 'functionality' | 'security' | 'performance' | 'compliance';
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignee?: string;
  due_date?: string;
}
