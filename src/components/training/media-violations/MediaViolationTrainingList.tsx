
import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MediaViolationTraining } from './types';
import { useMediaViolationTraining } from './hooks/useMediaViolationTraining';
import MediaViolationStats from './MediaViolationStats';
import MediaViolationFilters from './MediaViolationFilters';
import MediaViolationTable from './MediaViolationTable';
import MediaViolationDrawer from './MediaViolationDrawer';

const MediaViolationTrainingList: React.FC = () => {
  const {
    data,
    loading,
    filters,
    stats,
    updateFilters,
    updateStatus,
    refreshData,
  } = useMediaViolationTraining();
  
  const [selectedItem, setSelectedItem] = useState<MediaViolationTraining | null>(null);
  
  // Extract unique industries and categories for filter dropdowns
  const industries = useMemo(() => {
    const uniqueIndustries = new Set(data.map(item => item.industry));
    return Array.from(uniqueIndustries).sort();
  }, [data]);
  
  const categories = useMemo(() => {
    const uniqueCategories = new Set(data.map(item => item.category));
    return Array.from(uniqueCategories).sort();
  }, [data]);
  
  // Handle status update
  const handleUpdateStatus = async (id: string, status: 'needs_review' | 'ready' | 'approved') => {
    const success = await updateStatus(id, status);
    if (success && selectedItem && selectedItem.id === id) {
      setSelectedItem(prev => prev ? { ...prev, status } : null);
    }
    return success;
  };

  return (
    <div>
      <MediaViolationStats 
        total={stats.total}
        needsReview={stats.needsReview}
        ready={stats.ready}
        approved={stats.approved}
        byIndustry={stats.byIndustry}
        byCategory={stats.byCategory}
        byRiskLevel={stats.byRiskLevel}
      />
      
      <MediaViolationFilters 
        filters={filters}
        onFilterChange={updateFilters}
        onRefresh={refreshData}
        loading={loading}
        industries={industries}
        categories={categories}
      />
      
      <Card>
        <CardContent className="p-0">
          <MediaViolationTable 
            data={data}
            onSelectItem={setSelectedItem}
            onUpdateStatus={handleUpdateStatus}
          />
        </CardContent>
      </Card>
      
      <MediaViolationDrawer 
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};

export default MediaViolationTrainingList;
