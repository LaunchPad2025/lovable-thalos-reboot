
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
  
  // Handle direct citation queries for fall protection standards
  if (query.match(/\b(1926\.501|1910\.28)\b/i) || 
      query.toLowerCase().includes('osha 1926.501') || 
      query.toLowerCase().includes('osha 1910.28') ||
      query.toLowerCase().includes('cfr 1926.501') || 
      query.toLowerCase().includes('cfr 1910.28')) {
    
    // Determine which standard is being referenced
    const isCFR1926 = query.toLowerCase().includes('1926.501');
    
    if (isCFR1926) {
      return `**OSHA 29 CFR 1926.501 - Duty to have fall protection**

This is OSHA's primary fall protection standard for construction activities. Key requirements:

- Employers must provide fall protection systems when employees are working at heights of 6 feet or more above a lower level
- Acceptable protection includes guardrail systems, safety net systems, or personal fall arrest systems
- Specific provisions apply to:
  - Leading edges
  - Hoist areas (requires guardrail or personal fall arrest system)
  - Holes (must be protected by covers, guardrail systems, or fall arrest systems)
  - Formwork and reinforcing steel (requires fall protection at 6 feet or more)
  - Ramps and walkways (require guardrails when 6 feet or more above lower levels)
  - Excavations (protection required at depths of 6 feet or more)
  - Roofing work (specific requirements for steep and low-slope roofs)

Would you like more information about implementation requirements or training documentation?`;
    } else {
      return `**OSHA 29 CFR 1910.28 - Duty to have fall protection and falling object protection**

This is OSHA's general industry standard for fall protection. Key requirements:

- Employers must provide fall protection systems when employees are working at heights of 4 feet or more above a lower level
- Applies to walking-working surfaces in general industry settings
- Specific provisions for:
  - Unprotected sides and edges
  - Hoist areas (guardrail systems or personal fall arrest systems required)
  - Holes (must be guarded or covered)
  - Dockboards (fall protection or safe design required)
  - Runways and similar walkways (guardrail systems required when 4 feet or higher)
  - Dangerous equipment (fall protection required regardless of height)
  - Wall openings (fall protection required when drop is more than 4 feet)
  - Repair pits and assembly pits (specific floor marking and limited access requirements)

Would you like details on implementing this standard or specific equipment requirements?`;
    }
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

/**
 * Check if a query contains a direct OSHA citation format
 */
export const isDirectRegulationCitation = (query: string): boolean => {
  // Check for common citation patterns (e.g., 1910.119, 1926.501, 1915.12)
  const directCitationPattern = /\b\d{4}\.\d{1,3}\b/;
  
  // Check for formatted citation patterns (e.g., "OSHA 1910.119", "29 CFR 1926.501")
  const formattedCitationPattern = /\b(osha|cfr)\s+\d{4}\.\d{1,3}\b/i;
  
  return directCitationPattern.test(query) || formattedCitationPattern.test(query);
};

/**
 * Extract the regulation number from a query containing a citation
 */
export const extractRegulationNumber = (query: string): string | null => {
  // Extract direct citation like 1910.119
  const directMatch = query.match(/\b(\d{4}\.\d{1,3})\b/);
  if (directMatch) return directMatch[1];
  
  // Extract from formatted citation like "OSHA 1910.119"
  const formattedMatch = query.match(/\b(?:osha|cfr)\s+(\d{4}\.\d{1,3})\b/i);
  if (formattedMatch) return formattedMatch[1];
  
  return null;
};

