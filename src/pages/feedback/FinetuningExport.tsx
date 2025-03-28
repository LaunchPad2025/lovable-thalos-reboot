
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import TrainingDataExport from '@/components/feedback/TrainingDataExport';
import { Card, CardContent } from '@/components/ui/card';
import { PageTitle } from '@/components/ui/PageTitle';

const FinetuningExport = () => {
  return (
    <PageContainer>
      <div className="space-y-6">
        <PageTitle 
          title="Paulie Training Data Export" 
          description="Export feedback data for fine-tuning Paulie's responses"
        />
        
        <TrainingDataExport />
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-2">About Fine-tuning Data</h3>
            <p className="text-muted-foreground mb-4">
              This page allows you to export feedback data from user interactions with Paulie where:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>Users gave a thumbs-down response</li>
              <li>Users provided feedback notes on how to improve</li>
              <li>Responses were flagged for review</li>
            </ul>
            
            <div className="mt-4 p-3 bg-yellow-950/20 border border-yellow-900/30 rounded-md">
              <h4 className="text-yellow-500 font-medium">Important</h4>
              <p className="text-sm text-muted-foreground">
                Exported data should be reviewed before using for fine-tuning. Check for any sensitive information and ensure the feedback is constructive and relevant.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default FinetuningExport;
