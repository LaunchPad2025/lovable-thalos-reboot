
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrainingReviewItem } from '../../types';
import { format } from 'date-fns';

interface ReviewContentProps {
  item: TrainingReviewItem;
}

export const ReviewContent: React.FC<ReviewContentProps> = ({ item }) => {
  return (
    <div className="space-y-4 mt-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">User Question</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap">{item.question}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Paulie's Response</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap">{item.response}</p>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Regulation</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{item.matched_regulation || 'None detected'}</p>
            {item.matched_keywords && item.matched_keywords.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-muted-foreground mb-1">Keywords:</p>
                <div className="flex flex-wrap gap-1">
                  {item.matched_keywords.map((keyword, i) => (
                    <Badge variant="outline" key={i} className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">User Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{item.feedback || 'No feedback provided'}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
