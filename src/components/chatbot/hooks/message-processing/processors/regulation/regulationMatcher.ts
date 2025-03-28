
import { Message } from '../../../../types';
import { findExactRegulationMatch, logRegulationMatchFailure } from '../../utils/regulation';
import { extractKeyTerms } from '../../utils/regulation/keywordExtraction';
import { supabase } from '@/lib/supabase';
import { generateFollowUpSuggestions } from './followUpGenerator';

/**
 * Helper function to detect industry context from query content
 */
export const detectIndustryContext = (content: string): string | null => {
  const industryKeywords = {
    'construction': ['construction', 'building', 'contractor', 'scaffold', 'excavation'],
    'manufacturing': ['manufacturing', 'factory', 'production', 'assembly', 'fabrication'],
    'healthcare': ['healthcare', 'hospital', 'medical', 'patient', 'clinic'],
    'oil_gas': ['oil', 'gas', 'petroleum', 'drilling', 'refinery'],
    'mining': ['mining', 'quarry', 'excavation', 'ore', 'mineral'],
    'agriculture': ['agriculture', 'farm', 'crop', 'livestock', 'harvest'],
    'retail': ['retail', 'store', 'shop', 'customer', 'merchandise'],
    'laboratory': ['laboratory', 'lab', 'research', 'experiment', 'chemical'],
    'logistics': ['logistics', 'warehouse', 'shipping', 'transportation', 'distribution'],
    'food_processing': ['food', 'processing', 'packaging', 'beverage', 'production']
  };
  
  // Check for industry keywords in the content
  for (const [industry, keywords] of Object.entries(industryKeywords)) {
    if (keywords.some(keyword => content.toLowerCase().includes(keyword.toLowerCase()))) {
      return industry;
    }
  }
  
  return null;
};

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
