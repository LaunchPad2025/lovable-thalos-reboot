
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
  
  const result: string[] = [];
  
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
