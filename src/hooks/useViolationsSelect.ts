
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Violation } from '@/types/models';

export function useViolationsSelect() {
  return useQuery({
    queryKey: ['violations-select'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('violations')
        .select('id, violation')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Violation[];
    }
  });
}
