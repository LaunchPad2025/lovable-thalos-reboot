
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TrainingFilters } from './types';

interface TrainingReviewFiltersProps {
  filters: TrainingFilters;
  updateFilters: (filters: Partial<TrainingFilters>) => void;
}

const TrainingReviewFilters: React.FC<TrainingReviewFiltersProps> = ({
  filters,
  updateFilters,
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Filter Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1 block">
            Search
          </label>
          <Input
            placeholder="Search in questions or responses..."
            value={filters.searchQuery}
            onChange={(e) => updateFilters({ searchQuery: e.target.value })}
          />
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">
            Status
          </label>
          <Select 
            value={filters.status} 
            onValueChange={(value) => updateFilters({ 
              status: value as TrainingFilters['status'] 
            })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="rewritten">Rewritten</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">
            Industry
          </label>
          <Input
            placeholder="Filter by industry..."
            value={filters.industry}
            onChange={(e) => updateFilters({ industry: e.target.value })}
          />
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">
            Regulation
          </label>
          <Input
            placeholder="Filter by regulation code..."
            value={filters.regulation}
            onChange={(e) => updateFilters({ regulation: e.target.value })}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainingReviewFilters;
