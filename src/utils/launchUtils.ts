
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

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

/**
 * Default go-live checklist for the application
 */
export const defaultGoLiveChecklist: ChecklistItem[] = [
  {
    id: 'content-1',
    title: 'Replace placeholder content',
    description: 'Replace all placeholder content including names, sample data, and lorem ipsum text',
    category: 'content',
    status: 'pending',
    priority: 'high'
  },
  {
    id: 'content-2',
    title: 'Industry-specific content verification',
    description: 'Ensure all industry references match supported industries',
    category: 'content',
    status: 'pending',
    priority: 'medium'
  },
  {
    id: 'functionality-1',
    title: 'Link validation',
    description: 'Test all navigation links to ensure they direct to correct destinations',
    category: 'functionality',
    status: 'pending',
    priority: 'high'
  },
  {
    id: 'functionality-2',
    title: 'Form validation',
    description: 'Test all forms for proper validation and error handling',
    category: 'functionality',
    status: 'pending',
    priority: 'high'
  },
  {
    id: 'security-1',
    title: 'Authentication flow verification',
    description: 'Test login, logout, password reset, and account recovery flows',
    category: 'security',
    status: 'pending',
    priority: 'critical'
  },
  {
    id: 'security-2',
    title: 'User permissions verification',
    description: 'Confirm all role-based permissions are working correctly',
    category: 'security',
    status: 'pending',
    priority: 'critical'
  },
  {
    id: 'performance-1',
    title: 'Load testing',
    description: 'Verify application performance under expected user load',
    category: 'performance',
    status: 'pending',
    priority: 'medium'
  },
  {
    id: 'compliance-1',
    title: 'Regulation database completeness',
    description: 'Verify regulation database contains required industry standards',
    category: 'compliance',
    status: 'pending',
    priority: 'high'
  },
  {
    id: 'compliance-2',
    title: 'Legal documents verification',
    description: 'Confirm all terms of service, privacy policy, and legal documents are current',
    category: 'compliance',
    status: 'pending',
    priority: 'high'
  }
];

/**
 * Saves the current state of the go-live checklist to the database
 */
export async function saveGoLiveChecklist(items: ChecklistItem[]) {
  try {
    // We'd ideally have a dedicated table for this, but we can use localStorage for now
    localStorage.setItem('goLiveChecklist', JSON.stringify(items));
    toast.success('Go-live checklist saved successfully');
    return true;
  } catch (error: any) {
    console.error('Error saving go-live checklist:', error);
    toast.error(`Failed to save checklist: ${error.message}`);
    return false;
  }
}

/**
 * Loads the current state of the go-live checklist from the database or returns the default
 */
export function loadGoLiveChecklist(): ChecklistItem[] {
  try {
    const savedChecklist = localStorage.getItem('goLiveChecklist');
    if (savedChecklist) {
      return JSON.parse(savedChecklist);
    }
    return defaultGoLiveChecklist;
  } catch (error) {
    console.error('Error loading go-live checklist:', error);
    return defaultGoLiveChecklist;
  }
}

/**
 * Updates the status of a checklist item
 */
export function updateChecklistItemStatus(
  items: ChecklistItem[],
  itemId: string,
  newStatus: ChecklistItem['status']
): ChecklistItem[] {
  return items.map(item => 
    item.id === itemId ? { ...item, status: newStatus } : item
  );
}

/**
 * Calculates completion percentage of the go-live checklist
 */
export function calculateChecklistCompletion(items: ChecklistItem[]): number {
  if (items.length === 0) return 0;
  
  const completedItems = items.filter(item => item.status === 'completed').length;
  return Math.round((completedItems / items.length) * 100);
}

/**
 * Checks if all critical items in the checklist are completed
 */
export function areAllCriticalItemsCompleted(items: ChecklistItem[]): boolean {
  const criticalItems = items.filter(item => item.priority === 'critical');
  return criticalItems.every(item => item.status === 'completed');
}

/**
 * Utility to fix common issues found during checklist verification
 */
export async function fixPlaceholderContent() {
  try {
    // This would normally connect to database and update content
    // For now, just showing a toast message
    toast.success('Placeholder content flagged for replacement');
    return true;
  } catch (error: any) {
    console.error('Error fixing placeholder content:', error);
    toast.error(`Failed to flag placeholder content: ${error.message}`);
    return false;
  }
}

/**
 * Verify that all regulations are properly linked to the correct industries
 */
export async function verifyRegulationIndustryMapping() {
  try {
    const { data, error } = await supabase
      .from('regulations')
      .select('id, title, industry')
      .is('industry', null);
    
    if (error) throw error;
    
    if (data && data.length > 0) {
      toast.warning(`Found ${data.length} regulations without industry mapping`);
      return { success: false, unmappedCount: data.length };
    }
    
    toast.success('All regulations have industry mappings');
    return { success: true, unmappedCount: 0 };
  } catch (error: any) {
    console.error('Error verifying regulation industry mapping:', error);
    toast.error(`Failed to verify regulation mappings: ${error.message}`);
    return { success: false, error: error.message };
  }
}
