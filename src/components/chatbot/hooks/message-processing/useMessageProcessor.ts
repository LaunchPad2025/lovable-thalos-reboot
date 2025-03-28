
import { Message } from '../../types';
import { logUserQuery } from './processors/queryLogger';
import { processFallProtectionQuery } from './processors/fallProtectionProcessor';
import { processSpecializedResponses } from './processors/specializedResponseProcessor';
import { processRegulationQuery } from './processors/regulationProcessor';
import { processFallbackResponse } from './processors/fallbackProcessor';
import { supabase } from '@/lib/supabase';

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
      // Get current user
      const user = await supabase.auth.getUser();
      const userId = user.data?.user?.id || null;
      
      // Log the user's query to paulie_queries table at the start
      const messageId = await logUserQuery(content, userId);
      
      // Step 1: First, check specifically for fall protection related queries
      const fallProtectionResult = await processFallProtectionQuery(content, messageId);
      if (fallProtectionResult.match) {
        const assistantMessage = createAssistantMessage(fallProtectionResult.response!);
        setMessages(prev => [...prev, assistantMessage]);
        setFollowUpSuggestions(fallProtectionResult.followUpSuggestions);
        return assistantMessage;
      }
      
      // Step 2: Check for specialized responses like training matrices
      const specializedResult = await processSpecializedResponses(content, messageId);
      if (specializedResult.match) {
        const assistantMessage = createAssistantMessage(specializedResult.response!);
        setMessages(prev => [...prev, assistantMessage]);
        setFollowUpSuggestions(specializedResult.followUpSuggestions);
        return assistantMessage;
      }
      
      // Step 3: Try to find a regulation match
      const regulationResult = await processRegulationQuery(content, allMessages, userId, messageId);
      if (regulationResult.match) {
        const assistantMessage = createAssistantMessage(regulationResult.response!);
        setMessages(prev => [...prev, assistantMessage]);
        setFollowUpSuggestions(regulationResult.followUpSuggestions);
        return assistantMessage;
      }
      
      // Step 4: Use fallback response if no matches found
      const fallbackResult = await processFallbackResponse(content, messageId);
      const assistantMessage = createAssistantMessage(fallbackResult.response);
      setMessages(prev => [...prev, assistantMessage]);
      setFollowUpSuggestions(fallbackResult.followUpSuggestions);
      return assistantMessage;
    } catch (error) {
      console.error('Error processing message:', error);
      throw error;
    }
  };
  
  /**
   * Create an assistant message object
   */
  const createAssistantMessage = (content: string): Message => {
    return {
      id: (Date.now() + 1).toString(),
      content: content,
      role: 'assistant',
      timestamp: new Date().toISOString(),
    };
  };
  
  /**
   * Extract key terms from user query
   */
  const extractKeyTerms = async (query: string): Promise<string[]> => {
    try {
      // Import dynamically to avoid circular dependencies
      const { extractKeyTerms: extractTerms } = await import('./utils/regulation/keywordExtraction');
      return extractTerms(query);
    } catch (error) {
      console.error('Error extracting key terms:', error);
      return [];
    }
  };

  return {
    processUserMessage
  };
};
