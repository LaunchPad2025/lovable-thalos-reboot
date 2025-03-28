
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { TrainingReviewItem } from '../../types';

interface ImproveContentProps {
  item: TrainingReviewItem;
  improvedResponse: string;
  setImprovedResponse: (value: string) => void;
}

export const ImproveContent: React.FC<ImproveContentProps> = ({ 
  item, 
  improvedResponse, 
  setImprovedResponse 
}) => {
  return (
    <div className="space-y-4 mt-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Original Response</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap">{item.response}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Improved Response</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Write improved response here..."
            value={improvedResponse}
            onChange={(e) => setImprovedResponse(e.target.value)}
            className="min-h-[200px]"
          />
        </CardContent>
      </Card>
    </div>
  );
};
