
/**
 * Detector for category-specific terms in content
 */
import { categoryMappings } from './categoryMappings';
import { standardMappings } from './constants';
import { Message } from '@/components/chatbot/types';

/**
 * Detects category-specific terms in content
 */
export function detectCategoryTerms(
  content: string, 
  topicsFound: Set<string>
): void {
  const contentLower = content.toLowerCase();
  
  // Check for category-specific terms and map to parent categories
  for (const [term, category] of Object.entries(categoryMappings)) {
    if (contentLower.includes(term) && !topicsFound.has(category)) {
      topicsFound.add(category);
    }
  }
}

/**
 * Check content for standard references and map to categories
 */
export function detectStandardReferences(
  content: string,
  topicsFound: Set<string>
): void {
  const contentLower = content.toLowerCase();
  
  // Check for standards that map to specific categories
  for (const [standard, category] of Object.entries(standardMappings)) {
    if (contentLower.includes(standard) && !topicsFound.has(category)) {
      topicsFound.add(category);
    }
  }
}

/**
 * Process all messages to detect category-specific terms
 */
export function processCategoryTerms(
  messages: Message[],
  topicsFound: Set<string>
): void {
  for (const msg of messages) {
    detectCategoryTerms(msg.content, topicsFound);
    detectStandardReferences(msg.content, topicsFound);
  }
}
