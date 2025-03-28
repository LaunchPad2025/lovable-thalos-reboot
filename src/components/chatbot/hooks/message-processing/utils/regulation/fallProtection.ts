
/**
 * Specialized handling for fall protection related queries
 */

/**
 * Check if a query is specifically about fall protection and provide a targeted response
 */
export const handleFallProtectionQuery = (query: string): string | null => {
  const fallProtectionTerms = [
    'fall protection', 'fall arrest', 'harness', 'guardrail', 'safety net',
    '1926.501', '1910.28', 'roof', 'height requirement', 'fall distance'
  ];
  
  // Check if any fall protection terms are in the query
  const isFallProtectionQuery = fallProtectionTerms.some(term => 
    query.toLowerCase().includes(term.toLowerCase())
  );
  
  if (!isFallProtectionQuery) return null;
  
  // If query is about required height for fall protection
  if (query.toLowerCase().includes('height') && 
     (query.toLowerCase().includes('require') || query.toLowerCase().includes('need'))) {
    return `**OSHA Fall Protection Height Requirements**

OSHA specifies different height thresholds by industry:

1. **Construction industry**: 
   - 6 feet or more above a lower level (29 CFR 1926.501)
   - Includes residential construction applications

2. **General industry**: 
   - 4 feet or more above a lower level (29 CFR 1910.28)
   - Applies to most manufacturing and warehousing

3. **Shipyards**: 
   - 5 feet or more above a lower level
   - Special requirements for working over water

4. **Longshoring operations**: 
   - 8 feet or more above a lower level
   - Special considerations for dock and vessel work

5. **Special case**: 
   - Any height when working above dangerous equipment
   - Requires guardrails, fall restraint, or fall arrest systems

Would you like information on specific fall protection equipment requirements or implementation guidelines?`;
  }
  
  // Generic fall protection response
  return `**OSHA Fall Protection Requirements (29 CFR 1926.501 & 1910.28)**

OSHA requires fall protection at elevations of 6 feet or higher in construction (1926.501) and 4 feet in general industry (1910.28). Employers must provide one or more of these systems:

- Guardrail systems
- Safety net systems  
- Personal fall arrest systems (harness, lanyard, anchor)

Key requirements include:
- Equipment inspection before each use
- Training on proper use and limitations
- Regular maintenance and documentation
- Rescue planning when using personal fall arrest

Would you like a fall protection inspection checklist or a summary of OSHA 1926.501 requirements?`;
};
