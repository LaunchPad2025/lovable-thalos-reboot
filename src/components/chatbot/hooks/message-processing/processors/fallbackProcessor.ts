
import { supabase } from '@/lib/supabase';
import { detectIndustryContext, formatIndustryFallbackResponse, getIndustrySpecificSuggestions } from '@/utils/conversation/follow-up-suggestions/industryDetection';

/**
 * Generate fallback response when no matches are found
 * Enhanced with industry-aware fallback behavior
 */
export const processFallbackResponse = async (
  content: string,
  messageId: string
): Promise<{ 
  response: string;
  followUpSuggestions: string[];
}> => {
  // Detect the industry context from the user's query
  const detectedIndustry = detectIndustryContext(content);
  
  // Generate an industry-aware fallback response
  const fallbackResponse = formatIndustryFallbackResponse(detectedIndustry, content);
  
  // Generate industry-specific follow-up suggestions
  const industrySuggestions = detectedIndustry 
    ? getIndustrySpecificSuggestions(detectedIndustry)
    : [
        "What specific safety topic are you interested in?",
        "Tell me about Fall Protection requirements",
        "What are the Chemical Safety (HazCom) rules?",
        "Explain Confined Space Entry requirements",
        "What PPE is required for my industry?"
      ];
  
  // Log the regulation match failure for analysis
  try {
    const user = await supabase.auth.getUser();
    const userId = user.data?.user?.id;
    
    await supabase.from('regulation_match_failures').insert({
      question: content,
      user_id: userId || null,
      matched_keywords: [], // No keywords matched
      fallback_industry: detectedIndustry,
      timestamp: new Date().toISOString(),
      reviewed: false
    });
    
    // Update paulie_queries table with the fallback response
    await supabase.from('paulie_queries').update({
      response: fallbackResponse,
      review_status: 'no_match_found',
      notes: `Using industry fallback: ${detectedIndustry || 'none detected'}`
    }).eq('message_id', messageId);
  } catch (error) {
    console.error('Error logging regulation match failure:', error);
    // Continue even if logging fails
  }
  
  return {
    response: fallbackResponse,
    followUpSuggestions: industrySuggestions
  };
};
