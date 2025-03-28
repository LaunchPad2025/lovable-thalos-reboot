
import React from 'react';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown, X, AlertCircle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Message } from '../types';

interface FeedbackButtonsProps {
  messageId: string;
  messages: Message[];
  feedbackSubmitted: Record<string, boolean>;
  showFeedbackForm: boolean;
  currentMessageId: string | null;
  feedbackNotes: string;
  isSubmitting?: boolean;
  error?: string | null;
  onFeedbackClick: (messageId: string, wasHelpful: boolean, messages: Message[]) => void;
  onNotesChange: (notes: string) => void;
  onSubmitNotes: (messages: Message[]) => void;
  onCancelFeedback: () => void;
}

const FeedbackButtons: React.FC<FeedbackButtonsProps> = ({
  messageId,
  messages,
  feedbackSubmitted,
  showFeedbackForm,
  currentMessageId,
  feedbackNotes,
  isSubmitting = false,
  error = null,
  onFeedbackClick,
  onNotesChange,
  onSubmitNotes,
  onCancelFeedback
}) => {
  // If feedback has already been submitted for this message
  if (feedbackSubmitted[messageId]) {
    return (
      <div className="text-xs text-gray-500 mt-2">
        Thank you for your feedback!
      </div>
    );
  }
  
  // If feedback form is showing for this message
  if (showFeedbackForm && currentMessageId === messageId) {
    return (
      <div className="mt-3 space-y-2">
        <div className="text-sm text-gray-200">
          What information was missing or incorrect?
        </div>
        <Textarea
          value={feedbackNotes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Please provide details to help us improve..."
          className="min-h-[100px] bg-gray-800 border-gray-700 text-sm"
          disabled={isSubmitting}
        />
        
        {error && (
          <div className="flex items-center text-red-400 text-xs gap-1 mt-1">
            <AlertCircle className="h-3 w-3" />
            <span>{error}</span>
          </div>
        )}
        
        <div className="flex space-x-2">
          <Button
            size="sm"
            onClick={() => onSubmitNotes(messages)}
            className="bg-blue-600 hover:bg-blue-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onCancelFeedback}
            className="border-gray-700 text-gray-300"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }
  
  // Default feedback buttons
  return (
    <div className="flex items-center mt-2 space-x-2 text-xs text-gray-400">
      <span>Was this helpful?</span>
      <Button
        size="sm"
        variant="ghost"
        className="h-7 w-7 p-0 rounded-full"
        onClick={() => onFeedbackClick(messageId, true, messages)}
        disabled={isSubmitting}
      >
        <ThumbsUp className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        className="h-7 w-7 p-0 rounded-full"
        onClick={() => onFeedbackClick(messageId, false, messages)}
        disabled={isSubmitting}
      >
        <ThumbsDown className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default FeedbackButtons;
