
/**
 * Logging operations for regulation matching
 */
import { supabase } from '@/lib/supabase';

/**
 * Log regulation match failures to the regulation_match_failures table
 * Enhanced to include industry context
 */
export const logRegulationMatchFailure = async (
  question: string, 
  matchedKeywords: string[],
  userId?: string,
  fallbackIndustry?: string
): Promise<void> => {
  try {
    // Use the regulation_match_failures table with enhanced fields
    await supabase.from('regulation_match_failures').insert({
      question,
      user_id: userId,
      matched_keywords: matchedKeywords,
      fallback_industry: fallbackIndustry,
      timestamp: new Date().toISOString(),
      reviewed: false
    });
    console.log('Logged regulation match failure for analysis');
  } catch (error) {
    console.error('Error logging regulation match failure:', error);
  }
};
