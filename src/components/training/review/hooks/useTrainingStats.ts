
import { useMemo } from 'react';
import { TrainingReviewItem, TrainingStats } from '../types';

export const useTrainingStats = (data: TrainingReviewItem[]) => {
  const stats = useMemo(() => {
    const newStats: TrainingStats = {
      total: data.length,
      pending: data.filter(item => item.status === 'pending').length,
      approved: data.filter(item => item.status === 'approved').length,
      rejected: data.filter(item => item.status === 'rejected').length,
      rewritten: data.filter(item => item.status === 'rewritten').length,
      byIndustry: [],
      byRegulation: []
    };
    
    // Calculate industry stats
    const industryMap = new Map<string, number>();
    data.forEach(item => {
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
    data.forEach(item => {
      if (item.matched_regulation) {
        const count = regulationMap.get(item.matched_regulation) || 0;
        regulationMap.set(item.matched_regulation, count + 1);
      }
    });
    newStats.byRegulation = Array.from(regulationMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    
    return newStats;
  }, [data]);
  
  return stats;
};
