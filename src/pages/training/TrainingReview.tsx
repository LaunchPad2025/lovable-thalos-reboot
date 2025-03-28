
import React, { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import PageTitle from '@/components/ui/PageTitle';
import TrainingReviewList from '@/components/training/review/TrainingReviewList';
import TrainingReviewStats from '@/components/training/review/TrainingReviewStats';
import TrainingReviewFilters from '@/components/training/review/TrainingReviewFilters';
import { Button } from '@/components/ui/button';
import { FileJson, FileSpreadsheet } from 'lucide-react';
import { useTrainingData } from '@/components/training/review/hooks/useTrainingData';
import MockDataAlert from '@/components/ui/MockDataAlert';

const TrainingReview = () => {
  const { 
    data, 
    loading, 
    filters, 
    stats, 
    updateFilters, 
    exportData,
    refreshData
  } = useTrainingData();
  
  return (
    <PageContainer>
      <div className="space-y-6">
        <MockDataAlert featureName="Training Review Dashboard" />
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <PageTitle 
            title="Paulie Training Review" 
            subtitle="Review and moderate Paulie responses for fine-tuning"
          />
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              onClick={() => exportData('csv')}
              className="flex items-center gap-2"
            >
              <FileSpreadsheet className="h-4 w-4" />
              Export CSV
            </Button>
            <Button 
              onClick={() => exportData('json')}
              className="flex items-center gap-2"
            >
              <FileJson className="h-4 w-4" />
              Export JSON
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <TrainingReviewStats stats={stats} />
            <div className="mt-6">
              <TrainingReviewFilters 
                filters={filters} 
                updateFilters={updateFilters} 
              />
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <TrainingReviewList 
              data={data} 
              loading={loading} 
              onRefresh={refreshData}
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default TrainingReview;
