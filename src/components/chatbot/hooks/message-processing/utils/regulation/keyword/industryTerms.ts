
/**
 * Industry-specific term detection for regulation matching
 */

/**
 * Find industry-specific terms in query
 * 
 * @param query - The user query string
 * @returns Array of industry-specific terms
 */
export const findIndustryTerms = (query: string): string[] => {
  const normalizedQuery = query.toLowerCase();
  
  // Detect refinery/oil & gas specific terms
  if (normalizedQuery.includes('refiner') || 
      normalizedQuery.includes('oil and gas') || 
      normalizedQuery.includes('oil & gas') || 
      normalizedQuery.includes('petroleum')) {
    return ['oil_gas', 'refinery', 'process safety', 'psm', 'hot work'];
  }
  
  // Construction industry
  if (normalizedQuery.includes('construction') ||
      normalizedQuery.includes('building site') ||
      normalizedQuery.includes('scaffold')) {
    return ['construction', 'fall protection', 'trenching', 'excavation'];
  }
  
  // Manufacturing industry
  if (normalizedQuery.includes('manufacturing') ||
      normalizedQuery.includes('factory') ||
      normalizedQuery.includes('production line')) {
    return ['manufacturing', 'machine guarding', 'lockout tagout'];
  }
  
  // Healthcare industry
  if (normalizedQuery.includes('healthcare') ||
      normalizedQuery.includes('hospital') ||
      normalizedQuery.includes('patient')) {
    return ['healthcare', 'bloodborne pathogens', 'sharps'];
  }
  
  // Default - no specific industry detected
  return [];
};
