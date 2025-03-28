
import { handleFallProtectionQuery } from '../utils/regulation/fallProtection';
import { supabase } from '@/lib/supabase';

/**
 * Process fall protection specific queries
 */
export const processFallProtectionQuery = async (
  content: string,
  messageId: string
): Promise<{ 
  match: boolean; 
  response: string | null;
  followUpSuggestions: string[];
}> => {
  const fallProtectionResponse = handleFallProtectionQuery(content);
  
  if (fallProtectionResponse) {
    // Update paulie_queries table with the response
    try {
      await supabase.from('paulie_queries').update({
        response: fallProtectionResponse,
        matched_category: 'fall protection'
      }).eq('message_id', messageId);
    } catch (error) {
      console.error('Error updating query with response:', error);
    }
    
    return {
      match: true,
      response: fallProtectionResponse,
      followUpSuggestions: [
        "What are the inspection requirements for fall protection equipment?",
        "How do I develop a site-specific fall protection plan?",
        "What training is required for workers using fall protection?"
      ]
    };
  }
  
  return {
    match: false,
    response: null,
    followUpSuggestions: []
  };
};
