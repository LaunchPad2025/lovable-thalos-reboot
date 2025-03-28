
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Pencil, X, CheckCircle2 } from 'lucide-react';

interface ReviewActionsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onApprove: () => Promise<void>;
  onReject: () => Promise<void>;
  onRewrite: () => Promise<void>;
  updating: boolean;
  rejectionReason: string;
  improvedResponse: string;
}

export const ReviewActions: React.FC<ReviewActionsProps> = ({
  activeTab,
  setActiveTab,
  onApprove,
  onReject,
  onRewrite,
  updating,
  rejectionReason,
  improvedResponse
}) => {
  if (activeTab === 'review') {
    return (
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={() => setActiveTab('reject')}>
          <X className="mr-2 h-4 w-4" />
          Reject
        </Button>
        <Button variant="outline" onClick={() => setActiveTab('improve')}>
          <Pencil className="mr-2 h-4 w-4" />
          Rewrite
        </Button>
        <Button onClick={onApprove} disabled={updating}>
          <Check className="mr-2 h-4 w-4" />
          Approve
        </Button>
      </div>
    );
  }

  if (activeTab === 'improve') {
    return (
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={() => setActiveTab('review')}>
          Cancel
        </Button>
        <Button 
          onClick={onRewrite} 
          disabled={updating || !improvedResponse}
        >
          <CheckCircle2 className="mr-2 h-4 w-4" />
          Save Rewrite
        </Button>
      </div>
    );
  }

  if (activeTab === 'reject') {
    return (
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={() => setActiveTab('review')}>
          Cancel
        </Button>
        <Button 
          variant="destructive" 
          onClick={onReject} 
          disabled={updating || !rejectionReason}
        >
          <X className="mr-2 h-4 w-4" />
          Confirm Rejection
        </Button>
      </div>
    );
  }

  return null;
};
