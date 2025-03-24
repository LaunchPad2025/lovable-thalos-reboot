
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

interface Regulation {
  id: string;
  title: string;
  description: string | null;
  industry: string | null;
  document_type: string;
  file_path: string | null;
  file_type: string | null;
  version: string | null;
  effective_date: string | null;
  created_at: string;
}

export function useRegulations() {
  return useQuery({
    queryKey: ['regulations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('regulations')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Regulation[];
    }
  });
}

export function useRegulationDetails(id: string | undefined) {
  return useQuery({
    queryKey: ['regulation', id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from('regulations')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as Regulation;
    },
    enabled: !!id
  });
}
