
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { TrainingReviewItem, TrainingStats, TrainingFilters, RejectionReason } from '../types';
import { downloadTrainingData } from '@/utils/feedback/exportTrainingData';

const DEFAULT_FILTERS: TrainingFilters = {
  status: 'pending',
  industry: '',
  regulation: '',
  searchQuery: '',
};

export const useTrainingData = () => {
  const [data, setData] = useState<TrainingReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<TrainingFilters>(DEFAULT_FILTERS);
  const [stats, setStats] = useState<TrainingStats>({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    rewritten: 0,
    byIndustry: [],
    byRegulation: []
  });
  
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
        improved_response: item.improved_response || ''
      }));
      
      setData(formattedData);
      
      // Calculate stats
      const newStats: TrainingStats = {
        total: formattedData.length,
        pending: formattedData.filter(item => item.status === 'pending').length,
        approved: formattedData.filter(item => item.status === 'approved').length,
        rejected: formattedData.filter(item => item.status === 'rejected').length,
        rewritten: formattedData.filter(item => item.status === 'rewritten').length,
        byIndustry: [],
        byRegulation: []
      };
      
      // Calculate industry stats
      const industryMap = new Map<string, number>();
      formattedData.forEach(item => {
        if (item.industry) {
          const count = industryMap.get(item.industry) || 0;
          industryMap.set(item.industry, count + 1);
        }
      });
      newStats.byIndustry = Array.from(industryMap.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
      
      // Calculate regulation stats
      const regulationMap = new Map<string, number>();
      formattedData.forEach(item => {
        if (item.matched_regulation) {
          const count = regulationMap.get(item.matched_regulation) || 0;
          regulationMap.set(item.matched_regulation, count + 1);
        }
      });
      newStats.byRegulation = Array.from(regulationMap.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
      
      setStats(newStats);
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
  
  // Update a review item
  const updateReviewItem = async (
    id: string, 
    status: 'approved' | 'rejected' | 'rewritten', 
    improvedResponse?: string,
    rejectionReason?: string
  ) => {
    try {
      const updates: any = { 
        training_status: status,
      };
      
      if (improvedResponse) {
        updates.improved_response = improvedResponse;
      }
      
      if (rejectionReason) {
        updates.rejection_reason = rejectionReason;
      }
      
      const { error } = await supabase
        .from('paulie_queries')
        .update(updates)
        .eq('id', id);
      
      if (error) throw error;
      
      // Update local state
      setData(prev => prev.map(item => 
        item.id === id ? { 
          ...item, 
          status, 
          improved_response: improvedResponse || item.improved_response 
        } : item
      ));
      
      // Update stats
      setStats(prev => {
        const itemToUpdate = data.find(item => item.id === id);
        const oldStatus = itemToUpdate?.status || 'pending';
        
        return {
          ...prev,
          [oldStatus]: Math.max(0, prev[oldStatus as keyof TrainingStats] as number - 1),
          [status]: (prev[status as keyof TrainingStats] as number) + 1
        };
      });
      
      toast.success(`Response ${status} successfully`);
      return true;
    } catch (error) {
      console.error(`Error updating review item:`, error);
      toast.error(`Failed to update review item`);
      return false;
    }
  };
  
  // Export data for fine-tuning
  const exportData = (format: 'json' | 'csv') => {
    // Only export approved and rewritten items
    const exportItems = data.filter(item => 
      item.status === 'approved' || item.status === 'rewritten'
    ).map(item => ({
      prompt: item.question,
      response: item.status === 'rewritten' && item.improved_response 
        ? item.improved_response 
        : item.response,
      feedback: 'helpful', // These are approved responses, so mark as helpful
      notes: item.feedback,
      matched_regulation: item.matched_regulation,
      industry_context: item.industry,
      matched_regulation_code: item.matched_keywords?.find(kw => 
        kw.match(/^\d+\.\d+/) || kw.match(/^[A-Z]+\d+/)
      ) || null,
      industry_detected: item.industry,
      status: item.status
    }));
    
    if (exportItems.length === 0) {
      toast.error('No approved or rewritten responses to export');
      return;
    }
    
    // Use the existing export utility
    downloadTrainingData(exportItems, format);
    toast.success(`Exported ${exportItems.length} training examples as ${format.toUpperCase()}`);
  };
  
  return {
    data,
    loading,
    filters,
    stats,
    updateFilters,
    updateReviewItem,
    refreshData: fetchData,
    exportData
  };
};
