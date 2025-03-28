
import { supabase } from '@/lib/supabase';

/**
 * Generate fallback response when no matches are found
 */
export const processFallbackResponse = async (
  content: string,
  messageId: string
): Promise<{ 
  response: string;
  followUpSuggestions: string[];
}> => {
  // Prepare the fallback response with category suggestions
  const fallbackResponse = "I couldn't find a direct regulation for that query, but I'd love to help improve. "
    + "Could you clarify what industry or hazard type this relates to?\n\n"
    + "Common safety categories include:\n"
    + "- Fall Protection (heights, scaffolds, ladders)\n"
    + "- Chemical Safety (HazCom, GHS, storage)\n"
    + "- Machine Safety (Lockout/Tagout, guarding)\n"
    + "- Confined Spaces (permits, testing, rescue)\n"
    + "- PPE (respirators, hearing protection, gloves)\n\n"
    + "You can also try rephrasing your question with more specific details about the regulation or standard you're looking for.";
  
  // Update paulie_queries table with the fallback response
  try {
    await supabase.from('paulie_queries').update({
      response: fallbackResponse,
      review_status: 'no_match_found',
      notes: 'Using category suggestion fallback'
    }).eq('message_id', messageId);
  } catch (error) {
    console.error('Error updating query with fallback response:', error);
  }
  
  return {
    response: fallbackResponse,
    followUpSuggestions: [
      "Tell me about Fall Protection requirements",
      "What are the Chemical Safety (HazCom) rules?",
      "Explain Confined Space Entry requirements",
      "What PPE is required for my industry?",
      "Tell me about Lockout/Tagout procedures"
    ]
  };
};
