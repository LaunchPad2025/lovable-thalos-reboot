
/**
 * Regulation search functionality
 */
import { supabase } from '@/lib/supabase';
import { extractKeyTerms } from './keywordExtraction';
import { formatRegulationsResponse } from './responseFormatters';
import { logRegulationMatchFailure } from './loggingOperations';
import { findRegulationsByIndustry } from './industrySearch';

/**
 * Find regulations based on keyword matching from the database
 */
export const findRegulationsByKeywords = async (query: string, userId?: string): Promise<string | null> => {
  try {
    const keyTerms = extractKeyTerms(query);
    console.log('Extracted key terms:', keyTerms);
    
    if (keyTerms.length === 0) {
      console.log('No key terms extracted from query');
      return null;
    }
    
    // Enhanced query to find regulations with overlapping keywords
    // Now also checking alt_phrases for better conversational matching
    const { data: regulations, error } = await supabase
      .from('regulations')
      .select('id, title, description, document_type, authority, source_url, keywords, alt_phrases, category, updated_at, industry, industry_tags')
      .or(`keywords.cs.{${keyTerms.join(',')}},alt_phrases.cs.{${keyTerms.join(',')}}`)
      .order('updated_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching regulations with keywords:', error);
      
      // If the alt_phrases column doesn't exist or query fails, fallback to just checking keywords
      const { data: fallbackRegulations, error: fallbackError } = await supabase
        .from('regulations')
        .select('id, title, description, document_type, authority, source_url, keywords, category, updated_at, industry, industry_tags')
        .filter('keywords', 'cs', `{${keyTerms.join(',')}}`)
        .order('updated_at', { ascending: false });
      
      if (fallbackError) {
        console.error('Error in fallback regulation query:', fallbackError);
        
        // Log the failed match to regulation_match_failures table
        await logRegulationMatchFailure(query, keyTerms, userId);
        
        return null;
      }
      
      if (!fallbackRegulations || fallbackRegulations.length === 0) {
        console.log('No regulations with matching keywords found in database');
        
        // Try to find regulations by industry if no direct matches
        return await findRegulationsByIndustry(query, keyTerms, userId);
      }
      
      return processRegulationMatches(fallbackRegulations, query, keyTerms, userId);
    }
    
    if (!regulations || regulations.length === 0) {
      console.log('No regulations with matching keywords found in database');
      
      // Try to find regulations by industry if no direct matches
      return await findRegulationsByIndustry(query, keyTerms, userId);
    }
    
    return processRegulationMatches(regulations, query, keyTerms, userId);
  } catch (error) {
    console.error('Error in findRegulationsByKeywords:', error);
    return null;
  }
};

/**
 * Process matching regulations and score them by relevance
 */
const processRegulationMatches = async (
  regulations: any[], 
  query: string, 
  keyTerms: string[], 
  userId?: string
): Promise<string | null> => {
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
  
  // Check if we have a regulation with a high enough confidence score
  // If not, log as a potential match failure for further analysis
  const confidenceThreshold = 4;
  if (topRegulations.length > 0 && topRegulations[0].score < confidenceThreshold) {
    console.log('Low confidence regulation match:', topRegulations[0].score);
    
    // Log match with low confidence as a partial match
    try {
      await supabase.from('regulation_match_failures').insert({
        question: query,
        user_id: userId,
        matched_keywords: keyTerms,
        notes: 'Low confidence match',
        suggested_category: topRegulations[0].category || null,
        reviewed: false
      });
    } catch (logError) {
      console.error('Error logging low confidence match:', logError);
    }
  }
  
  // Check for multiple category matches to provide better follow-ups
  const allMatchedCategories = Array.from(new Set(
    scoredRegulations.flatMap(reg => reg.matchedCategories || [])
  ));
  
  // Log the query for learning purposes
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
  
  // If we have matches, format the response
  if (topRegulations.length > 0) {
    return formatRegulationsResponse(topRegulations, query, keyTerms, allMatchedCategories);
  }
  
  return null;
};
