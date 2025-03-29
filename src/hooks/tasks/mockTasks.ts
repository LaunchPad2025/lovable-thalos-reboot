
import { Task } from '@/types/models';

// Fallback task data for when Supabase is unavailable
export const mockTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Review PPE compliance for production floor',
    description: 'Conduct a thorough inspection of all personal protective equipment on the production floor. Document any violations or issues.',
    due_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
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
    id: 'task-2',
    title: 'Update fire safety evacuation plan',
    description: 'Review and update the current evacuation plan to include new building extensions. Ensure all fire exits are properly marked.',
    due_date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'in-progress',
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
    title: 'Conduct monthly safety committee meeting',
    description: 'Organize and lead the monthly safety committee meeting. Prepare agenda and document minutes.',
    due_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
    assignee_id: 'Michael Chen',
    priority: 'high',
    organization_id: 'org-1',
    created_by: 'user-1',
    worksite_id: 'Main Office',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'task-4',
    title: 'Order new safety signage for chemical storage',
    description: 'Order GHS compliant safety signage for the chemical storage area to replace damaged signs.',
    due_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'in-progress',
    assignee_id: 'Lisa Rodriguez',
    priority: 'low',
    organization_id: 'org-1',
    created_by: 'user-1',
    worksite_id: 'South Warehouse',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'task-5',
    title: 'Complete OSHA compliance documentation',
    description: 'Fill out and submit required OSHA compliance documentation for the quarterly audit.',
    due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
    assignee_id: 'David Wilson',
    priority: 'high',
    organization_id: 'org-1',
    created_by: 'user-1',
    worksite_id: 'West Distribution Center',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];
