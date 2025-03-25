
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Clock } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';

const Documents = () => {
  return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <FileText className="h-12 w-12 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Documents Coming Soon</h1>
        <p className="text-muted-foreground max-w-md mb-8">
          Access, upload, and manage all your safety documentation in one centralized location.
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

export default Documents;
