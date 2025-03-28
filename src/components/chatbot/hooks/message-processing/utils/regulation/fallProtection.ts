
/**
 * Fall protection specific regulation handling
 * Includes direct citation references for fall protection standards
 */
import { supabase } from '@/lib/supabase';
import { isDirectRegulationCitation, extractRegulationNumber } from './citationMatcher';

// Export the citation detection functions
export { isDirectRegulationCitation, extractRegulationNumber };

/**
 * Check if a query is related to fall protection regulations
 */
export const isFallProtectionQuery = (query: string): boolean => {
  const fallProtectionTerms = [
    'fall protection', 'fall arrest', 'harness', 'lanyard',
    'guardrail', 'safety net', 'leading edge', 'roof safety',
    'fall prevention', 'lifeline', 'anchor point', 'fall restraint',
    'safety harness', 'tie off', 'fall distance', 'fall clearance',
    '1926.501', '1926.502', '1926.503', '1910.28', '1910.29'
  ];
  
  return fallProtectionTerms.some(term => 
    query.toLowerCase().includes(term.toLowerCase())
  );
};

/**
 * Process a query specifically about fall protection
 * Updated to be properly async
 */
export const handleFallProtectionQuery = async (query: string): Promise<string | null> => {
  // First check if it's a fall protection related query
  if (!isFallProtectionQuery(query)) {
    return null;
  }
  
  // If it's a direct citation to a fall protection standard, prioritize that
  if (isDirectRegulationCitation(query)) {
    const code = extractRegulationNumber(query);
    if (code && isFallProtectionCitation(code)) {
      try {
        // Try to find exact match by code
        const { data: regulations, error } = await supabase
          .from('regulations')
          .select('id, title, description, document_type, authority, source_url, category')
          .or(`code.eq.${code},alt_phrases.cs.{${code}}`)
          .limit(1);
          
        if (!error && regulations && regulations.length > 0) {
          return formatFallProtectionResponse(regulations[0], code);
        }
      } catch (error) {
        console.error('Error fetching fall protection regulation by code:', error);
      }
    }
  }
  
  // If not a direct citation or no match found, use general fall protection response
  return generateGeneralFallProtectionResponse(query);
};

/**
 * Check if a citation is related to fall protection standards
 */
const isFallProtectionCitation = (code: string): boolean => {
  const fallProtectionCodes = ['1926.501', '1926.502', '1926.503', '1910.28', '1910.29'];
  return fallProtectionCodes.some(c => code.includes(c));
};

/**
 * Format a response for a specific fall protection regulation
 */
const formatFallProtectionResponse = (regulation: any, code: string): string => {
  return `**${regulation.document_type || 'OSHA'} ${code} - ${regulation.title || 'Fall Protection Standard'}**

${regulation.description || 'This regulation addresses requirements for fall protection in construction and general industry.'}

Key requirements include:
- Use of fall protection systems at heights of 6 feet or more in construction (4 feet in general industry)
- Proper guardrail systems, safety net systems, or personal fall arrest systems
- Training for all workers at risk of falls
- Regular inspection of fall protection equipment
${regulation.authority ? `\nEnforced by: ${regulation.authority}` : ''}

Would you like more information about implementing a fall protection program or proper equipment usage?`;
};

/**
 * Generate a general response for fall protection queries
 */
const generateGeneralFallProtectionResponse = (query: string): string => {
  return `**OSHA Fall Protection Requirements**

OSHA requires fall protection at heights of 6 feet or more in construction (OSHA 1926.501) and 4 feet in general industry (OSHA 1910.28).

Key requirements include:
- Guardrail systems, safety net systems, or personal fall arrest systems
- Fall protection during work on leading edges, in hoist areas, near holes, on roofs, and around dangerous equipment
- Proper training on fall hazards and the use of fall protection systems
- Regular inspection and maintenance of fall protection equipment

Would you like more specific information about a particular aspect of fall protection requirements?`;
};
