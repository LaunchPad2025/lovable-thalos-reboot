
import React from 'react';
import { Button } from '@/components/ui/button';

export type FilterType = 'all' | 'feature' | 'improvement' | 'bug';

interface UpdatesFilterProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const UpdatesFilter = ({ activeFilter, onFilterChange }: UpdatesFilterProps) => {
  return (
    <div className="space-x-2">
      <Button 
        variant={activeFilter === 'all' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => onFilterChange('all')}
      >
        All Updates
      </Button>
      <Button 
        variant={activeFilter === 'feature' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => onFilterChange('feature')}
      >
        Features
      </Button>
      <Button 
        variant={activeFilter === 'improvement' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => onFilterChange('improvement')}
      >
        Improvements
      </Button>
      <Button 
        variant={activeFilter === 'bug' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => onFilterChange('bug')}
      >
        Bug Fixes
      </Button>
    </div>
  );
};

export default UpdatesFilter;
