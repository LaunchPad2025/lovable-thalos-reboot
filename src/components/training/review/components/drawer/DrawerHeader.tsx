
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { TrainingReviewItem } from '../../types';
import { format } from 'date-fns';

interface DrawerHeaderProps {
  item: TrainingReviewItem;
}

export const DrawerHeader: React.FC<DrawerHeaderProps> = ({ item }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Badge variant={
          item.status === 'approved' ? 'success' : 
          item.status === 'rejected' ? 'destructive' : 
          item.status === 'rewritten' ? 'warning' : 
          'secondary'
        }>
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Badge>
        <Badge variant="outline">
          {item.industry || 'Unknown Industry'}
        </Badge>
        {item.review_status && (
          <Badge variant="info">
            {item.review_status.replace('_', ' ')}
          </Badge>
        )}
      </div>
      <span className="text-sm text-muted-foreground">
        {format(new Date(item.created_at), 'MMM d, yyyy')}
      </span>
    </div>
  );
};
