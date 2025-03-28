
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RefreshCw } from 'lucide-react';

export const LoadingState: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-6 flex justify-center items-center min-h-[400px]">
        <div className="flex flex-col items-center">
          <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="mt-4 text-muted-foreground">Loading training data...</p>
        </div>
      </CardContent>
    </Card>
  );
};
