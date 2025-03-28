
import { useTrainingFetch } from './useTrainingFetch';
import { useTrainingStats } from './useTrainingStats';
import { useTrainingItemUpdate } from './useTrainingItemUpdate';
import { useTrainingExport } from './useTrainingExport';
import { TrainingFilters } from '../types';

const DEFAULT_FILTERS: TrainingFilters = {
  status: 'pending',
  industry: '',
  regulation: '',
  searchQuery: '',
};

export const useTrainingData = () => {
  const { 
    data, 
    loading, 
    filters, 
    updateFilters, 
    refreshData 
  } = useTrainingFetch(DEFAULT_FILTERS);
  
  const stats = useTrainingStats(data);
  
  const { updating, updateReviewItem } = useTrainingItemUpdate(refreshData);
  
  const { exportData } = useTrainingExport(data);
  
  return {
    data,
    loading,
    filters,
    stats,
    updateFilters,
    updateReviewItem,
    refreshData,
    exportData,
    updating
  };
};
