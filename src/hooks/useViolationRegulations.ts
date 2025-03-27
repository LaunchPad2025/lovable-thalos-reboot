
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

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
            document_type,
            jurisdiction,
            authority
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
            location,
            status,
            detected_at,
            description
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

// New hook to get tasks associated with a violation
export function useViolationTasks(violationId: string | undefined) {
  return useQuery({
    queryKey: ['violation-tasks', violationId],
    queryFn: async () => {
      if (!violationId) return [];
      
      const { data, error } = await supabase
        .from('violation_tasks')
        .select(`
          *,
          task:task_id (
            id,
            title,
            description,
            status,
            priority,
            due_date,
            assignee_id
          )
        `)
        .eq('violation_id', violationId);
      
      if (error) throw error;
      
      // Transform the data to make it easier to use
      return data.map((item: any) => item.task);
    },
    enabled: !!violationId
  });
}
