
/**
 * Main response enhancement function.
 * Applies various enhancements to make AI responses more natural and helpful.
 */
import { similarityCheck } from './similarityCheck';
import { enhanceResponseTone } from '@/utils/conversation';

/**
 * Enhance an AI response with additional context, diversification, and formatting
 * @param response Original AI response
 * @param previousResponse Previous AI response for similarity checking
 * @returns Enhanced response
 */
export function enhanceResponse(
  response: string, 
  previousResponse?: string
): string {
  // Check if response is too short to enhance
  if (response.length < 10) return response;
  
  // Optional similarity check to avoid repetitive responses
  if (previousResponse && similarityCheck(response, previousResponse)) {
    // Add diversity statement to avoid repetition
    response = "Let me provide some additional information. " + response;
  }
  
  // Apply conversational tone enhancement
  const enhancedResponse = enhanceResponseTone(response);
  
  return enhancedResponse;
}
