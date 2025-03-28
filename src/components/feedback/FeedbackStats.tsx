
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ThumbsUp, ThumbsDown, MessageSquare, BarChart2 } from 'lucide-react';
import { FeedbackData } from './types';

interface FeedbackStatsProps {
  feedbackData: FeedbackData;
}

const FeedbackStats: React.FC<FeedbackStatsProps> = ({ feedbackData }) => {
  const { totalQueries, upvotes, downvotes } = feedbackData;
  
  const upvotePercentage = totalQueries > 0 
    ? Math.round((upvotes / totalQueries) * 100) 
    : 0;
  
  const downvotePercentage = totalQueries > 0 
    ? Math.round((downvotes / totalQueries) * 100) 
    : 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Queries</CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalQueries}</div>
          <p className="text-xs text-muted-foreground">
            Total interactions with Paulie
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Helpful Responses</CardTitle>
          <ThumbsUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-500">{upvotes}</div>
          <div className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mr-2">
              <div 
                className="bg-green-500 h-2.5 rounded-full" 
                style={{ width: `${upvotePercentage}%` }}
              ></div>
            </div>
            <span className="text-xs text-muted-foreground">{upvotePercentage}%</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Unhelpful Responses</CardTitle>
          <ThumbsDown className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-500">{downvotes}</div>
          <div className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mr-2">
              <div 
                className="bg-red-500 h-2.5 rounded-full" 
                style={{ width: `${downvotePercentage}%` }}
              ></div>
            </div>
            <span className="text-xs text-muted-foreground">{downvotePercentage}%</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Satisfaction Rate</CardTitle>
          <BarChart2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {upvotePercentage}%
          </div>
          <p className="text-xs text-muted-foreground">
            {downvotes > 0 ? `${downvotes} responses need improvement` : 'No negative feedback yet'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackStats;
