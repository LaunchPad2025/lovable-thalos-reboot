
import React from 'react';
import { TabsContent, Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FeedbackData } from '@/components/feedback/types';
import FeedbackStats from '@/components/feedback/FeedbackStats';
import TopDownvotedTable from '@/components/feedback/TopDownvotedTable';
import CategoryBreakdown from '@/components/feedback/CategoryBreakdown';
import NeedsReviewTable from '@/components/feedback/NeedsReviewTable';
import TrainingDatasetExport from '@/components/feedback/TrainingDatasetExport';

interface FeedbackTabsProps {
  feedbackData: FeedbackData;
  activeTab: string;
  onTabChange: (value: string) => void;
  onRefresh: () => void;
}

const FeedbackTabs: React.FC<FeedbackTabsProps> = ({ 
  feedbackData, 
  activeTab, 
  onTabChange,
  onRefresh
}) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsList className="mb-6">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="downvoted">Top Downvoted</TabsTrigger>
        <TabsTrigger value="categories">Categories</TabsTrigger>
        <TabsTrigger value="review">Needs Review</TabsTrigger>
        <TabsTrigger value="training">Training Dataset</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-6">
        <FeedbackStats feedbackData={feedbackData} />
      </TabsContent>
      
      <TabsContent value="downvoted" className="space-y-6">
        <TopDownvotedTable feedbackData={feedbackData} />
      </TabsContent>
      
      <TabsContent value="categories" className="space-y-6">
        <CategoryBreakdown feedbackData={feedbackData} />
      </TabsContent>
      
      <TabsContent value="review" className="space-y-6">
        <NeedsReviewTable feedbackData={feedbackData} onRefresh={onRefresh} />
      </TabsContent>
      
      <TabsContent value="training" className="space-y-6">
        <TrainingDatasetExport feedbackData={feedbackData} />
      </TabsContent>
    </Tabs>
  );
};

export default FeedbackTabs;
