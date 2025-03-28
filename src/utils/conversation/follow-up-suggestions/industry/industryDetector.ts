
import { detectRefineryContext, detectIndustryFromKeywords, detectIndustryFromSafetyTopics } from './detectionHelpers';

/**
 * Detect industry context from user query and conversation history
 * Enhanced to provide more robust industry detection, especially for refineries
 */
export const detectIndustryContext = (query: string, previousMessages: string[] = []): string | null => {
  const allText = [query, ...previousMessages].join(' ').toLowerCase();
  
  // Special case for refineries - explicitly map to oil_gas
  if (detectRefineryContext(allText)) {
    return 'oil_gas';
  }
  
  // First check for direct industry mentions
  const industryFromKeywords = detectIndustryFromKeywords(allText);
  if (industryFromKeywords) {
    return industryFromKeywords;
  }
  
  // If no direct industry mention, check for related safety topics that imply an industry
  const industryFromSafetyTopics = detectIndustryFromSafetyTopics(allText);
  if (industryFromSafetyTopics) {
    return industryFromSafetyTopics;
  }
  
  return null;
};
