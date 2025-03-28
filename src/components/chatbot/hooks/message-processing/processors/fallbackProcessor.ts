
import { detectAndFormatIndustryResponse } from './fallback/industryDetection';
import { handleCitationMatch } from './fallback/citationHandler';
import { getIndustrySpecificSuggestions } from './fallback/industrySuggestions';
import { fetchIndustrySpecificRegulations } from './fallback/regulationFetcher';
import { generateIndustryRegulationResponse } from './fallback/responseGenerator';
import { logRegulationMatchFailure } from './fallback/loggingUtils';

/**
 * Generate fallback response when no matches are found
 * Enhanced with regulation citation detection, industry-aware fallback behavior and tiered responses
 */
export const processFallbackResponse = async (
  content: string,
  messageId: string
): Promise<{ 
  response: string;
  followUpSuggestions: string[];
}> => {
  // Step 1: Check for direct regulation citation
  const citationResult = await handleCitationMatch(content, messageId);
  if (citationResult.matched) {
    return {
      response: citationResult.response!,
      followUpSuggestions: citationResult.followUpSuggestions!
    };
  }
  
  // Step 2: Detect industry context
  const { detectedIndustry, formattedResponse } = detectAndFormatIndustryResponse(content);
  
  // Step 3: Try to find industry-specific regulations
  const industryBasedRegulations = await fetchIndustrySpecificRegulations(detectedIndustry);
  
  let response = '';
  
  // Tiered fallback pattern:
  // 1. If we have an industry-specific regulation, use that for a better response
  if (industryBasedRegulations && industryBasedRegulations.length > 0) {
    const regulation = industryBasedRegulations[0];
    response = generateIndustryRegulationResponse(detectedIndustry!, regulation);
  } 
  // 2. Otherwise, fall back to the industry-aware generic response
  else if (formattedResponse) {
    response = formattedResponse;
  }
  // 3. Final fallback if no industry detected
  else {
    response = `I don't have specific information about that safety topic, but I can help with:

• Fall protection requirements
• Chemical safety and hazard communication
• Confined space entry procedures
• PPE selection and documentation
• Machine guarding and lockout/tagout

What specific safety area are you most interested in?`;
  }
  
  // Generate industry-specific follow-up suggestions
  const industrySuggestions = getIndustrySpecificSuggestions(detectedIndustry);
  
  // Log the regulation match failure for analysis
  await logRegulationMatchFailure(content, detectedIndustry, messageId);
  
  return {
    response,
    followUpSuggestions: industrySuggestions
  };
};
