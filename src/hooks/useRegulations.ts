
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
  // New fields
  jurisdiction: string | null;
  authority: string | null;
  keywords: string[] | null;
  source_url: string | null;
  status: string | null;
  category: string | null;
  applicable_to: string[] | null;
  last_reviewed_date: string | null;
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

export function useRegulationSearch(searchTerm: string, filters: Record<string, string | null>) {
  return useQuery({
    queryKey: ['regulations', 'search', searchTerm, filters],
    queryFn: async () => {
      let query = supabase
        .from('regulations')
        .select('*');
      
      // Apply text search if provided
      if (searchTerm) {
        query = query.textSearch('search_text', searchTerm);
      }
      
      // Apply filters without type recursion issue
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          query = query.eq(key, value);
        }
      });
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Regulation[];
    }
  });
}
