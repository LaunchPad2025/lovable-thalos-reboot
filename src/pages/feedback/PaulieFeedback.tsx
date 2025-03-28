
import React, { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import MockDataAlert from '@/components/ui/MockDataAlert';
import { Card, CardContent } from '@/components/ui/card';
import { useFeedbackData } from './hooks/useFeedbackData';
import FeedbackHeader from './components/FeedbackHeader';
import FeedbackTabs from './components/FeedbackTabs';
import LoadingState from '@/components/feedback/LoadingState';

const PaulieFeedback = () => {
  const { feedbackData, loading, error, fetchFeedbackData } = useFeedbackData();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <PageContainer>
      <div className="space-y-6">
        <MockDataAlert featureName="Paulie Feedback Dashboard" />
        
        <FeedbackHeader 
          feedbackData={feedbackData} 
          loading={loading} 
        />

        {loading ? (
          <LoadingState />
        ) : error ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-red-500">{error}</div>
            </CardContent>
          </Card>
        ) : feedbackData && (
          <FeedbackTabs 
            feedbackData={feedbackData}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onRefresh={fetchFeedbackData}
          />
        )}
      </div>
    </PageContainer>
  );
};

export default PaulieFeedback;
