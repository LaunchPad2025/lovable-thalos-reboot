
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

// Define simple primitive types for filters to avoid deep nesting
interface SearchFilters {
  industry?: string | null;
  jurisdiction?: string | null;
  status?: string | null;
  document_type?: string | null;
}

export function useRegulationSearch(searchTerm: string, filters: SearchFilters) {
  // Create a stable query key using primitive values and a structured approach
  const queryKey = [
    'regulations', 
    'search', 
    searchTerm,
    filters.industry || 'null',
    filters.jurisdiction || 'null',
    filters.status || 'null',
    filters.document_type || 'null'
  ];
  
  return useQuery({
    queryKey,
    queryFn: async () => {
      let query = supabase
        .from('regulations')
        .select('*');
      
      // Apply text search if provided
      if (searchTerm) {
        query = query.textSearch('search_text', searchTerm);
      }
      
      // Apply each filter only if it has a value
      if (filters.industry) {
        query = query.eq('industry', filters.industry);
      }
      
      if (filters.jurisdiction) {
        query = query.eq('jurisdiction', filters.jurisdiction);
      }
      
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      
      if (filters.document_type) {
        query = query.eq('document_type', filters.document_type);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Regulation[];
    }
  });
}
