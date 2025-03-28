
import { useState } from 'react';
import { toast } from 'sonner';
import { Message } from '../types';
import { useImageProcessor } from './image-processing/useImageProcessor';
import { useMessageProcessor } from './message-processing/useMessageProcessor';

export const useChatMessages = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm Paulie, your safety assistant. How can I help you with workplace safety today?",
      role: 'assistant',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [followUpSuggestions, setFollowUpSuggestions] = useState<string[]>([]);

  // Hooks
  const { processImageForSafetyViolations } = useImageProcessor();
  const { processUserMessage } = useMessageProcessor();

  /**
   * Handle sending a message, with optional image attachment
   */
  const handleSendMessage = async (content: string, imageFile?: File | null) => {
    if (!content.trim() && !imageFile) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date().toISOString(),
      imageUrl: imageFile ? URL.createObjectURL(imageFile) : undefined
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setFollowUpSuggestions([]); // Clear previous suggestions
    
    try {
      // Processing image if provided
      if (imageFile) {
        console.log("Processing image for safety analysis");
        processImageForSafetyViolations(imageFile, userMessage.id, setMessages);
      }
      
      // Get the current conversation for context
      const updatedMessages = [...messages, userMessage];
      
      // Process the user message and get AI response
      await processUserMessage(content, updatedMessages, setMessages, setFollowUpSuggestions);
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
      setIsLoading(false);
      
      // Add failure message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I encountered an error processing your request. Please try again or rephrase your question.",
        role: 'assistant',
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return {
    messages,
    isLoading,
    handleSendMessage,
    followUpSuggestions
  };
};
