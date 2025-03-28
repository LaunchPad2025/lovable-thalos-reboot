
import { Message } from '../../../../types';
import { findExactRegulationMatch, logRegulationMatchFailure } from '../../utils/regulation';
import { extractKeyTerms } from '../../utils/regulation/keywordExtraction';
import { supabase } from '@/lib/supabase';
import { generateFollowUpSuggestions } from './followUpGenerator';

/**
 * Main function to find regulation matches
 */
export const findRegulationMatch = async (
  content: string,
  allMessages: Message[],
  userId: string | null,
  messageId: string
): Promise<{ 
  match: boolean; 
  response: string | null;
  followUpSuggestions: string[];
}> => {
  // Try to find an exact regulation match
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
    
    // Generate regulation-specific follow-up suggestions
    const followUpSuggestions = generateFollowUpSuggestions(content, allMessages);
    
    return {
      match: true,
      response: regulationMatch,
      followUpSuggestions
    };
  }
  
  // No regulation match found - log the failure and return not matched
  const keyTerms = await extractKeyTerms(content);
  
  // Detect industry context
  const industryContext = detectIndustryContext(content);
  
  // Log the regulation match failure for analysis
  await logRegulationMatchFailure(content, keyTerms, userId, industryContext);
  
  return {
    match: false,
    response: null,
    followUpSuggestions: []
  };
};
