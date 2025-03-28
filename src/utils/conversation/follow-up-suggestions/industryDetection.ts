
/**
 * This file is kept for backward compatibility
 * Import and re-export everything from the new industry module
 */

import { safetyKeywords } from './constants';
import { 
  detectIndustryContext as detectIndustryContextImpl,
  getIndustrySpecificSuggestions as getIndustrySpecificSuggestionsImpl,
  getTopSafetyCategoriesByIndustry as getTopSafetyCategoriesByIndustryImpl,
  formatIndustryFallbackResponse as formatIndustryFallbackResponseImpl,
  industrySpecificKeywords,
  industryTopSafetyCategories,
  industrySpecificSuggestions
} from './industry';

// Re-export all functions and data structures for backward compatibility
export {
  industrySpecificKeywords,
  industryTopSafetyCategories,
  industrySpecificSuggestions
};

// Re-export the detect function
export const detectIndustryContext = detectIndustryContextImpl;

// Re-export the suggestion generator
export const getIndustrySpecificSuggestions = getIndustrySpecificSuggestionsImpl;

// Re-export the category function
export const getTopSafetyCategoriesByIndustry = getTopSafetyCategoriesByIndustryImpl;

// Re-export the response formatter
export const formatIndustryFallbackResponse = formatIndustryFallbackResponseImpl;
