
/**
 * Intent detection for fallback suggestions
 */

/**
 * Detect user intent from combined conversation text
 * @param combinedText The combined user query and AI response
 * @returns Object with detected intents
 */
export function detectUserIntent(combinedText: string): {
  isRegulationRelated: boolean;
  isIncidentRelated: boolean;
  isInspectionRelated: boolean;
} {
  const lowerText = combinedText.toLowerCase();
  
  return {
    isRegulationRelated: lowerText.includes('osha') || lowerText.includes('regulation'),
    isIncidentRelated: lowerText.includes('accident') || lowerText.includes('incident'),
    isInspectionRelated: lowerText.includes('inspect') || lowerText.includes('audit')
  };
}
