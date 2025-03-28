
/**
 * Add practical follow-up suggestions to ensure actionable options
 */

/**
 * Add a generic practical follow-up if none exists
 * @param suggestions Current array of suggestions
 * @returns Updated array with practical follow-up added if needed
 */
export function ensurePracticalFollowUp(suggestions: string[]): string[] {
  if (!suggestions.some(s => s.includes("train"))) {
    suggestions.push('Would you like a quick training outline on this topic?');
  }
  return suggestions;
}
