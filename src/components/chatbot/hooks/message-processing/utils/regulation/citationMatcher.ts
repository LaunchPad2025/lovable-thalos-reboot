
/**
 * Enhanced regulation citation matcher module
 * Provides accurate detection and extraction of OSHA regulation citations
 */

// Pattern for recognizing OSHA regulation citations
const CITATION_PATTERN = /\b(1910\.\d{1,4}|1926\.\d{1,4}|29 CFR \d{4}\.\d{1,4})\b/i;

/**
 * Check if a query contains a direct regulation citation
 */
export const isDirectRegulationCitation = (query: string): boolean => {
  return CITATION_PATTERN.test(query);
};

/**
 * Extract regulation code from a query containing a citation
 */
export const extractRegulationNumber = (query: string): string | null => {
  const matches = query.match(CITATION_PATTERN);
  if (matches && matches[0]) {
    // Extract and normalize the citation format
    let citation = matches[0];
    
    // If citation starts with "29 CFR", remove it to get just the number
    if (citation.toLowerCase().startsWith('29 cfr ')) {
      citation = citation.substring(7);
    }
    
    return citation.trim();
  }
  return null;
};

/**
 * Format a citation into a standardized form
 */
export const formatCitation = (citation: string): string => {
  // Remove "29 CFR" if present
  let formattedCitation = citation.replace(/29\s*CFR\s*/i, '');
  
  // Ensure proper formatting with dot
  if (!formattedCitation.includes('.')) {
    // Add dot between part and section (e.g. "1910120" -> "1910.120")
    formattedCitation = formattedCitation.replace(/(\d{4})(\d{1,4})/, '$1.$2');
  }
  
  return formattedCitation.trim();
};

/**
 * Parse query to get citation parts (part number, section, etc.)
 */
export const parseCitationParts = (citation: string): { part: string; section: string } => {
  const normalized = formatCitation(citation);
  const parts = normalized.split('.');
  
  return {
    part: parts[0] || '',
    section: parts[1] || ''
  };
};
