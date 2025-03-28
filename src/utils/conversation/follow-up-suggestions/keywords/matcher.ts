
/**
 * Keyword matching utilities for follow-up suggestions
 */
import { safetyKeywords } from '../constants';

/**
 * Find matching safety keywords in the conversation text
 * @param combinedText The combined user query and AI response
 * @returns Array of matching keyword entries [keyword, questions]
 */
export function findMatchingKeywords(combinedText: string): [string, string[]][] {
  return Object.entries(safetyKeywords).filter(([keyword]) => 
    combinedText.includes(keyword)
  );
}
