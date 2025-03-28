
/**
 * Industry-based regulation search
 */
import { supabase } from '@/lib/supabase';
import { formatRegulationsResponse } from './responseFormatters';
import { logRegulationMatchFailure } from './loggingOperations';
import { detectIndustryFromQuery, fetchIndustryRegulations } from './industry/industryDetector';

/**
 * Find regulations by industry when no direct keyword matches are found
 */
export const findRegulationsByIndustry = async (query: string, keyTerms: string[], userId?: string): Promise<string | null> => {
  try {
    // Detect industry from the query
    const detectedIndustry = detectIndustryFromQuery(query);
    
    if (!detectedIndustry) {
      // No industry detected, can't find industry-specific regulations
      await logRegulationMatchFailure(query, keyTerms, userId);
      return null;
    }
    
    // Fetch regulations for the detected industry
    const industryRegulations = await fetchIndustryRegulations(detectedIndustry);
    
    if (!industryRegulations) {
      // Log the failure for industry match as well
      await logRegulationMatchFailure(query, keyTerms, userId, detectedIndustry);
      return null;
    }
    
    // We found some industry-specific regulations, process them
    console.log(`Found ${industryRegulations.length} industry-specific regulations for ${detectedIndustry}`);
    
    // Create a special context message for industry matches
    const message = formatRegulationsResponse(
      industryRegulations, 
      query, 
      [...keyTerms, detectedIndustry], 
      [detectedIndustry]
    );
    
    return message;
  } catch (error) {
    console.error('Error in findRegulationsByIndustry:', error);
    return null;
  }
};
