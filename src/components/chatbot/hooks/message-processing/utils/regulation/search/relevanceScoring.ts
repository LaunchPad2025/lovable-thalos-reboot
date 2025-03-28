
/**
 * Handles regulation relevance scoring and ranking
 */
import { supabase } from '@/lib/supabase';
import { formatRegulationsResponse } from '../responseFormatters';

/**
 * Score and rank regulations by relevance to the query
 */
export const scoreRegulations = (
  regulations: any[], 
  query: string, 
  keyTerms: string[]
): { 
  scoredRegulations: any[];
  topRegulations: any[];
  allMatchedCategories: string[];
} => {
  // Calculate relevance score based on number of keyword matches and term position in query
  const scoredRegulations = regulations.map(reg => {
    if (!reg.keywords || !Array.isArray(reg.keywords)) {
      return { ...reg, score: 0, matchedCategories: [] };
    }
    
    // Count how many query terms match with the regulation keywords
    const matchedTerms = keyTerms.filter(term => 
      reg.keywords.some((keyword: string) => 
        keyword.toLowerCase().includes(term.toLowerCase()) || 
        term.toLowerCase().includes(keyword.toLowerCase())
      )
    );
    
    // Check alt_phrases if available - higher weight for exact phrase matches
    let altPhraseMatches = 0;
    let exactPhraseMatch = false;
    
    if (reg.alt_phrases && Array.isArray(reg.alt_phrases)) {
      const queryLower = query.toLowerCase();
      
      // Check for exact phrase matches which are strong signals of intent
      exactPhraseMatch = reg.alt_phrases.some((phrase: string) => 
        queryLower.includes(phrase.toLowerCase())
      );
      
      // Count partial phrase matches
      altPhraseMatches = reg.alt_phrases.filter((phrase: string) => {
        const phraseLower = phrase.toLowerCase();
        const phraseWords = phraseLower.split(' ').filter(word => word.length > 3);
        
        // Count phrases where significant words appear in the query
        return phraseWords.some(word => queryLower.includes(word));
      }).length;
    }
    
    // Calculate position weight - terms appearing earlier in the query get higher scores
    const positionScore = matchedTerms.reduce((score, term) => {
      const termPosition = query.toLowerCase().indexOf(term.toLowerCase());
      return termPosition >= 0 ? score + (1 - termPosition / query.length) : score;
    }, 0);
    
    // Identify matched categories for multi-category detection
    const matchedCategories = matchedTerms.filter(term => 
      ['fall protection', 'chemical safety', 'machine safety', 'ppe', 
       'confined space', 'fire safety', 'electrical safety', 'training',
       'incident reporting', 'ergonomics', 'respiratory protection',
       'emergency planning', 'lockout/tagout', 'hazcom'].includes(term)
    );
    
    // Final score calculation with weights for different factors
    const termMatchScore = matchedTerms.length * 2;
    const categoryScore = matchedCategories.length * 3;
    const altPhraseScore = altPhraseMatches * 3; // Higher weight for alt_phrases
    const exactPhraseMatchScore = exactPhraseMatch ? 10 : 0; // Very high weight for exact phrase matches
    const finalScore = termMatchScore + categoryScore + positionScore + altPhraseScore + exactPhraseMatchScore;
    
    return { 
      ...reg, 
      score: finalScore, 
      matchedTerms,
      matchedCategories,
      exactPhraseMatch
    };
  });
  
  // Sort by score (highest first) and take top 3
  scoredRegulations.sort((a, b) => b.score - a.score);
  const topRegulations = scoredRegulations.slice(0, 3);
  
  // Get all matched categories for follow-up suggestions
  const allMatchedCategories = Array.from(new Set(
    scoredRegulations.flatMap(reg => reg.matchedCategories || [])
  ));
  
  return {
    scoredRegulations,
    topRegulations,
    allMatchedCategories
  };
};

/**
 * Log query metadata for learning and analytics
 */
export const logQueryMetadata = async (
  query: string,
  keyTerms: string[],
  topRegulations: any[],
  userId?: string
): Promise<void> => {
  try {
    await supabase
      .from('paulie_queries')
      .insert({
        question: query,
        matched_keywords: keyTerms,
        matched_regulation_ids: topRegulations.map(r => r.id),
        matched_category: topRegulations[0]?.category || null,
        review_status: 'matched',
        user_id: userId,
        created_at: new Date().toISOString()
      });
  } catch (logError) {
    console.error('Error logging query:', logError);
    // Don't fail if logging fails
  }
};

/**
 * Log low confidence matches for further analysis
 */
export const logLowConfidenceMatch = async (
  query: string,
  keyTerms: string[],
  topRegulation: any,
  userId?: string
): Promise<void> => {
  try {
    await supabase.from('regulation_match_failures').insert({
      question: query,
      user_id: userId,
      matched_keywords: keyTerms,
      notes: 'Low confidence match',
      suggested_category: topRegulation?.category || null,
      reviewed: false
    });
  } catch (logError) {
    console.error('Error logging low confidence match:', logError);
  }
};
