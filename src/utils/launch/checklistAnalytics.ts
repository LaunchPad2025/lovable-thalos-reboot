
import { ChecklistItem } from './types';

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
