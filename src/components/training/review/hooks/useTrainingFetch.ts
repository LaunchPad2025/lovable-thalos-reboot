
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
  review_label: string | null;
}

export const useTrainingFetch = (initialFilters: TrainingFilters) => {
  const [data, setData] = useState<TrainingReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<TrainingFilters>(initialFilters);
  
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Using "let" to build up the query instead of chaining, which reduces type complexity
      let query = supabase.from('paulie_queries');
      
      // First select operation
      query = query.select('*');
      
      // Basic filter condition
      query = query.or('helpful.eq.false,review_status.eq.needs_review');
      
      // Apply status filter
      if (filters.status && filters.status !== 'all') {
        if (filters.status === 'pending') {
          query = query.is('training_status', null);
        } else {
          query = query.eq('training_status', filters.status);
        }
      }
      
      // Apply industry filter
      if (filters.industry) {
        query = query.eq('matched_category', filters.industry);
      }
      
      // Apply regulation filter
      if (filters.regulation) {
        query = query.eq('matched_regulation_id', filters.regulation);
      }
      
      // Apply search filter
      if (filters.searchQuery) {
        query = query.or(`question.ilike.%${filters.searchQuery}%,response.ilike.%${filters.searchQuery}%`);
      }
      
      // Cast the query result to a known type to prevent TypeScript from calculating deep types
      // This avoids the "excessively deep and possibly infinite" error
      const result = await query;
      const { data: queryData, error } = result as unknown as { 
        data: PaulieQueryRow[] | null;
        error: any;
      };
      
      if (error) throw error;
      
      const formattedData: TrainingReviewItem[] = [];
      
      if (queryData) {
        for (const item of queryData) {
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
