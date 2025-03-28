
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface ReviewTableActionsProps {
  itemCount: number;
  onRefresh: () => Promise<void>;
}

export const ReviewTableActions: React.FC<ReviewTableActionsProps> = ({ 
  itemCount, 
  onRefresh 
}) => {
  return (
    <div className="py-4 px-6 flex justify-between items-center border-t">
      <div className="text-sm text-muted-foreground">
        Showing {itemCount} items
      </div>
      <Button variant="outline" size="sm" onClick={onRefresh}>
        <RefreshCw className="mr-2 h-4 w-4" />
        Refresh
      </Button>
    </div>
  );
};
