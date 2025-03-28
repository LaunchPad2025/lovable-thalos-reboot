
import React from 'react';
import PageTitle from '@/components/ui/PageTitle';
import { Button } from '@/components/ui/button';
import { DownloadIcon } from 'lucide-react';
import { FeedbackData } from '@/components/feedback/types';
import { exportToCSV } from '../utils/exportUtils';

interface FeedbackHeaderProps {
  feedbackData: FeedbackData | null;
  loading: boolean;
}

const FeedbackHeader: React.FC<FeedbackHeaderProps> = ({ feedbackData, loading }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <PageTitle title="Paulie Feedback Dashboard" />
        <p className="text-muted-foreground mt-1">
          View insights and analytics from user interactions with the AI assistant
        </p>
      </div>
      
      <Button 
        onClick={() => feedbackData && exportToCSV(feedbackData.rawData)} 
        disabled={!feedbackData?.rawData.length || loading}
        className="flex items-center gap-2"
      >
        <DownloadIcon className="h-4 w-4" />
        Export CSV
      </Button>
    </div>
  );
};

export default FeedbackHeader;
