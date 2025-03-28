
import { Message } from '../../../types';
import { processCitation } from './regulation/citationProcessor';
import { findRegulationMatch } from './regulation/regulationMatcher';

/**
 * Handle regulation-specific query processing
 * Enhanced with citation recognition and industry-aware fallback
 */
export const processRegulationQuery = async (
  content: string,
  allMessages: Message[],
  userId: string | null,
  messageId: string
): Promise<{ 
  match: boolean; 
  response: string | null;
  followUpSuggestions: string[];
}> => {
  // Step 1: First check for direct regulation citations (e.g., 1910.119)
  const citationResult = await processCitation(content, messageId);
  if (citationResult.match) {
    return {
      match: true,
      response: citationResult.response,
      followUpSuggestions: [
        `What are the documentation requirements for this regulation?`,
        `What training is required for compliance with this regulation?`,
        `Are there any exceptions to this regulation?`
      ]
    };
  }
  
  // Step 2: If no direct citation match, try the regular regulation matching
  return await findRegulationMatch(content, allMessages, userId, messageId);
};
