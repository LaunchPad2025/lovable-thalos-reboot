
import { industrySpecificSuggestions, industryTopSafetyCategories } from './industryKeywords';

/**
 * Get industry-specific follow-up suggestions
 * Enhanced to provide more relevant suggestions based on industry context
 */
export const getIndustrySpecificSuggestions = (industry: string | null): string[] => {
  if (!industry || !industrySpecificSuggestions[industry]) {
    return [
      "What industry-specific safety regulations apply to your workplace?",
      "Are there any specific safety concerns in your industry I can help with?",
      "What type of work environment are you asking about?"
    ];
  }
  
  // Return industry-specific suggestions
  return industrySpecificSuggestions[industry].slice(0, 3);
};

/**
 * Get the top safety categories for a specific industry
 * Used for improved fallback responses when no exact regulation match is found
 */
export const getTopSafetyCategoriesByIndustry = (industry: string | null): string[] => {
  if (!industry || !industryTopSafetyCategories[industry]) {
    return [
      "Fall Protection",
      "Hazard Communication",
      "Respiratory Protection",
      "Machine Guarding",
      "Electrical Safety"
    ];
  }
  
  return industryTopSafetyCategories[industry].slice(0, 3);
};
