
/**
 * Utilities for extracting keywords from user queries
 */

/**
 * Extract key terms from user query for better matching
 */
export const extractKeyTerms = (query: string): string[] => {
  const stopWords = ['a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'with', 'about', 'is', 'are', 'how', 'what', 'when', 'where', 'why', 'can', 'do', 'does', 'should', 'would', 'could', 'will'];
  
  // Remove punctuation and normalize
  const normalizedQuery = query.toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
  
  // Check for specific fall protection terms first - high priority matching
  const fallProtectionTerms = ['fall protection', 'fall arrest', 'tie-off', 'harness', 'scaffold safety', '1926.501', 'lanyard', 'guardrail', 'safety net'];
  
  // Get direct matches for fall protection terms (these should override general extraction)
  const directFallProtectionMatches = fallProtectionTerms.filter(term => 
    normalizedQuery.includes(term)
  );
  
  // If we have direct fall protection matches, prioritize these with the category marker
  if (directFallProtectionMatches.length > 0) {
    return [...directFallProtectionMatches, 'fall protection'];
  }
  
  // Split into words and filter out stop words
  const words = normalizedQuery.split(' ').filter(word => 
    word.length > 2 && !stopWords.includes(word)
  );
  
  // Find potential industry-specific terms
  const industryTerms = findIndustryTerms(normalizedQuery);
  
  return [...new Set([...words, ...industryTerms])];
};

/**
 * Find industry-specific terms in query
 */
export const findIndustryTerms = (query: string): string[] => {
  const industryTerms: Record<string, string[]> = {
    'construction': ['scaffold', 'ladder', 'fall', 'harness', 'excavation', 'trench'],
    'chemical': ['hazardous', 'chemical', 'toxic', 'ventilation', 'spill'],
    'electrical': ['electrical', 'voltage', 'circuit', 'lockout', 'tagout'],
    'healthcare': ['needle', 'bloodborne', 'pathogen', 'biohazard'],
    'manufacturing': ['machine', 'guard', 'robot', 'conveyor', 'amputation']
  };
  
  // Special categories that need precise matching
  const specializedCategories: Record<string, string[]> = {
    'fall protection': [
      'fall protection', 'fall arrest', 'harness', 'lanyard', 'tie-off', 
      'guardrail', 'safety net', 'scaffold', '1926.501', '1910.28', 
      'leading edge', 'roof', 'height', 'elevated'
    ],
    'ppe': [
      'ppe', 'personal protective', 'gloves', 'goggles', 'respirator', 
      'helmet', 'ear protection', 'hearing protection', 'face shield'
    ]
  };
  
  const result: string[] = [];
  
  // Check for specialized category matches first (higher priority)
  Object.entries(specializedCategories).forEach(([category, terms]) => {
    if (terms.some(term => query.toLowerCase().includes(term))) {
      // If it's a fall protection match, ensure we don't double-categorize as PPE
      if (category === 'fall protection') {
        // Don't add PPE as a category when we have fall protection terms
        result.push(category);
        return;
      }
      result.push(category);
    }
  });
  
  // Check for industry category matches
  Object.keys(industryTerms).forEach(industry => {
    if (query.toLowerCase().includes(industry)) {
      result.push(industry);
    }
    
    // Check for terms within each industry
    industryTerms[industry].forEach(term => {
      if (query.toLowerCase().includes(term)) {
        result.push(term);
        // Also include the parent industry for better context
        if (!result.includes(industry)) {
          result.push(industry);
        }
      }
    });
  });
  
  return result;
};
