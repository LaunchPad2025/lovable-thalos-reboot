
import { useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { Message } from '../../types';
import { toast } from 'sonner';

export const useChatFeedback = () => {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<Record<string, boolean>>({});
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [currentMessageId, setCurrentMessageId] = useState<string | null>(null);
  const [feedbackNotes, setFeedbackNotes] = useState('');

  // Track when a user clicks on thumbs up or down
  const handleFeedbackClick = useCallback(
    async (messageId: string, wasHelpful: boolean, messages: Message[]) => {
      try {
        // Find the AI message and the user message that preceded it
        const assistantMessageIndex = messages.findIndex(
          (m) => m.id === messageId && m.role === 'assistant'
        );

        if (assistantMessageIndex === -1) {
          throw new Error('Could not find associated message');
        }

        const assistantMessage = messages[assistantMessageIndex];
        const userMessageIndex = assistantMessageIndex - 1 >= 0 ? assistantMessageIndex - 1 : null;
        const userMessage = userMessageIndex !== null ? messages[userMessageIndex] : null;

        if (!userMessage || userMessage.role !== 'user') {
          throw new Error('Could not find preceding user message');
        }

        // If it's a downvote, show the feedback form for additional notes
        if (!wasHelpful) {
          setCurrentMessageId(messageId);
          setShowFeedbackForm(true);
          setFeedbackNotes('');
        } else {
          // Submit positive feedback immediately
          await submitFeedback(
            messageId,
            userMessage.content,
            assistantMessage.content,
            wasHelpful,
            '',
            messages
          );
        }
      } catch (error) {
        console.error('Error handling feedback click:', error);
        toast.error('Failed to submit feedback');
      }
    },
    []
  );

  // Submit feedback with notes (for negative feedback)
  const submitFeedbackWithNotes = useCallback(
    async (messages: Message[]) => {
      if (!currentMessageId) return;

      try {
        const assistantMessageIndex = messages.findIndex(
          (m) => m.id === currentMessageId && m.role === 'assistant'
        );

        if (assistantMessageIndex === -1) {
          throw new Error('Could not find associated message');
        }

        const assistantMessage = messages[assistantMessageIndex];
        const userMessageIndex = assistantMessageIndex - 1 >= 0 ? assistantMessageIndex - 1 : null;
        const userMessage = userMessageIndex !== null ? messages[userMessageIndex] : null;

        if (!userMessage || userMessage.role !== 'user') {
          throw new Error('Could not find preceding user message');
        }

        await submitFeedback(
          currentMessageId,
          userMessage.content,
          assistantMessage.content,
          false,
          feedbackNotes,
          messages
        );

        // Reset form state
        setShowFeedbackForm(false);
        setCurrentMessageId(null);
        setFeedbackNotes('');
      } catch (error) {
        console.error('Error submitting feedback with notes:', error);
        toast.error('Failed to submit feedback');
      }
    },
    [currentMessageId, feedbackNotes]
  );

  // Helper to submit feedback to Supabase
  const submitFeedback = async (
    messageId: string,
    question: string,
    response: string,
    helpful: boolean,
    notes: string,
    messages: Message[]
  ) => {
    try {
      // Extract potential matched keywords and regulations from the full conversation
      // This is simplified - in production you'd have a more robust mechanism
      const conversationText = messages.map(m => m.content).join(' ').toLowerCase();
      
      // Dummy keyword extraction - replace with your actual keyword detection logic
      const potentialKeywords = ['ppe', 'hazard', 'safety', 'compliance', 'inspection', 'training'];
      const matchedKeywords = potentialKeywords.filter(k => conversationText.includes(k));
      
      const { error } = await supabase.from('paulie_queries').insert({
        message_id: messageId,
        question: question,
        response: response,
        helpful: helpful,
        notes: notes,
        created_at: new Date().toISOString(),
        matched_keywords: matchedKeywords,
        review_status: !helpful && notes ? 'needs_review' : null
      });

      if (error) throw error;

      // Update local state to show "Thank you for your feedback"
      setFeedbackSubmitted(prev => ({
        ...prev,
        [messageId]: true
      }));

      toast.success('Feedback submitted successfully');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      throw error;
    }
  };

  return {
    feedbackSubmitted,
    showFeedbackForm,
    currentMessageId,
    feedbackNotes,
    handleFeedbackClick,
    submitFeedbackWithNotes,
    setFeedbackNotes,
    setShowFeedbackForm
  };
};
