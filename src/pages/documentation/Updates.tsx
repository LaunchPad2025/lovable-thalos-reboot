
import React, { useState, useCallback, useMemo } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import PageTitle from '@/components/ui/PageTitle';
import { Button } from '@/components/ui/button';
import MonthUpdates from '@/components/documentation/updates/MonthUpdates';
import UpdatesFilter, { FilterType } from '@/components/documentation/updates/UpdatesFilter';
import { updatesData } from '@/data/updatesData';

const Updates = () => {
  const [filter, setFilter] = useState<FilterType>('all');
  const [visibleMonths, setVisibleMonths] = useState(3);

  const handleFilterChange = useCallback((newFilter: FilterType) => {
    setFilter(newFilter);
  }, []);

  const filteredUpdates = useMemo(() => {
    if (filter === 'all') {
      return updatesData;
    }
    
    return updatesData.map(monthData => ({
      month: monthData.month,
      updates: monthData.updates.filter(update => update.type === filter)
    })).filter(monthData => monthData.updates.length > 0);
  }, [filter]);

  const displayedUpdates = useMemo(() => {
    return filteredUpdates.slice(0, visibleMonths);
  }, [filteredUpdates, visibleMonths]);

  const handleLoadMore = useCallback(() => {
    setVisibleMonths(prev => prev + 3);
  }, []);

  const hasMoreUpdates = visibleMonths < filteredUpdates.length;

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        <PageTitle 
          title="Product Updates" 
          subtitle="Stay up to date with the latest improvements to Thalos"
          className="mb-8"
        />
        
        <div className="flex justify-between items-center mb-8">
          <UpdatesFilter activeFilter={filter} onFilterChange={handleFilterChange} />
          <Button>Subscribe to Updates</Button>
        </div>

        <div className="space-y-12">
          {displayedUpdates.map((monthData, index) => (
            <MonthUpdates 
              key={index}
              month={monthData.month}
              updates={monthData.updates}
            />
          ))}
        </div>
        
        {hasMoreUpdates && (
          <div className="mt-16 text-center">
            <Button variant="outline" onClick={handleLoadMore}>Load More Updates</Button>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default Updates;
