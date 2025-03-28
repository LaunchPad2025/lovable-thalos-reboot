
/**
 * Main topic extraction functionality
 * Extracts key safety topics from conversation for better context management
 */
import { Message } from '@/components/chatbot/types';
import { checkForFallProtectionTopics } from './fallProtectionDetector';
import { processConversationalPhrases } from './conversationalPhraseDetector';
import { processCategoryTerms } from './categoryDetector';
import { processGeneralTopics } from './generalTopicDetector';

/**
 * Extract key safety topics from conversation for better context management
 * This helps the assistant remain on topic and reference previous exchanges
 */
export function extractSafetyTopics(messages: Message[]): string[] {
  const topicsFound: Set<string> = new Set();
  
  // Look through recent messages (up to 10 for better context memory)
  const recentMessages = messages.slice(-10);
  
  // First check for fall protection specific terms to prioritize them
  if (checkForFallProtectionTopics(recentMessages) && !topicsFound.has('fall protection')) {
    topicsFound.add('fall protection');
  }
  
  // Process conversational phrases
  processConversationalPhrases(recentMessages, topicsFound);
  
  // Process category-specific terms
  processCategoryTerms(recentMessages, topicsFound);
  
  // Process general safety topics
  processGeneralTopics(recentMessages, topicsFound);
  
  return Array.from(topicsFound);
}
