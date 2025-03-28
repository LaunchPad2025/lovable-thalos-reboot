
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { Card, CardContent } from '@/components/ui/card';
import { useRegulations } from '@/hooks/useRegulations';
import { Button } from '@/components/ui/button';

const Regulations = () => {
  const { data, isLoading, error } = useRegulations();

  return (
    <PageContainer 
      title="Regulations & Compliance"
      subtitle="Access and manage safety regulations relevant to your industry."
    >
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            {isLoading ? (
              <div className="text-center py-12">
                <p>Loading regulations...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500">Error loading regulations</p>
                <Button variant="outline" className="mt-4">
                  Retry
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <p>Regulations data loaded successfully.</p>
                <p>Total regulations: {Array.isArray(data) ? data.length : 0}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default Regulations;
