
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { format } from 'date-fns';
import { FeedbackData } from './types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface NeedsReviewTableProps {
  feedbackData: FeedbackData;
  onRefresh: () => void;
}

const NeedsReviewTable: React.FC<NeedsReviewTableProps> = ({ feedbackData, onRefresh }) => {
  const { needsReview } = feedbackData;
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  
  const updateFeedbackStatus = async (id: string, status: 'improved' | 'escalated') => {
    setLoading(prev => ({ ...prev, [id]: true }));
    
    try {
      const { error } = await supabase
        .from('paulie_queries')
        .update({ review_status: status })
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success(`Feedback marked as ${status}`);
      onRefresh();
    } catch (err) {
      console.error('Error updating feedback status:', err);
      toast.error('Failed to update feedback status');
    } finally {
      setLoading(prev => ({ ...prev, [id]: false }));
    }
  };
  
  const updateReviewLabel = async (id: string, label: 'unclear' | 'incomplete' | 'off_topic') => {
    try {
      const { error } = await supabase
        .from('paulie_queries')
        .update({ review_label: label })
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success(`Label updated`);
      onRefresh();
    } catch (err) {
      console.error('Error updating review label:', err);
      toast.error('Failed to update label');
    }
  };
  
  const generatePromptSuggestion = (item: any) => {
    // Logic to suggest improvements based on feedback
    if (item.review_label === 'unclear') {
      return "Add more specific language and detailed explanations";
    } else if (item.review_label === 'incomplete') {
      return "Include more comprehensive information and relevant citations";
    } else if (item.review_label === 'off_topic') {
      return "Improve topic detection and relevance matching";
    } else if (item.matched_keywords?.length) {
      return `Focus on keywords: ${item.matched_keywords.join(', ')}`;
    } else {
      return "Improve response clarity and add specific regulatory references";
    }
  };
  
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Needs Review</CardTitle>
      </CardHeader>
      <CardContent>
        {needsReview.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">
            No queries marked for review
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead className="w-[250px]">Question</TableHead>
                <TableHead className="w-[300px]">Response</TableHead>
                <TableHead>Issue Type</TableHead>
                <TableHead>Suggestion</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {needsReview.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="whitespace-nowrap">
                    {format(new Date(item.created_at), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell className="max-w-[250px] truncate">
                    {item.question}
                  </TableCell>
                  <TableCell className="max-w-[300px]">
                    <div className="line-clamp-2">{item.response}</div>
                  </TableCell>
                  <TableCell>
                    <Select 
                      defaultValue={item.review_label || ''} 
                      onValueChange={(value) => 
                        updateReviewLabel(item.id, value as 'unclear' | 'incomplete' | 'off_topic')
                      }
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Select issue" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unclear">Unclear</SelectItem>
                        <SelectItem value="incomplete">Incomplete</SelectItem>
                        <SelectItem value="off_topic">Off-topic</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs">
                      {generatePromptSuggestion(item)}
                    </div>
                    {item.matched_keywords && item.matched_keywords.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {item.matched_keywords.map((keyword, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="default" 
                        className="h-8" 
                        disabled={loading[item.id]} 
                        onClick={() => updateFeedbackStatus(item.id, 'improved')}
                      >
                        Improved
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        className="h-8" 
                        disabled={loading[item.id]} 
                        onClick={() => updateFeedbackStatus(item.id, 'escalated')}
                      >
                        Escalate
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default NeedsReviewTable;
