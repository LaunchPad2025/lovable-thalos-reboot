
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { TrainingReviewItem, TrainingFilters } from '../types';

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
      
      // Format data for UI
      const formattedData: TrainingReviewItem[] = (queryData || []).map(item => ({
        id: item.id,
        question: item.question || '',
        response: item.response || '',
        matched_regulation: item.matched_regulation_id || '',
        industry: item.matched_category || '',
        feedback: item.notes || '',
        status: item.training_status as 'pending' | 'approved' | 'rejected' | 'rewritten' || 'pending',
        review_status: item.review_status as 'needs_review' | 'improved' | 'escalated' | null,
        matched_keywords: item.matched_keywords || [],
        created_at: item.created_at,
        improved_response: item.improved_response || '',
        rejection_reason: item.rejection_reason
      }));
      
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
