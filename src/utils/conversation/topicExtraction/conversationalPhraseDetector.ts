
/**
 * Detector for conversational phrases related to safety topics
 */
import { conversationalPhrases } from './categoryMappings';
import { Message } from '@/components/chatbot/types';

/**
 * Detect conversational phrases in content and map to topics
 */
export function detectConversationalPhrases(
  content: string, 
  topicsFound: Set<string>
): void {
  const contentLower = content.toLowerCase();
  
  for (const [category, phrases] of Object.entries(conversationalPhrases)) {
    for (const phrase of phrases) {
      if (contentLower.includes(phrase) && !topicsFound.has(category)) {
        topicsFound.add(category);
        break;
      }
    }
  }
}

/**
 * Process all messages to detect conversational phrases
 */
export function processConversationalPhrases(
  messages: Message[],
  topicsFound: Set<string>
): void {
  for (const msg of messages) {
    detectConversationalPhrases(msg.content, topicsFound);
  }
}
