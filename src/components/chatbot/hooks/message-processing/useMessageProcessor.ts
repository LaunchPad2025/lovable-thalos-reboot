
import { Message } from '../../types';
import { extractSafetyTopics } from '@/utils/conversationUtils';
import { generateAIResponse } from './localResponseGenerator';
import { processWithAI, generateSuggestions } from './api/huggingfaceProcessor';
import { enhanceResponse } from './utils/responseEnhancer';
import { getTrainingMatrixResponse, getTrainingCalendarResponse } from './utils/follow-up/matrixCalendarResponses';
import { findExactRegulationMatch } from './utils/regulationMatching';
import { handleFallProtectionQuery } from './utils/regulationMatching';

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
      // First, check specifically for fall protection related queries
      if (content.toLowerCase().includes('fall protection') || 
          content.toLowerCase().includes('fall arrest') ||
          content.toLowerCase().includes('osha') && content.toLowerCase().includes('fall') ||
          content.toLowerCase().includes('1926.501')) {
        
        const fallProtectionResponse = handleFallProtectionQuery(content);
        if (fallProtectionResponse) {
          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: fallProtectionResponse,
            role: 'assistant',
            timestamp: new Date().toISOString(),
          };
          
          setMessages(prev => [...prev, assistantMessage]);
          setFollowUpSuggestions([
            "What are the inspection requirements for fall protection equipment?",
            "How do I develop a site-specific fall protection plan?",
            "What training is required for workers using fall protection?"
          ]);
          
          return assistantMessage;
        }
      }
      
      // Check for specialized responses next
      const matrixResponse = getTrainingMatrixResponse(content);
      if (matrixResponse) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: matrixResponse,
          role: 'assistant',
          timestamp: new Date().toISOString(),
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        setFollowUpSuggestions([
          "How do I determine which training topics are required for each position?",
          "What's the best way to track training completion status?",
          "Can you provide a sample training attendance form?"
        ]);
        
        return assistantMessage;
      }
      
      const calendarResponse = getTrainingCalendarResponse(content);
      if (calendarResponse) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: calendarResponse,
          role: 'assistant',
          timestamp: new Date().toISOString(),
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        setFollowUpSuggestions([
          "What safety topics should be prioritized in my training calendar?",
          "How do I measure training effectiveness?",
          "Can you provide a training needs assessment template?"
        ]);
        
        return assistantMessage;
      }
      
      // Try to find an exact regulation match from the database
      // Now properly handling the async nature of this function
      const regulationMatch = await findExactRegulationMatch(content);
      if (regulationMatch) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: regulationMatch,
          role: 'assistant',
          timestamp: new Date().toISOString(),
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        
        // Generate regulation-specific follow-up suggestions
        setFollowUpSuggestions([
          "Can you explain how to implement this regulation?",
          "What documentation is required for compliance?",
          "Are there any exceptions to this regulation?"
        ]);
        
        return assistantMessage;
      }
      
      // Extract safety topics from conversation history to provide more relevant context
      const safetyTopics = extractSafetyTopics(allMessages);
      console.log("Detected safety topics for context:", safetyTopics);
      
      // Generate AI response, with fallback to local processing
      let aiResponse: string;
      let localResponseUsed = false;
      
      try {
        // First try with the Hugging Face model
        aiResponse = await processWithAI(content, allMessages);
      } catch (error) {
        console.error('Error with Hugging Face processing, falling back to local response:', error);
        // Fall back to local response generation if API fails
        aiResponse = generateAIResponse(content, allMessages);
        localResponseUsed = true;
        console.log("Using local fallback response generator");
      }
      
      // Generate local response for comparison/enhancement
      const localResponse = generateAIResponse(content, allMessages);
      
      // Check if response needs enhancement, now passing conversation history for context
      aiResponse = enhanceResponse(aiResponse, localResponse, allMessages);
      
      // Add AI response to messages
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      // Generate follow-up question suggestions based on context
      const suggestions = localResponseUsed ? 
        // If using local response, generate more targeted follow-ups
        generateMoreTargetedSuggestions(content, aiResponse) : 
        generateSuggestions(content, aiResponse);
      
      setFollowUpSuggestions(suggestions);
      
      return assistantMessage;
    } catch (error) {
      console.error('Error processing message:', error);
      throw error;
    }
  };
  
  /**
   * Generate more targeted follow-up suggestions for local fallback responses
   */
  const generateMoreTargetedSuggestions = (userQuery: string, aiResponse: string): string[] => {
    const topic = userQuery.toLowerCase();
    const suggestions: string[] = [];
    
    // Fall protection specific suggestions
    if (topic.includes('fall protection') || topic.includes('fall arrest') || 
        (topic.includes('fall') && topic.includes('osha'))) {
      suggestions.push("Would you like a fall protection inspection checklist?");
      suggestions.push("How often should fall protection equipment be inspected?");
      suggestions.push("What are the training requirements for workers using fall protection?");
      return suggestions;
    }
    
    // Basic template offer
    suggestions.push("Would you like a downloadable template for this?");
    
    // Topic-specific follow-ups
    if (topic.includes('hazard') || topic.includes('risk') || topic.includes('assessment')) {
      suggestions.push("Can you show me a sample hazard identification checklist?");
      suggestions.push("How often should we update our risk assessments?");
    } else if (topic.includes('train') || topic.includes('matrix') || topic.includes('calendar')) {
      suggestions.push("What training topics are required for safety supervisors?");
      suggestions.push("How do I track training certifications that expire?");
    } else if (topic.includes('ppe') || topic.includes('equipment') || topic.includes('protection')) {
      suggestions.push("What PPE is required for working with chemicals?");
      suggestions.push("How do I document PPE training and assignments?");
    } else if (topic.includes('inspect') || topic.includes('audit')) {
      suggestions.push("How frequently should safety inspections be conducted?");
      suggestions.push("What documentation is required after a safety inspection?");
    } else {
      // General safety follow-ups
      suggestions.push("What are the key components of an effective safety program?");
      suggestions.push("How should we document safety incidents or near misses?");
    }
    
    return suggestions.slice(0, 3); // Return up to 3 suggestions
  };

  return {
    processUserMessage
  };
};
