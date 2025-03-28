
/**
 * Main export file for all conversation utility functions.
 * Provides a clean API for importing conversation-related utilities.
 */

// Core context utilities
import { prepareConversationContext } from './formatContext';

// Tone enhancement
import { enhanceResponseTone } from './tone/enhanceTone';

// Follow-up suggestions
import { generateFollowUpQuestions } from './follow-up-suggestions';

// Topic extraction
import { extractSafetyTopics } from './topicExtraction';

// Re-export all functions with organized grouping
export {
  // Context preparation
  prepareConversationContext,
  
  // Response enhancement
  enhanceResponseTone,
  
  // Follow-up generation
  generateFollowUpQuestions,
  
  // Topic analysis
  extractSafetyTopics
};
