
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Message } from '../../types';

export const useChatFeedback = () => {
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<Record<string, boolean>>({});
  const [feedbackNotes, setFeedbackNotes] = useState('');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [currentMessageId, setCurrentMessageId] = useState<string | null>(null);
  
  /**
   * Submit user feedback about a specific response
   */
  const submitFeedback = async (
    messageId: string,
    question: string,
    response: string,
    wasHelpful: boolean,
    notes: string = '',
    userId?: string
  ) => {
    try {
      // Record feedback in the database
      await supabase.from('paulie_queries')
        .insert({
          user_id: userId || null,
          message_id: messageId,
          question,
          response,
          helpful: wasHelpful,
          notes,
          created_at: new Date().toISOString()
        });
      
      // Mark this message as having received feedback
      setFeedbackSubmitted(prev => ({
        ...prev,
        [messageId]: true
      }));
      
      // Reset form if it was showing
      if (showFeedbackForm) {
        setShowFeedbackForm(false);
        setFeedbackNotes('');
        setCurrentMessageId(null);
      }
      
      return true;
    } catch (error) {
      console.error('Error submitting feedback:', error);
      return false;
    }
  };
  
  /**
   * Handle feedback button click
   */
  const handleFeedbackClick = (messageId: string, wasHelpful: boolean, messages: Message[]) => {
    // Find the relevant message and its associated user query
    const assistantMessageIndex = messages.findIndex(m => m.id === messageId);
    
    if (assistantMessageIndex <= 0) {
      console.error('Could not find previous user message');
      return;
    }
    
    const assistantMessage = messages[assistantMessageIndex];
    const userMessage = messages[assistantMessageIndex - 1];
    
    if (wasHelpful) {
      // Submit positive feedback immediately
      submitFeedback(
        messageId,
        userMessage.content,
        assistantMessage.content,
        true
      );
    } else {
      // For negative feedback, show the feedback form
      setCurrentMessageId(messageId);
      setShowFeedbackForm(true);
    }
  };
  
  /**
   * Submit feedback with notes
   */
  const submitFeedbackWithNotes = (messages: Message[]) => {
    if (!currentMessageId) return;
    
    const assistantMessageIndex = messages.findIndex(m => m.id === currentMessageId);
    
    if (assistantMessageIndex <= 0) {
      console.error('Could not find previous user message');
      return;
    }
    
    const assistantMessage = messages[assistantMessageIndex];
    const userMessage = messages[assistantMessageIndex - 1];
    
    submitFeedback(
      currentMessageId,
      userMessage.content,
      assistantMessage.content,
      false,
      feedbackNotes
    );
  };
  
  return {
    feedbackSubmitted,
    showFeedbackForm,
    feedbackNotes,
    currentMessageId,
    setFeedbackNotes,
    handleFeedbackClick,
    submitFeedbackWithNotes,
    setShowFeedbackForm
  };
};
