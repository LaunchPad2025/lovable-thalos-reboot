
/**
 * Backward compatibility layer for conversation utilities.
 * Imports from the new modular structure and re-exports for legacy usage.
 */
import {
  prepareConversationContext,
  enhanceResponseTone,
  generateFollowUpQuestions,
  extractSafetyTopics
} from './conversation';

// Re-export all functions to maintain backward compatibility
export {
  prepareConversationContext,
  enhanceResponseTone,
  generateFollowUpQuestions,
  extractSafetyTopics
};
