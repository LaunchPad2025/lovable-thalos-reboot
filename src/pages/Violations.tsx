
import React from 'react';
import { Button } from '@/components/ui/button';
import PageContainer from '@/components/layout/PageContainer';

const Violations = () => {
  return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)] text-center">
        <h1 className="text-2xl font-semibold mb-2">Failed to load violations</h1>
        <p className="text-muted-foreground mb-6">There was an error loading the violations. Please try again later.</p>
        <Button variant="default" className="bg-blue-500 hover:bg-blue-600">
          Retry
        </Button>
      </div>
    </PageContainer>
  );
};

export default Violations;
