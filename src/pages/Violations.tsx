
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';

const Violations = () => {
  return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <AlertTriangle className="h-12 w-12 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Violations Coming Soon</h1>
        <p className="text-muted-foreground max-w-md mb-8">
          Detect, track, and resolve safety violations with AI-powered analysis and recommendations.
        </p>
        <div className="flex justify-center space-x-4">
          <Button variant="outline" onClick={() => window.history.back()}>
            Go Back
          </Button>
          <Button onClick={() => window.location.href = '/dashboard'}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default Violations;
