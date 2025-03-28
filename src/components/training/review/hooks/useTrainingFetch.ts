
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { TrainingReviewItem, TrainingFilters } from '../types';

// Define an interface that matches what's actually coming back from Supabase
interface PaulieQueryRow {
  id: string;
  question: string;
  response: string | null;
  helpful: boolean | null;
  notes: string | null;
  matched_category: string | null;
  matched_regulation_id: string | null;
  matched_keywords: string[] | null;
  review_status: string | null;
  created_at: string;
  message_id: string | null;
  user_id: string | null;
  timestamp: string | null;
  training_status: 'approved' | 'rejected' | 'rewritten' | null;
  improved_response: string | null;
  rejection_reason: string | null;
  review_label?: string | null; // Added to match the actual database schema
}

export const useTrainingFetch = (initialFilters: TrainingFilters) => {
  const [data, setData] = useState<TrainingReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<TrainingFilters>(initialFilters);
  
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch paulie_queries that are thumbs-down or flagged for review
      let query = supabase
        .from('paulie_queries')
        .select('*')
        .or('helpful.eq.false,review_status.eq.needs_review');
      
      // Apply filters
      if (filters.status && filters.status !== 'all') {
        if (filters.status === 'pending') {
          query = query.is('training_status', null);
        } else {
          query = query.eq('training_status', filters.status);
        }
      }
      
      if (filters.industry) {
        query = query.eq('matched_category', filters.industry);
      }
      
      if (filters.regulation) {
        query = query.eq('matched_regulation_id', filters.regulation);
      }
      
      if (filters.searchQuery) {
        query = query.or(`question.ilike.%${filters.searchQuery}%,response.ilike.%${filters.searchQuery}%`);
      }
      
      // Execute query
      const { data: queryData, error } = await query;
      
      if (error) throw error;
      
      // Transform the data to avoid deep type recursion
      const formattedData: TrainingReviewItem[] = [];
      
      if (queryData) {
        // Cast queryData to unknown first to avoid type mismatch error
        const rowData = queryData as unknown as PaulieQueryRow[];
        
        for (const item of rowData) {
          // Define status with proper type checking
          let status: 'pending' | 'approved' | 'rejected' | 'rewritten' = 'pending';
          
          if (item.training_status === 'approved' || 
              item.training_status === 'rejected' || 
              item.training_status === 'rewritten') {
            status = item.training_status;
          }
          
          formattedData.push({
            id: item.id,
            question: item.question || '',
            response: item.response || '',
            matched_regulation: item.matched_regulation_id || '',
            industry: item.matched_category || '',
            feedback: item.notes || '',
            status: status,
            review_status: item.review_status as 'needs_review' | 'improved' | 'escalated' | null,
            matched_keywords: item.matched_keywords || [],
            created_at: item.created_at,
            improved_response: item.improved_response || '',
            rejection_reason: item.rejection_reason
          });
        }
      }
      
      setData(formattedData);
    } catch (error) {
      console.error('Error fetching training data:', error);
      toast.error('Failed to load training data');
    } finally {
      setLoading(false);
    }
  }, [filters]);
  
  // Fetch data on mount and when filters change
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  // Update filters
  const updateFilters = (newFilters: Partial<TrainingFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };
  
  return {
    data,
    loading,
    filters,
    updateFilters,
    refreshData: fetchData
  };
};
