
/**
 * Fall protection-specific detection logic
 */
import { fallProtectionTerms } from './constants';
import { Message } from '@/components/chatbot/types';

/**
 * Checks if the content contains fall protection related terms
 */
export function detectFallProtectionTopic(content: string): boolean {
  const contentLower = content.toLowerCase();
  
  // Check for direct fall protection terms
  for (const term of fallProtectionTerms) {
    if (contentLower.includes(term)) {
      return true;
    }
  }
  
  // Check for height requirements which should map to fall protection
  if ((contentLower.includes('feet') || 
       contentLower.includes('height') || 
       contentLower.includes('elevation')) && 
      (contentLower.includes('requirement') || 
       contentLower.includes('standard') || 
       contentLower.includes('regulation'))) {
    return true;
  }
  
  return false;
}

/**
 * Prioritizes fall protection detection in messages
 */
export function checkForFallProtectionTopics(messages: Message[]): boolean {
  for (const msg of messages) {
    if (detectFallProtectionTopic(msg.content)) {
      return true;
    }
  }
  
  return false;
}
