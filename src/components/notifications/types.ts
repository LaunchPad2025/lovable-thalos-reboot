
export interface Notification {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'violations' | 'tasks' | 'audits' | 'risk' | 'document' | 'other';
  read: boolean;
}
