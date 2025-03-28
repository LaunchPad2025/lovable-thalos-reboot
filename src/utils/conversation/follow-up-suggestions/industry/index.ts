
/**
 * Industry detection and suggestion module
 * Provides utilities for detecting industry context and generating industry-specific responses
 */

// Export core detection functionality
export { detectIndustryContext } from './industryDetector';

// Export suggestion generation utilities
export { 
  getIndustrySpecificSuggestions, 
  getTopSafetyCategoriesByIndustry 
} from './suggestionGenerator';

// Export response formatting utilities
export { formatIndustryFallbackResponse } from './responseFormatter';

// Export data structures for direct access if needed
export {
  industrySpecificKeywords,
  industryTopSafetyCategories,
  industrySpecificSuggestions
} from './industryKeywords';
