
/**
 * General topic detection from safety topics list
 */
import { safetyTopics } from './constants';
import { categoryMappings } from './categoryMappings';
import { Message } from '@/components/chatbot/types';

/**
 * Checks if a topic is a sub-topic of an already identified category
 */
export function isSubTopicOfExistingCategory(
  topic: string, 
  topicsFound: Set<string>
): boolean {
  // Check if this topic is a sub-topic of a category we've already identified
  const isMappedTopic = Object.keys(categoryMappings).includes(topic);
  
  if (isMappedTopic) {
    const parentCategory = categoryMappings[topic];
    return topicsFound.has(parentCategory);
  }
  
  return false;
}

/**
 * Detects general safety topics in content
 */
export function detectGeneralTopics(
  content: string, 
  topicsFound: Set<string>
): void {
  const contentLower = content.toLowerCase();
  
  // Check for general safety topics
  safetyTopics.forEach(topic => {
    if (contentLower.includes(topic.toLowerCase()) && !topicsFound.has(topic)) {
      // Skip if this is a sub-topic of a category we've already identified
      if (!isSubTopicOfExistingCategory(topic, topicsFound)) {
        topicsFound.add(topic);
      }
    }
  });
}

/**
 * Process all messages to detect general topics
 */
export function processGeneralTopics(
  messages: Message[],
  topicsFound: Set<string>
): void {
  for (const msg of messages) {
    detectGeneralTopics(msg.content, topicsFound);
  }
}
