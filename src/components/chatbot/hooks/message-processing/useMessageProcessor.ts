import { Message } from '../../types';
import { extractSafetyTopics } from '@/utils/conversationUtils';
import { generateAIResponse } from './localResponseGenerator';
import { processWithHuggingFace, suggestFollowUpQuestions } from '@/utils/huggingfaceUtils';

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
      console.log("Detected safety topics:", safetyTopics);
      
      // Try to get AI response from Hugging Face model
      let aiResponse: string;
      
      try {
        // First try with the Hugging Face model
        console.log("Attempting to process with HuggingFace API");
        aiResponse = await processWithHuggingFace(content, allMessages);
        console.log("Hugging Face processing successful");
      } catch (error) {
        console.error('Error with Hugging Face processing, falling back to local response:', error);
        // Fall back to local response generation if API fails
        aiResponse = generateAIResponse(content, allMessages);
        console.log("Using local fallback response generator");
      }
      
      // If the response is too short or generic, try to enhance it with more specific information
      if (aiResponse.length < 50 || aiResponse.includes("I don't have specific information")) {
        console.log("Response too generic, enhancing with local knowledge base");
        const enhancedResponse = generateAIResponse(content, allMessages);
        
        // If the local response is more detailed, use it instead
        if (enhancedResponse.length > aiResponse.length * 1.5) {
          aiResponse = enhancedResponse;
        } else {
          // Otherwise, combine both responses for more context
          aiResponse = `${aiResponse}\n\nAdditionally: ${enhancedResponse}`;
        }
      }
      
      // Add AI response to messages
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      // Generate follow-up question suggestions
      const suggestions = suggestFollowUpQuestions(content, aiResponse);
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
