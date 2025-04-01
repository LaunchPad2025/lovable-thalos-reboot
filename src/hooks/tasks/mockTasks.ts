
import { Task } from '@/types/models';

// Fallback task data for when Supabase is unavailable
export const mockTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Remediate: Poor Housekeeping',
    description: 'Clean up the area around workstations and ensure all materials are properly stored.',
    due_date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // Yesterday
    status: 'completed',
    assignee_id: 'Sarah Johnson',
    priority: 'medium',
    organization_id: 'org-1',
    created_by: 'user-1',
    worksite_id: 'Main Office',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'task-2',
    title: 'Remediate: Improper Material Storage',
    description: 'Reorganize storage area according to safety guidelines and ensure proper labeling.',
    due_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    status: 'completed',
    assignee_id: 'Sarah Johnson',
    priority: 'medium',
    organization_id: 'org-1',
    created_by: 'user-1',
    worksite_id: 'Main Office',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'task-3',
    title: 'Remediate: Improper Material Storage',
    description: 'Reorganize storage containers and ensure proper spacing between hazardous materials.',
    due_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    status: 'pending',
    assignee_id: 'Unassigned',
    priority: 'medium',
    organization_id: 'org-1',
    created_by: 'user-1',
    worksite_id: '{"x":40,"y":30}',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'task-4',
    title: 'Remediate: Missing Fall Protection at Heights',
    description: 'Install guardrails and ensure all workers have proper fall protection equipment.',
    due_date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    status: 'completed',
    assignee_id: 'John Smith',
    priority: 'high',
    organization_id: 'org-1',
    created_by: 'user-1',
    worksite_id: 'North Production Facility',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'task-5',
    title: 'Remediate: Improper Material Storage',
    description: 'Reorganize chemical storage according to compatibility guidelines and ensure proper ventilation.',
    due_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    status: 'completed',
    assignee_id: 'John Smith',
    priority: 'medium',
    organization_id: 'org-1',
    created_by: 'user-1',
    worksite_id: 'Main Office',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];
