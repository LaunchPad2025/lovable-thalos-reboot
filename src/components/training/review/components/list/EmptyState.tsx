
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface EmptyStateProps {
  onRefresh: () => Promise<void>;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onRefresh }) => {
  return (
    <Card>
      <CardContent className="p-6 flex justify-center items-center min-h-[400px]">
        <div className="flex flex-col items-center text-center">
          <p className="mb-4 text-lg font-medium">No training data to review</p>
          <p className="text-muted-foreground mb-6 max-w-md">
            No thumbs-down feedback or flagged conversations found that match your current filters.
          </p>
          <Button variant="outline" onClick={onRefresh}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Data
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
