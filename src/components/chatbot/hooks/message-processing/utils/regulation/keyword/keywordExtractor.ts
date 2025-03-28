
/**
 * Core keyword extraction functionality
 */
import { safetyCategories } from './safetyCategories';
import { detectConversationalPatterns } from './conversationalPatterns';
import { findIndustryTerms } from './industryTerms';
import { normalizeQuery, extractWords } from './utils';

/**
 * Extract key terms from user query for better matching
 * Enhanced with industry specific terms and conversational patterns
 * 
 * @param query - The raw user query string
 * @returns Array of extracted keywords
 */
export const extractKeyTerms = (query: string): string[] => {
  // Normalize the query
  const normalizedQuery = normalizeQuery(query);
  
  // Find direct category matches and specific terms
  const directCategoryMatches: string[] = [];
  const matchedTerms: string[] = [];
  
  // Track all matched categories
  const allMatchedCategories: string[] = [];
  
  // Check for conversational patterns first (highest priority)
  const patternMatches = detectConversationalPatterns(normalizedQuery);
  directCategoryMatches.push(...patternMatches);
  allMatchedCategories.push(...patternMatches);
  
  // Check for direct category mentions and specific terms
  Object.entries(safetyCategories).forEach(([category, terms]) => {
    // Check if query directly mentions the category
    if (normalizedQuery.includes(category)) {
      directCategoryMatches.push(category);
      allMatchedCategories.push(category);
    }
    
    // Check if query contains any of the specific terms
    const matchingTerms = terms.filter(term => normalizedQuery.includes(term));
    if (matchingTerms.length > 0) {
      matchedTerms.push(...matchingTerms);
      
      // Add the parent category for better context
      if (!directCategoryMatches.includes(category) && !allMatchedCategories.includes(category)) {
        allMatchedCategories.push(category);
      }
    }
  });
  
  // Handle multi-category matches - include all matched categories for better context
  if (allMatchedCategories.length > 1) {
    console.log(`Query matches multiple safety categories: ${allMatchedCategories.join(', ')}`);
  }
  
  // Find industry-specific terms
  const industryTerms = findIndustryTerms(normalizedQuery);
  
  // Extract general words after filtering stop words
  const words = extractWords(normalizedQuery);
  
  // Combine all extracted terms while removing duplicates
  // Prioritize matched safety category terms
  return [...new Set([
    ...directCategoryMatches, 
    ...matchedTerms, 
    ...allMatchedCategories, 
    ...words, 
    ...industryTerms
  ])];
};
