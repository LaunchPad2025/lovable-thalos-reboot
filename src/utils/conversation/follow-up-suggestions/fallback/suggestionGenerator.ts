
/**
 * Generate fallback suggestions based on detected intent
 */
import { detectUserIntent } from './intentDetector';

/**
 * Generate fallback suggestions based on general intent
 * @param combinedText The combined user query and AI response
 * @returns Array of fallback suggestion strings
 */
export function generateFallbackSuggestions(combinedText: string): string[] {
  const suggestions: string[] = [];
  const { isRegulationRelated, isIncidentRelated, isInspectionRelated } = detectUserIntent(combinedText);

  if (isRegulationRelated) {
    suggestions.push('Would you like a downloadable compliance documentation checklist for this regulation?');
  } else if (isIncidentRelated) {
    suggestions.push('Would you like a downloadable incident investigation form template?');
  } else if (isInspectionRelated) {
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
