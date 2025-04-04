
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
  reference_number: string | null; // Making this field optional with null
}

export function useRegulations() {
  return useQuery({
    queryKey: ['regulations'],
    queryFn: async () => {
      const { data, error } = await supabase.from('regulations').select('*');
      if (error) throw new Error(error.message);
      
      // Add default reference_number field if it's missing
      const regulationsWithDefaults = data.map((regulation: any) => ({
        ...regulation,
        reference_number: regulation.reference_number || null
      }));
      
      return regulationsWithDefaults as Regulation[];
    }
  });
}

export function useRegulationDetails(id: string | undefined) {
  return useQuery({
    queryKey: ['regulationDetails', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase.from('regulations').select('*').eq('id', id).single();
      if (error) throw new Error(error.message);
      
      // Handle data as any and safely extract reference_number
      const regulationData = data as any;
      
      // Add default reference_number field if it's missing
      const regulationWithDefaults = {
        ...regulationData,
        reference_number: regulationData.reference_number || null
      };
      
      return regulationWithDefaults as Regulation;
    },
    enabled: !!id
  });
}

// Define simple primitive types for filters to avoid deep nesting
export interface SearchFilters {
  industry?: string | null;
  jurisdiction?: string | null;
  status?: string | null;
  document_type?: string | null;
  authority?: string | null;
}

export function useRegulationSearch(searchTerm: string, filters: SearchFilters) {
  // Create stable primitive values for the query key
  const filterKeys: string[] = [];
  
  // Only add filters that have values
  if (filters.industry) filterKeys.push(`industry:${filters.industry}`);
  if (filters.jurisdiction) filterKeys.push(`jurisdiction:${filters.jurisdiction}`);
  if (filters.status) filterKeys.push(`status:${filters.status}`);
  if (filters.document_type) filterKeys.push(`document_type:${filters.document_type}`);
  if (filters.authority) filterKeys.push(`authority:${filters.authority}`);
  
  return useQuery({
    queryKey: ['regulations', 'search', searchTerm || '', ...filterKeys],
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
      
      if (filters.authority) {
        query = query.eq('authority', filters.authority);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Add default reference_number field if it's missing
      const regulationsWithDefaults = data.map((regulation: any) => ({
        ...regulation,
        reference_number: regulation.reference_number || null
      }));
      
      return regulationsWithDefaults as Regulation[];
    }
  });
}

// Add a hook for checking if a regulation needs updating based on last review date
export function useRegulationNeedsUpdate(days: number = 90) {
  return useQuery({
    queryKey: ['regulations', 'needs-update', days],
    queryFn: async () => {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      
      const { data, error } = await supabase
        .from('regulations')
        .select('*')
        .lt('last_reviewed_date', cutoffDate.toISOString())
        .or(`last_reviewed_date.is.null`);
      
      if (error) throw error;
      
      // Add default reference_number field if it's missing
      const regulationsWithDefaults = data.map((regulation: any) => ({
        ...regulation,
        reference_number: regulation.reference_number || null
      }));
      
      return regulationsWithDefaults as Regulation[];
    }
  });
}
