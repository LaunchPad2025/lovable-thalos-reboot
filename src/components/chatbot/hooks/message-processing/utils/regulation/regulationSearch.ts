
/**
 * Regulation search functionality
 */
import { searchByCitation } from './search/citationSearch';
import { searchByKeywords } from './search/keywordSearch';
import { scoreRegulations, logQueryMetadata, logLowConfidenceMatch } from './search/relevanceScoring';
import { extractKeyTerms } from './keywordExtraction';
import { formatRegulationsResponse } from './responseFormatters';
import { logRegulationMatchFailure } from './loggingOperations';
import { findRegulationsByIndustry } from './industrySearch';

/**
 * Find regulations based on keyword matching from the database
 */
export const findRegulationsByKeywords = async (query: string, userId?: string): Promise<string | null> => {
  try {
    // First check for direct citation - this should take highest priority
    const citationResult = await searchByCitation(query);
    if (citationResult.found && citationResult.response) {
      return citationResult.response;
    }
    
    // Continue with regular keyword search if no direct citation match
    const keyTerms = extractKeyTerms(query);
    console.log('Extracted key terms:', keyTerms);
    
    const keywordResult = await searchByKeywords(query, keyTerms);
    if (!keywordResult.found) {
      // Try to find regulations by industry if no direct matches
      return await findRegulationsByIndustry(query, keyTerms, userId);
    }
    
    // Process and score the regulations we found
    return processRegulationMatches(keywordResult.regulations!, query, keyTerms, userId);
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
  // Calculate relevance score and rank the regulations
  const { topRegulations, allMatchedCategories } = scoreRegulations(regulations, query, keyTerms);
  
  // Check if we have a regulation with a high enough confidence score
  const confidenceThreshold = 4;
  if (topRegulations.length > 0 && topRegulations[0].score < confidenceThreshold) {
    console.log('Low confidence regulation match:', topRegulations[0].score);
    
    // Log match with low confidence as a partial match
    await logLowConfidenceMatch(query, keyTerms, topRegulations[0], userId);
  }
  
  // Log the query for learning purposes
  await logQueryMetadata(query, keyTerms, topRegulations, userId);
  
  // If we have matches, format the response
  if (topRegulations.length > 0) {
    return formatRegulationsResponse(topRegulations, query, keyTerms, allMatchedCategories);
  }
  
  // No relevant matches found
  await logRegulationMatchFailure(query, keyTerms, userId);
  return null;
};
