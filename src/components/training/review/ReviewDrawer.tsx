
import React, { useState } from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription,
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';
import { CheckCircle, XCircle, Pencil, CheckCircle2, Clock } from 'lucide-react';
import { useTrainingData } from './hooks/useTrainingData';
import { TrainingReviewItem, REJECTION_REASONS } from './types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
  const [activeTab, setActiveTab] = useState('review');
  const [improvedResponse, setImprovedResponse] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { updateReviewItem } = useTrainingData();

  // Reset form state when item changes
  React.useEffect(() => {
    if (item) {
      setImprovedResponse(item.improved_response || '');
      setRejectionReason('');
    }
  }, [item]);

  if (!item) return null;

  // Handle approve action
  const handleApprove = async () => {
    setIsSubmitting(true);
    try {
      const success = await updateReviewItem(item.id, 'approved');
      if (success) {
        onClose();
        await onRefresh();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle reject action
  const handleReject = async () => {
    if (!rejectionReason) {
      alert('Please select a rejection reason');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const success = await updateReviewItem(item.id, 'rejected', undefined, rejectionReason);
      if (success) {
        onClose();
        await onRefresh();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle rewrite action
  const handleRewrite = async () => {
    if (!improvedResponse) {
      alert('Please provide an improved response');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const success = await updateReviewItem(item.id, 'rewritten', improvedResponse);
      if (success) {
        onClose();
        await onRefresh();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={!!item} onOpenChange={open => !open && onClose()}>
      <SheetContent className="sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl">Review Training Item</SheetTitle>
          <SheetDescription>
            Review and provide feedback on Paulie's response
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant={
                item.status === 'approved' ? 'success' : 
                item.status === 'rejected' ? 'destructive' : 
                item.status === 'rewritten' ? 'warning' : 
                'secondary'
              }>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </Badge>
              <Badge variant="outline">
                {item.industry || 'Unknown Industry'}
              </Badge>
              {item.review_status && (
                <Badge variant="info">
                  {item.review_status.replace('_', ' ')}
                </Badge>
              )}
            </div>
            <span className="text-sm text-muted-foreground">
              {format(new Date(item.created_at), 'MMM d, yyyy')}
            </span>
          </div>

          <Tabs defaultValue="review" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="review">Review</TabsTrigger>
              <TabsTrigger value="improve">Improve</TabsTrigger>
              <TabsTrigger value="reject">Reject</TabsTrigger>
            </TabsList>
            
            <TabsContent value="review" className="space-y-4 mt-4">
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

              <div className="flex justify-end gap-2">
                <Button variant="secondary" onClick={() => setActiveTab('reject')}>
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject
                </Button>
                <Button variant="outline" onClick={() => setActiveTab('improve')}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Rewrite
                </Button>
                <Button onClick={handleApprove} disabled={isSubmitting}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="improve" className="space-y-4 mt-4">
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
              
              <div className="flex justify-end gap-2">
                <Button variant="secondary" onClick={() => setActiveTab('review')}>
                  Cancel
                </Button>
                <Button onClick={handleRewrite} disabled={isSubmitting}>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Save Rewrite
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="reject" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Rejection Reason</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select
                    value={rejectionReason}
                    onValueChange={setRejectionReason}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a reason" />
                    </SelectTrigger>
                    <SelectContent>
                      {REJECTION_REASONS.map((reason) => (
                        <SelectItem key={reason.value} value={reason.value}>
                          {reason.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
              
              <div className="flex justify-end gap-2">
                <Button variant="secondary" onClick={() => setActiveTab('review')}>
                  Cancel
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleReject} 
                  disabled={isSubmitting || !rejectionReason}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Confirm Rejection
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <SheetFooter className="mt-4">
          <SheetClose asChild>
            <Button variant="outline" onClick={onClose}>Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
