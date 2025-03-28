
import { prepareConversationContext } from './conversation/formatContext';
import { enhanceResponseTone } from './conversation/enhanceTone';
import { generateFollowUpQuestions } from './conversation/followUpSuggestions';
import { extractSafetyTopics } from './conversation/topicExtraction';

// Re-export all functions to maintain backward compatibility
export {
  prepareConversationContext,
  enhanceResponseTone,
  generateFollowUpQuestions,
  extractSafetyTopics
};
