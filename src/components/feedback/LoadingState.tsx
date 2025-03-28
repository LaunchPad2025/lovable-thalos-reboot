
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const LoadingState: React.FC = () => {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map(i => (
          <Card key={i}>
            <CardContent className="pt-6">
              <Skeleton className="h-8 w-[120px] mb-2" />
              <Skeleton className="h-4 w-[180px]" />
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="mt-6">
        <CardContent className="pt-6">
          <Skeleton className="h-6 w-[200px] mb-4" />
          <Skeleton className="h-[300px] w-full rounded-md" />
        </CardContent>
      </Card>
    </>
  );
};

export default LoadingState;
