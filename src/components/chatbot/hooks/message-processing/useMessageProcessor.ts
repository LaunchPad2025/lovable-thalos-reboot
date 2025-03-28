
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
      console.log("Detected safety topics for context:", safetyTopics);
      
      // Try to get AI response from Hugging Face model with enhanced conversational tone
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
      if (aiResponse.length < 50 || 
          aiResponse.includes("I don't have specific information") ||
          aiResponse.includes("I don't know") ||
          aiResponse.includes("I'm not sure")) {
        console.log("Response too generic, enhancing with local knowledge base");
        const enhancedResponse = generateAIResponse(content, allMessages);
        
        // If the local response is more detailed, use it instead
        if (enhancedResponse.length > aiResponse.length * 1.2) {
          aiResponse = enhancedResponse;
        } else {
          // Create a more natural combined response
          const transitions = [
            "Additionally, ",
            "I can also add that ",
            "To give you more context, ",
            "It's also worth noting that ",
            "For more specific guidance, "
          ];
          const transition = transitions[Math.floor(Math.random() * transitions.length)];
          
          // Combine responses without redundancy
          aiResponse = aiResponse + "\n\n" + transition + enhancedResponse.toLowerCase();
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
      
      // Generate follow-up question suggestions based on context
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
