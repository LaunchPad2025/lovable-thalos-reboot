
import { detectIndustryContext, formatIndustryFallbackResponse } from '@/utils/conversation/follow-up-suggestions/industryDetection';

/**
 * Detect industry context from user query and format an appropriate response
 */
export const detectAndFormatIndustryResponse = (
  content: string
): { 
  detectedIndustry: string | null; 
  formattedResponse: string | null;
} => {
  // Detect the industry context from the user's query
  const detectedIndustry = detectIndustryContext(content);
  
  // Format industry-based response if industry detected
  let formattedResponse = null;
  if (detectedIndustry) {
    formattedResponse = formatIndustryFallbackResponse(detectedIndustry, content);
  }
  
  return {
    detectedIndustry,
    formattedResponse
  };
};
