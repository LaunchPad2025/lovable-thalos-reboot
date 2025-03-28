
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
  const fallProtectionTerms = [
    'fall protection', 'fall arrest', 'tie-off', 'harness', 'scaffold safety', '1926.501', 
    'lanyard', 'guardrail', 'safety net', 'anchor point', 'lifeline', 'leading edge', 
    'fall restraint', 'fall prevention', 'height requirement'
  ];
  
  // Get direct matches for fall protection terms (these should override general extraction)
  const directFallProtectionMatches = fallProtectionTerms.filter(term => 
    normalizedQuery.includes(term)
  );
  
  // If we have direct fall protection matches, prioritize these with the category marker
  if (directFallProtectionMatches.length > 0) {
    return [...directFallProtectionMatches, 'fall protection'];
  }
  
  // Check for other specialized safety categories
  const specializedCategories: Record<string, string[]> = {
    'confined space': ['confined space', 'permit-required', 'entry permit', 'atmospheric testing'],
    'lockout/tagout': ['lockout', 'tagout', 'loto', 'energy control', 'energy isolation'],
    'respiratory protection': ['respirator', 'n95', 'scba', 'air-purifying', 'breathing air'],
    'excavation': ['excavation', 'trenching', 'shoring', 'sloping', 'benching'],
    'ladder safety': ['ladder', 'step ladder', 'extension ladder', 'fixed ladder', 'portable ladder'],
    'fire safety': ['fire extinguisher', 'fire safety', 'fire protection', 'class a fire', 'class b fire'],
    'bloodborne pathogens': ['bloodborne', 'needlestick', 'sharps', 'hepatitis b', 'biohazard'],
    'ppe': ['ppe', 'protective equipment', 'safety gear', 'eye protection', 'gloves']
  };
  
  const categoryMatches = Object.entries(specializedCategories)
    .filter(([_, terms]) => terms.some(term => normalizedQuery.includes(term)))
    .map(([category, _]) => category);
  
  // Split into words and filter out stop words
  const words = normalizedQuery.split(' ').filter(word => 
    word.length > 2 && !stopWords.includes(word)
  );
  
  // Find potential industry-specific terms
  const industryTerms = findIndustryTerms(normalizedQuery);
  
  // Combine all extracted terms while removing duplicates
  return [...new Set([...words, ...industryTerms, ...categoryMatches])];
};

/**
 * Find industry-specific terms in query
 */
export const findIndustryTerms = (query: string): string[] => {
  const industryTerms: Record<string, string[]> = {
    'construction': ['scaffold', 'ladder', 'fall', 'harness', 'excavation', 'trench', 'concrete', 'formwork', 'steel erection', 'demolition', 'crane', 'rigging'],
    'chemical': ['hazardous', 'chemical', 'toxic', 'ventilation', 'spill', 'corrosive', 'flammable', 'oxidizer', 'acid', 'base', 'solvent'],
    'electrical': ['electrical', 'voltage', 'circuit', 'lockout', 'tagout', 'arc flash', 'grounding', 'gfci', 'insulation', 'energized'],
    'healthcare': ['needle', 'bloodborne', 'pathogen', 'biohazard', 'patient handling', 'sharps', 'infectious', 'radiation', 'medication'],
    'manufacturing': ['machine', 'guard', 'robot', 'conveyor', 'amputation', 'press', 'lathe', 'mill', 'forklift', 'material handling'],
    'oil and gas': ['drilling', 'wellhead', 'pipeline', 'flammable', 'explosive', 'hydrogen sulfide', 'process safety', 'hot work'],
    'warehouse': ['forklift', 'pallet', 'racking', 'loading dock', 'material handling', 'order picker', 'reach truck', 'manual lifting']
  };
  
  // Special categories that need precise matching
  const specializedCategories: Record<string, string[]> = {
    'fall protection': [
      'fall protection', 'fall arrest', 'harness', 'lanyard', 'tie-off', 
      'guardrail', 'safety net', 'scaffold', '1926.501', '1910.28', 
      'leading edge', 'roof', 'height', 'elevated', 'anchor point', 'lifeline',
      'fall restraint', 'fall prevention', 'floor opening', 'hole cover'
    ],
    'ppe': [
      'ppe', 'personal protective', 'gloves', 'goggles', 'respirator', 
      'helmet', 'ear protection', 'hearing protection', 'face shield',
      'safety glasses', 'protective clothing', 'foot protection',
      'chemical resistant', 'cut resistant', 'impact resistant'
    ],
    'hazard communication': [
      'hazcom', 'chemical label', 'sds', 'safety data sheet', 'pictogram',
      'ghs', 'hazardous chemical', 'right to know', 'container label',
      'chemical inventory', 'secondary container', 'signal word'
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

