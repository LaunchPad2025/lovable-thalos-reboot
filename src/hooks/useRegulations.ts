
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export interface RegulationProps {
  id: string;
  title: string;
  description: string;
  industry: string;
  category: string;
  sub_category: string;
  citation: string;
  summary: string;
  risk_level: string;
  compliance_requirements: string;
  penalties: string;
  keywords: string[];
  country: string;
  state: string;
  local: string;
  last_updated: string;
  created_at: string;
  updated_at: string;
}

// Fetch regulations related to a specific worksite
export const useWorksiteRegulations = (worksiteId: string) => {
  return useQuery({
    queryKey: ['worksite-regulations', worksiteId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('worksite_regulations')
        .select(`
          regulation_id,
          regulation:regulations(*)
        `)
        .eq('worksite_id', worksiteId);

      if (error) throw error;
      return data?.map(item => item.regulation) || [];
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
