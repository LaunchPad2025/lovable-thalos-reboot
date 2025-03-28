
/**
 * Database operations for regulations
 */
import { supabase } from '@/lib/supabase';
import { extractKeyTerms } from './keywordExtraction';
import { formatRegulationsResponse } from './responseFormatters';

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
    
    // Get regulations with keywords that overlap with our key terms
    const { data: regulations, error } = await supabase
      .from('regulations')
      .select('id, title, description, document_type, authority, source_url, keywords, category, updated_at')
      .filter('keywords', 'cs', `{${keyTerms.join(',')}}`)
      .order('updated_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching regulations with keywords:', error);
      return null;
    }
    
    if (!regulations || regulations.length === 0) {
      console.log('No regulations with matching keywords found in database');
      return null;
    }
    
    // Calculate relevance score based on number of keyword matches
    const scoredRegulations = regulations.map(reg => {
      if (!reg.keywords || !Array.isArray(reg.keywords)) {
        return { ...reg, score: 0 };
      }
      
      // Count how many query terms match with the regulation keywords
      const matchCount = keyTerms.filter(term => 
        reg.keywords.some(keyword => 
          keyword.toLowerCase().includes(term.toLowerCase()) || 
          term.toLowerCase().includes(keyword.toLowerCase())
        )
      ).length;
      
      return { ...reg, score: matchCount };
    });
    
    // Sort by score (highest first) and take top 3
    scoredRegulations.sort((a, b) => b.score - a.score);
    const topRegulations = scoredRegulations.slice(0, 3);
    
    // Log the query for learning purposes
    try {
      await supabase
        .from('paulie_queries')
        .insert({
          question: query,
          matched_keywords: keyTerms,
          matched_regulation_ids: topRegulations.map(r => r.id),
          user_id: userId,
          created_at: new Date().toISOString()
        });
    } catch (logError) {
      console.error('Error logging query:', logError);
      // Don't fail if logging fails
    }
    
    // If we have matches, format the response
    if (topRegulations.length > 0) {
      return formatRegulationsResponse(topRegulations, query, keyTerms);
    }
    
    return null;
  } catch (error) {
    console.error('Error in findRegulationsByKeywords:', error);
    return null;
  }
};

/**
 * Check for exact matches in regulatory database
 */
export const findExactRegulationMatch = async (query: string, userId?: string): Promise<string | null> => {
  // First try to match with database regulations based on keywords
  const matchResult = await findRegulationsByKeywords(query, userId);
  if (matchResult) {
    return matchResult;
  }

  // Fall back to static regulations if no database match
  return null;
};
