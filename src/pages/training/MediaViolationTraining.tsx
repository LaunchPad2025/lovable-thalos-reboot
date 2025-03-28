
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MediaViolationTrainingList from '@/components/training/media-violations/MediaViolationTrainingList';

const MediaViolationTrainingPage = () => {
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Media Violation Training</h1>
        <p className="text-gray-400">Manage and review media safety violation training dataset</p>
      </div>
      
      <Tabs defaultValue="dataset">
        <TabsList className="mb-6">
          <TabsTrigger value="dataset">Training Dataset</TabsTrigger>
          <TabsTrigger value="models" disabled>AI Models</TabsTrigger>
          <TabsTrigger value="testing" disabled>Testing & Evaluation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dataset">
          <MediaViolationTrainingList />
        </TabsContent>
        
        <TabsContent value="models">
          <div className="text-center py-12 text-gray-500">
            AI model management functionality coming soon
          </div>
        </TabsContent>
        
        <TabsContent value="testing">
          <div className="text-center py-12 text-gray-500">
            Model testing and evaluation functionality coming soon
          </div>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default MediaViolationTrainingPage;
