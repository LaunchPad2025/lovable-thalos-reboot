
import { supabase } from '@/lib/supabase';

/**
 * Log regulation match failure for analysis
 */
export const logRegulationMatchFailure = async (
  content: string,
  detectedIndustry: string | null,
  messageId: string
): Promise<void> => {
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
      review_status: 'industry_fallback',
      notes: `Using industry fallback: ${detectedIndustry || 'none detected'}`
    }).eq('message_id', messageId);
  } catch (error) {
    console.error('Error logging regulation match failure:', error);
    // Continue even if logging fails
  }
};
