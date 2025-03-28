
import { useState } from 'react';
import { Message } from '../types';
import { useImageProcessor } from './image-processing/useImageProcessor';
import { useMessageProcessor } from './message-processing/useMessageProcessor';
import { handleSendMessage } from './chat-utils/messageHandler';

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
  const handleSendMessageWrapper = async (content: string, imageFile?: File | null) => {
    await handleSendMessage(
      content,
      imageFile,
      messages,
      setMessages,
      setIsLoading,
      setFollowUpSuggestions,
      processImageForSafetyViolations,
      processUserMessage
    );
  };

  return {
    messages,
    isLoading,
    handleSendMessage: handleSendMessageWrapper,
    followUpSuggestions
  };
};
