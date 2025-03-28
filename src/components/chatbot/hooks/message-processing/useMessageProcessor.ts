
import { Message } from '../../types';
import { extractSafetyTopics } from '@/utils/conversationUtils';
import { generateAIResponse } from './localResponseGenerator';
import { processWithAI, generateSuggestions } from './api/huggingfaceProcessor';
import { enhanceResponse } from './utils/responseEnhancer';
import { getTrainingMatrixResponse, getTrainingCalendarResponse } from './utils/follow-up/matrixCalendarResponses';
import { findExactRegulationMatch } from './utils/regulationMatching';
import { handleFallProtectionQuery } from './utils/regulationMatching';
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
      // Log the user's query to paulie_queries table at the start
      let userId: string | null = null;
      let messageId: string = Date.now().toString();
      
      try {
        const user = await supabase.auth.getUser();
        userId = user.data?.user?.id || null;
        
        await supabase.from('paulie_queries').insert({
          question: content,
          user_id: userId,
          message_id: messageId
        });
      } catch (logError) {
        console.error('Error logging initial query:', logError);
        // Continue even if logging fails
      }
      
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
          
          // Update paulie_queries table with the response
          try {
            await supabase.from('paulie_queries').update({
              response: fallProtectionResponse,
              matched_category: 'fall protection'
            }).eq('message_id', messageId);
          } catch (error) {
            console.error('Error updating query with response:', error);
          }
          
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
        
        // Update paulie_queries table with the response
        try {
          await supabase.from('paulie_queries').update({
            response: matrixResponse,
            matched_category: 'training'
          }).eq('message_id', messageId);
        } catch (error) {
          console.error('Error updating query with response:', error);
        }
        
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
        
        // Update paulie_queries table with the response
        try {
          await supabase.from('paulie_queries').update({
            response: calendarResponse,
            matched_category: 'training'
          }).eq('message_id', messageId);
        } catch (error) {
          console.error('Error updating query with response:', error);
        }
        
        return assistantMessage;
      }
      
      // Try to find a regulation match using our enhanced keyword intelligence
      const regulationMatch = await findExactRegulationMatch(content, userId);
      if (regulationMatch) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: regulationMatch,
          role: 'assistant',
          timestamp: new Date().toISOString(),
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        
        // Extract detected safety topics from conversation history
        const safetyTopics = extractSafetyTopics(allMessages);
        
        // Generate regulation-specific follow-up suggestions based on detected topics
        let followUpSuggestions = [
          "Can you explain how to implement this regulation?",
          "What documentation is required for compliance?",
          "Are there any exceptions to this regulation?"
        ];
        
        // Customize follow-ups based on detected safety topics
        if (safetyTopics.includes('fall protection')) {
          followUpSuggestions = [
            "What are the inspection requirements for fall protection equipment?",
            "How do I develop a site-specific fall protection plan?",
            "What training is required for workers using fall protection?"
          ];
        } else if (safetyTopics.includes('chemical safety') || safetyTopics.includes('hazcom')) {
          followUpSuggestions = [
            "What GHS labels are required for chemical containers?",
            "How should we store incompatible chemicals?",
            "What training is required for employees who work with chemicals?"
          ];
        } else if (safetyTopics.includes('confined space')) {
          followUpSuggestions = [
            "What testing is required before confined space entry?",
            "Who needs to be involved in a confined space entry?",
            "What rescue provisions are required for confined spaces?"
          ];
        }
        
        setFollowUpSuggestions(followUpSuggestions);
        
        // Update paulie_queries table with the response
        try {
          await supabase.from('paulie_queries').update({
            response: regulationMatch
          }).eq('message_id', messageId);
        } catch (error) {
          console.error('Error updating query with response:', error);
        }
        
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
        generateMoreTargetedSuggestions(content, aiResponse, safetyTopics) : 
        generateSuggestions(content, aiResponse);
      
      setFollowUpSuggestions(suggestions);
      
      // Update paulie_queries table with the response
      try {
        await supabase.from('paulie_queries').update({
          response: aiResponse
        }).eq('message_id', messageId);
      } catch (error) {
        console.error('Error updating query with response:', error);
      }
      
      return assistantMessage;
    } catch (error) {
      console.error('Error processing message:', error);
      throw error;
    }
  };
  
  /**
   * Generate more targeted follow-up suggestions for local fallback responses
   */
  const generateMoreTargetedSuggestions = (
    userQuery: string, 
    aiResponse: string,
    safetyTopics: string[]
  ): string[] => {
    const topic = userQuery.toLowerCase();
    const suggestions: string[] = [];
    
    // Fall protection specific suggestions
    if (topic.includes('fall protection') || topic.includes('fall arrest') || 
        (topic.includes('fall') && topic.includes('osha')) ||
        safetyTopics.includes('fall protection')) {
      suggestions.push("Would you like a fall protection inspection checklist?");
      suggestions.push("How often should fall protection equipment be inspected?");
      suggestions.push("What are the training requirements for workers using fall protection?");
      return suggestions;
    }
    
    // Chemical safety suggestions
    if (topic.includes('chemical') || topic.includes('hazcom') || topic.includes('sds') ||
        safetyTopics.includes('chemical safety') || safetyTopics.includes('hazcom')) {
      suggestions.push("Would you like a chemical inventory template?");
      suggestions.push("What are the GHS labeling requirements?");
      suggestions.push("How should incompatible chemicals be stored?");
      return suggestions;
    }
    
    // Machine safety / LOTO suggestions
    if (topic.includes('machine') || topic.includes('lockout') || topic.includes('tagout') ||
        safetyTopics.includes('machine safety')) {
      suggestions.push("Would you like a lockout/tagout procedure template?");
      suggestions.push("What training is required for lockout/tagout?");
      suggestions.push("How often should lockout/tagout procedures be inspected?");
      return suggestions;
    }
    
    // Confined space suggestions
    if (topic.includes('confined space') || topic.includes('permit') || topic.includes('entry') ||
        safetyTopics.includes('confined space')) {
      suggestions.push("Would you like a confined space entry permit template?");
      suggestions.push("What atmospheric testing is required for confined spaces?");
      suggestions.push("What rescue provisions are needed for confined spaces?");
      return suggestions;
    }
    
    // Basic template offer
    suggestions.push("Would you like a downloadable template for this?");
    
    // Topic-specific follow-ups based on detected keywords
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
