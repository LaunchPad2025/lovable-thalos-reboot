
import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Check, X, Edit } from 'lucide-react';
import { TrainingReviewItem, REJECTION_REASONS } from './types';
import { useTrainingData } from './hooks/useTrainingData';

interface ReviewDrawerProps {
  item: TrainingReviewItem | null;
  onClose: () => void;
  onRefresh: () => Promise<void>;
}

export const ReviewDrawer: React.FC<ReviewDrawerProps> = ({ 
  item, 
  onClose,
  onRefresh
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rewrittenResponse, setRewrittenResponse] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [viewMode, setViewMode] = useState<'review' | 'rewrite'>('review');
  const { updateReviewItem } = useTrainingData();
  
  // Reset state when item changes
  React.useEffect(() => {
    if (item) {
      setRewrittenResponse(item.improved_response || '');
      setRejectionReason('');
      setViewMode('review');
    }
  }, [item]);
  
  const handleApprove = async () => {
    if (!item) return;
    
    setIsSubmitting(true);
    try {
      await updateReviewItem(item.id, 'approved');
      await onRefresh();
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleReject = async () => {
    if (!item || !rejectionReason) return;
    
    setIsSubmitting(true);
    try {
      await updateReviewItem(item.id, 'rejected', undefined, rejectionReason);
      await onRefresh();
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleSubmitRewrite = async () => {
    if (!item || !rewrittenResponse.trim()) return;
    
    setIsSubmitting(true);
    try {
      await updateReviewItem(item.id, 'rewritten', rewrittenResponse);
      await onRefresh();
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!item) return null;
  
  return (
    <Sheet open={!!item} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="sm:max-w-xl md:max-w-2xl overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle>Review Training Data</SheetTitle>
          <SheetDescription>
            Review, approve, reject, or rewrite this response for AI training
          </SheetDescription>
        </SheetHeader>
        
        {viewMode === 'review' ? (
          // Review Mode
          <div className="space-y-6">
            {/* Metadata */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline">
                {format(new Date(item.created_at), 'MMM d, yyyy')}
              </Badge>
              {item.industry && (
                <Badge variant="secondary">{item.industry}</Badge>
              )}
              {item.matched_regulation && (
                <Badge>{item.matched_regulation}</Badge>
              )}
              {item.matched_keywords && item.matched_keywords.length > 0 && (
                <Badge variant="outline">
                  Keywords: {item.matched_keywords.slice(0, 3).join(', ')}
                  {item.matched_keywords.length > 3 ? '...' : ''}
                </Badge>
              )}
            </div>
            
            {/* User Question */}
            <div>
              <h3 className="text-sm font-medium mb-2">User Question</h3>
              <Card>
                <CardContent className="p-4">
                  <p className="whitespace-pre-wrap">{item.question}</p>
                </CardContent>
              </Card>
            </div>
            
            {/* Paulie's Response */}
            <div>
              <h3 className="text-sm font-medium mb-2">Paulie's Response</h3>
              <Card>
                <CardContent className="p-4">
                  <p className="whitespace-pre-wrap">{item.response}</p>
                </CardContent>
              </Card>
            </div>
            
            {/* User Feedback */}
            {item.feedback && (
              <div>
                <h3 className="text-sm font-medium mb-2">User Feedback</h3>
                <Card>
                  <CardContent className="p-4">
                    <p className="whitespace-pre-wrap text-muted-foreground">
                      {item.feedback}
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <Button 
                variant="default" 
                className="flex-1"
                onClick={handleApprove}
                disabled={isSubmitting}
              >
                <Check className="mr-2 h-4 w-4" />
                Approve
              </Button>
              
              <Button 
                variant="destructive" 
                className="flex-1"
                onClick={handleReject}
                disabled={isSubmitting || !rejectionReason}
              >
                <X className="mr-2 h-4 w-4" />
                Reject
              </Button>
              
              <Button 
                variant="secondary" 
                className="flex-1"
                onClick={() => setViewMode('rewrite')}
                disabled={isSubmitting}
              >
                <Edit className="mr-2 h-4 w-4" />
                Rewrite
              </Button>
            </div>
            
            {/* Rejection Reason Select */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Rejection Reason (required to reject)
              </label>
              <Select 
                value={rejectionReason} 
                onValueChange={setRejectionReason}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a reason for rejection" />
                </SelectTrigger>
                <SelectContent>
                  {REJECTION_REASONS.map(reason => (
                    <SelectItem key={reason.value} value={reason.value}>
                      {reason.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        ) : (
          // Rewrite Mode
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">User Question</h3>
              <Card>
                <CardContent className="p-4">
                  <p className="whitespace-pre-wrap">{item.question}</p>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Original Response</h3>
              <Card>
                <CardContent className="p-4">
                  <p className="whitespace-pre-wrap text-muted-foreground">
                    {item.response}
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Improved Response</h3>
              <Textarea 
                value={rewrittenResponse} 
                onChange={(e) => setRewrittenResponse(e.target.value)}
                placeholder="Write an improved response here..."
                className="min-h-[200px]"
              />
            </div>
            
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setViewMode('review')}
                disabled={isSubmitting}
              >
                Back to Review
              </Button>
              
              <Button 
                variant="default" 
                className="flex-1"
                onClick={handleSubmitRewrite}
                disabled={isSubmitting || !rewrittenResponse.trim()}
              >
                Submit Rewrite
              </Button>
            </div>
          </div>
        )}
        
        <SheetFooter className="mt-6">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
