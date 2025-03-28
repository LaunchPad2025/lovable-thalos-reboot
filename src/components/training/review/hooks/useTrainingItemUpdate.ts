
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export const useTrainingItemUpdate = (onSuccess?: () => void) => {
  const [updating, setUpdating] = useState(false);
  
  const updateReviewItem = async (
    id: string, 
    status: 'approved' | 'rejected' | 'rewritten', 
    improvedResponse?: string,
    rejectionReason?: string
  ) => {
    setUpdating(true);
    try {
      const updates: any = { 
        training_status: status,
      };
      
      if (improvedResponse) {
        updates.improved_response = improvedResponse;
      }
      
      if (rejectionReason) {
        updates.rejection_reason = rejectionReason;
      }
      
      const { error } = await supabase
        .from('paulie_queries')
        .update(updates)
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success(`Response ${status} successfully`);
      if (onSuccess) onSuccess();
      return true;
    } catch (error) {
      console.error(`Error updating review item:`, error);
      toast.error(`Failed to update review item`);
      return false;
    } finally {
      setUpdating(false);
    }
  };
  
  return {
    updating,
    updateReviewItem
  };
};
