
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTrainingData } from './hooks/useTrainingData';
import { TrainingReviewItem } from './types';
import {
  DrawerHeader,
  ReviewContent,
  ImproveContent,
  RejectContent,
  ReviewActions
} from './components/drawer';

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
  
  const { updateReviewItem, updating } = useTrainingData();

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
    const success = await updateReviewItem(item.id, 'approved');
    if (success) {
      onClose();
      await onRefresh();
    }
  };

  // Handle reject action
  const handleReject = async () => {
    if (!rejectionReason) {
      alert('Please select a rejection reason');
      return;
    }
    
    const success = await updateReviewItem(item.id, 'rejected', undefined, rejectionReason);
    if (success) {
      onClose();
      await onRefresh();
    }
  };

  // Handle rewrite action
  const handleRewrite = async () => {
    if (!improvedResponse) {
      alert('Please provide an improved response');
      return;
    }
    
    const success = await updateReviewItem(item.id, 'rewritten', improvedResponse);
    if (success) {
      onClose();
      await onRefresh();
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
          <DrawerHeader item={item} />

          <Tabs defaultValue="review" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="review">Review</TabsTrigger>
              <TabsTrigger value="improve">Improve</TabsTrigger>
              <TabsTrigger value="reject">Reject</TabsTrigger>
            </TabsList>
            
            <TabsContent value="review">
              <ReviewContent item={item} />
              <div className="mt-4">
                <ReviewActions 
                  activeTab="review"
                  setActiveTab={setActiveTab}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  onRewrite={handleRewrite}
                  updating={updating}
                  rejectionReason={rejectionReason}
                  improvedResponse={improvedResponse}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="improve">
              <ImproveContent 
                item={item}
                improvedResponse={improvedResponse}
                setImprovedResponse={setImprovedResponse}
              />
              <div className="mt-4">
                <ReviewActions 
                  activeTab="improve"
                  setActiveTab={setActiveTab}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  onRewrite={handleRewrite}
                  updating={updating}
                  rejectionReason={rejectionReason}
                  improvedResponse={improvedResponse}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="reject">
              <RejectContent 
                rejectionReason={rejectionReason}
                setRejectionReason={setRejectionReason}
              />
              <div className="mt-4">
                <ReviewActions 
                  activeTab="reject"
                  setActiveTab={setActiveTab}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  onRewrite={handleRewrite}
                  updating={updating}
                  rejectionReason={rejectionReason}
                  improvedResponse={improvedResponse}
                />
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
