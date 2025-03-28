
/**
 * Fallback suggestion utilities when no specific keywords match
 */

/**
 * Generate fallback suggestions based on general intent
 * @param combinedText The combined user query and AI response
 * @returns Array of fallback suggestion strings
 */
export function generateFallbackSuggestions(combinedText: string): string[] {
  const suggestions: string[] = [];

  if (combinedText.includes('osha') || combinedText.includes('regulation')) {
    suggestions.push('Would you like a downloadable compliance documentation checklist for this regulation?');
  } else if (combinedText.includes('accident') || combinedText.includes('incident')) {
    suggestions.push('Would you like a downloadable incident investigation form template?');
  } else if (combinedText.includes('inspect') || combinedText.includes('audit')) {
    suggestions.push('Would you like a ready-to-use inspection form for this topic?');
  }
  
  // Add generic but still actionable follow-ups if needed
  if (suggestions.length === 0) {
    suggestions.push(
      'Would you like me to create a simple downloadable checklist for this topic?',
      'Should I help you develop a written procedure template for this?'
    );
  }
  
  return suggestions;
}

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
