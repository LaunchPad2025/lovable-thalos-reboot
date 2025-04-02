
import { ChecklistItem } from './types';
import { defaultGoLiveChecklist } from './checklistData';
import { toast } from 'sonner';

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
