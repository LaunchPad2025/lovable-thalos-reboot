
/**
 * Generate suggestions based on matching keywords
 */

/**
 * Generate suggestions based on matching safety keywords
 * @param matchingKeywords Array of matching keyword entries
 * @param maxSuggestions Maximum number of suggestions to return
 * @returns Array of suggestion strings
 */
export function getKeywordBasedSuggestions(
  matchingKeywords: [string, string[]][], 
  maxSuggestions: number = 3
): string[] {
  const suggestions: string[] = [];
  
  matchingKeywords.forEach(([keyword, questions]) => {
    if (suggestions.length < maxSuggestions) {
      // Add a relevant follow-up question that fits the context
      suggestions.push(questions[Math.floor(Math.random() * questions.length)]);
    }
  });
  
  return suggestions;
}
