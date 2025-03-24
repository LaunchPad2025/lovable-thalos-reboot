
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Violation } from '@/types/models';

export function useTaskViolation(violationId: string | undefined) {
  return useQuery({
    queryKey: ['violation-for-task', violationId],
    queryFn: async () => {
      if (!violationId) return null;
      
      const { data, error } = await supabase
        .from('violations')
        .select('id, violation')
        .eq('id', violationId)
        .single();
      
      if (error) throw error;
      return data as Violation;
    },
    enabled: !!violationId
  });
}
