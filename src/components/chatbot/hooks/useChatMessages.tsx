
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
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add fallback message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I encountered an error processing your request. I'll try to answer with my local knowledge instead.\n\n" + 
                 (content.toLowerCase().includes('chemical') ? 
                  "Regarding chemical storage, OSHA requires proper labeling, compatible storage groups, ventilation, and secondary containment. SDS documents should be readily available, and employees must be trained on hazard communication. Would you like more specific information about particular chemicals or storage requirements?" : 
                  "I'm having trouble connecting to my knowledge base. Can you please try again with your question, or ask me about a different safety topic?"),
        role: 'assistant',
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
      
      // Generate some basic follow-up suggestions
      setFollowUpSuggestions([
        "What specific chemicals are you working with?",
        "Do you need information about a specific safety regulation?"
      ]);
      
      toast.error('Using local knowledge base due to connection issue');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    handleSendMessage,
    followUpSuggestions
  };
};
