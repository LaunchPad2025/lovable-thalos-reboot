
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export interface RegulationProps {
  id: string;
  title: string;
  description: string;
  industry: string;
  category: string;
  document_type: string;
  jurisdiction: string;
  authority: string;
  status: string;
  severity_level: string;
  version: string;
  effective_date: string;
  keywords: string[];
  tags: string[];
  created_at: string;
  updated_at: string;
}

// Fetch regulations related to a specific worksite
export const useWorksiteRegulations = (worksiteId: string) => {
  return useQuery({
    queryKey: ['worksite-regulations', worksiteId],
    queryFn: async () => {
      // First, fetch the violation IDs associated with this worksite
      const { data: violations, error: violationsError } = await supabase
        .from('violations')
        .select('id')
        .eq('worksite_id', worksiteId);

      if (violationsError) throw violationsError;
      
      if (!violations || violations.length === 0) {
        return [];
      }
      
      // Then, get the regulations linked to these violations
      const violationIds = violations.map(v => v.id);
      const { data: linkedRegulations, error: linkedError } = await supabase
        .from('violation_regulations')
        .select(`
          regulation_id,
          regulations:regulation_id (*)
        `)
        .in('violation_id', violationIds);
      
      if (linkedError) throw linkedError;
      
      return linkedRegulations?.map(item => item.regulations) || [];
    },
    enabled: !!worksiteId
  });
};

// Fetch regulations related to a specific industry
export const useIndustryRegulations = (industry: string) => {
  return useQuery({
    queryKey: ['industry-regulations', industry],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('regulations')
        .select('*')
        .eq('industry', industry);

      if (error) throw error;
      return data || [];
    },
    enabled: !!industry
  });
};
