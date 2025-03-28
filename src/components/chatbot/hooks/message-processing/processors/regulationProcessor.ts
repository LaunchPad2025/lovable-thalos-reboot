
import { Message } from '../../../types';
import { findExactRegulationMatch, logRegulationMatchFailure } from '../utils/regulation';
import { extractKeyTerms } from '../utils/regulation/keywordExtraction';
import { supabase } from '@/lib/supabase';
import { extractSafetyTopics } from '@/utils/conversationUtils';

/**
 * Handle regulation-specific query processing
 */
export const processRegulationQuery = async (
  content: string,
  allMessages: Message[],
  userId: string | null,
  messageId: string
): Promise<{ 
  match: boolean; 
  response: string | null;
  followUpSuggestions: string[];
}> => {
  // Try to find a regulation match using our enhanced keyword intelligence
  const regulationMatch = await findExactRegulationMatch(content, userId);
  
  if (regulationMatch) {
    // Update paulie_queries table with the response
    try {
      await supabase.from('paulie_queries').update({
        response: regulationMatch
      }).eq('message_id', messageId);
    } catch (error) {
      console.error('Error updating query with response:', error);
    }
    
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
    
    return {
      match: true,
      response: regulationMatch,
      followUpSuggestions
    };
  }
  
  // No regulation match found - log the failure and return not matched
  const keyTerms = await extractKeyTerms(content);
  
  // Log the regulation match failure for analysis
  await logRegulationMatchFailure(content, keyTerms, userId);
  
  return {
    match: false,
    response: null,
    followUpSuggestions: []
  };
};
