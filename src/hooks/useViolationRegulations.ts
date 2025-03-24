
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

interface ViolationRegulation {
  id: string;
  violation_id: string;
  regulation_id: string;
  relevance_score: number | null;
  created_at: string;
  regulation?: {
    title: string;
    document_type: string;
  };
}

export function useViolationRegulations(violationId: string | undefined) {
  return useQuery({
    queryKey: ['violation-regulations', violationId],
    queryFn: async () => {
      if (!violationId) return [];
      
      const { data, error } = await supabase
        .from('violation_regulations')
        .select(`
          *,
          regulation:regulation_id (
            title,
            document_type
          )
        `)
        .eq('violation_id', violationId)
        .order('relevance_score', { ascending: false });
      
      if (error) throw error;
      return data as ViolationRegulation[];
    },
    enabled: !!violationId
  });
}

export function useRegulationViolations(regulationId: string | undefined) {
  return useQuery({
    queryKey: ['regulation-violations', regulationId],
    queryFn: async () => {
      if (!regulationId) return [];
      
      const { data, error } = await supabase
        .from('violation_regulations')
        .select(`
          *,
          violation:violation_id (
            id,
            violation,
            severity,
            location
          )
        `)
        .eq('regulation_id', regulationId)
        .order('relevance_score', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!regulationId
  });
}
