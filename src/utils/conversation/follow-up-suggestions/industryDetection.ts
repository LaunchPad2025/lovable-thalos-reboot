
/**
 * Industry detection utilities for follow-up suggestions
 */
import { industrySpecificKeywords, industrySpecificSuggestions } from './constants';

/**
 * Detect industry context from conversation
 * @param combinedText The combined user query and AI response
 * @returns Detected industry or null if none detected
 */
export function detectIndustry(combinedText: string): string | null {
  for (const [industry, keywords] of Object.entries(industrySpecificKeywords)) {
    if (keywords.some(kw => combinedText.includes(kw)) || combinedText.includes(industry)) {
      return industry;
    }
  }
  return null;
}

/**
 * Get industry-specific suggestion based on detected industry
 * @param detectedIndustry The industry detected from conversation
 * @returns A random industry-specific suggestion or null if industry not found
 */
export function getIndustrySuggestion(detectedIndustry: string): string | null {
  if (!detectedIndustry) return null;
  
  const suggestions = industrySpecificSuggestions[detectedIndustry as keyof typeof industrySpecificSuggestions];
  if (suggestions) {
    return suggestions[Math.floor(Math.random() * suggestions.length)];
  }
  
  return null;
}
