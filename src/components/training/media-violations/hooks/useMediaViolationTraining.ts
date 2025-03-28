
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { MediaViolationTraining, MediaViolationFilters } from '../types';

const DEFAULT_FILTERS: MediaViolationFilters = {
  industry: '',
  category: '',
  risk_level: '',
  status: 'ready',
  searchQuery: '',
};

export const useMediaViolationTraining = () => {
  const [data, setData] = useState<MediaViolationTraining[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<MediaViolationFilters>(DEFAULT_FILTERS);
  const [stats, setStats] = useState<{
    total: number;
    needsReview: number;
    ready: number;
    approved: number;
    byIndustry: Record<string, number>;
    byCategory: Record<string, number>;
    byRiskLevel: Record<string, number>;
  }>({
    total: 0,
    needsReview: 0,
    ready: 0,
    approved: 0,
    byIndustry: {},
    byCategory: {},
    byRiskLevel: {},
  });
  
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('media_violation_training')
        .select('*')
        .order('created_at', { ascending: false });
      
      // Apply filters
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      
      if (filters.industry) {
        query = query.eq('industry', filters.industry);
      }
      
      if (filters.category) {
        query = query.eq('category', filters.category);
      }
      
      if (filters.risk_level) {
        query = query.eq('risk_level', filters.risk_level);
      }
      
      if (filters.searchQuery) {
        query = query.or(
          `violation_id.ilike.%${filters.searchQuery}%,` +
          `sample_caption.ilike.%${filters.searchQuery}%,` +
          `violation_type.ilike.%${filters.searchQuery}%,` +
          `regulation_citation.ilike.%${filters.searchQuery}%`
        );
      }
      
      const { data: violationData, error } = await query;
      
      if (error) throw error;
      
      // Process data
      const formattedData = (violationData || []) as MediaViolationTraining[];
      setData(formattedData);
      
      // Calculate statistics
      calculateStats(formattedData);
      
    } catch (error) {
      console.error('Error fetching media violation training data:', error);
      toast.error('Failed to load training data');
    } finally {
      setLoading(false);
    }
  }, [filters]);
  
  const calculateStats = (data: MediaViolationTraining[]) => {
    const statsByIndustry: Record<string, number> = {};
    const statsByCategory: Record<string, number> = {};
    const statsByRiskLevel: Record<string, number> = {};
    let needsReviewCount = 0;
    let readyCount = 0;
    let approvedCount = 0;
    
    data.forEach(item => {
      // Count by industry
      statsByIndustry[item.industry] = (statsByIndustry[item.industry] || 0) + 1;
      
      // Count by category
      statsByCategory[item.category] = (statsByCategory[item.category] || 0) + 1;
      
      // Count by risk level
      statsByRiskLevel[item.risk_level] = (statsByRiskLevel[item.risk_level] || 0) + 1;
      
      // Count by status
      if (item.status === 'needs_review') needsReviewCount++;
      if (item.status === 'ready') readyCount++;
      if (item.status === 'approved') approvedCount++;
    });
    
    setStats({
      total: data.length,
      needsReview: needsReviewCount,
      ready: readyCount,
      approved: approvedCount,
      byIndustry: statsByIndustry,
      byCategory: statsByCategory,
      byRiskLevel: statsByRiskLevel,
    });
  };
  
  const updateFilters = (newFilters: Partial<MediaViolationFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };
  
  const updateStatus = async (id: string, status: 'needs_review' | 'ready' | 'approved') => {
    try {
      const { error } = await supabase
        .from('media_violation_training')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success(`Training item status updated to ${status}`);
      await fetchData();
      return true;
    } catch (error) {
      console.error('Error updating training item status:', error);
      toast.error('Failed to update training item status');
      return false;
    }
  };
  
  // Fetch data on mount and when filters change
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  return {
    data,
    loading,
    filters,
    stats,
    updateFilters,
    updateStatus,
    refreshData: fetchData,
  };
};
