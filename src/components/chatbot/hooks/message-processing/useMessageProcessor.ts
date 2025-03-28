
import { Message } from '../../types';
import { extractSafetyTopics } from '@/utils/conversationUtils';
import { generateAIResponse } from './localResponseGenerator';
import { processWithAI, generateSuggestions } from './api/huggingfaceProcessor';
import { enhanceResponse } from './utils/responseEnhancer';

export const useMessageProcessor = () => {
  /**
   * Process a user message and generate an AI response
   */
  const processUserMessage = async (
    content: string,
    allMessages: Message[],
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
    setFollowUpSuggestions: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    try {
      // Extract safety topics to enhance context
      const safetyTopics = extractSafetyTopics(allMessages);
      console.log("Detected safety topics for context:", safetyTopics);
      
      // Generate AI response, with fallback to local processing
      let aiResponse: string;
      
      try {
        // First try with the Hugging Face model
        aiResponse = await processWithAI(content, allMessages);
      } catch (error) {
        console.error('Error with Hugging Face processing, falling back to local response:', error);
        // Fall back to local response generation if API fails
        aiResponse = generateAIResponse(content, allMessages);
        console.log("Using local fallback response generator");
      }
      
      // Check if response needs enhancement
      const localResponse = generateAIResponse(content, allMessages);
      aiResponse = enhanceResponse(aiResponse, localResponse);
      
      // Add AI response to messages
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      // Generate follow-up question suggestions based on context
      const suggestions = generateSuggestions(content, aiResponse);
      setFollowUpSuggestions(suggestions);
      
      return assistantMessage;
    } catch (error) {
      console.error('Error processing message:', error);
      throw error;
    }
  };

  return {
    processUserMessage
  };
};
