
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
  
  // Enhanced safety category matching - organized by safety domain
  const safetyCategories: Record<string, string[]> = {
    // Fall Protection - expanded with more detailed terms
    'fall protection': [
      'fall protection', 'fall arrest', 'tie-off', 'harness', 'scaffold safety', '1926.501', 
      'lanyard', 'guardrail', 'safety net', 'anchor point', 'lifeline', 'leading edge', 
      'fall restraint', 'fall prevention', 'height requirement', 'roof work', 'elevated work',
      'fall distance', 'fall clearance', 'self-retracting', '1910.28', 'floor opening'
    ],
    
    // Chemical Safety / HazCom
    'chemical safety': [
      'hazcom', 'hazard communication', 'sds', 'safety data sheet', 'chemical label', 
      'pictogram', 'ghs', 'chemical storage', 'flammable cabinet', '1910.1200',
      'hazardous chemical', 'corrosive', 'toxic', 'oxidizer', 'container labeling',
      'secondary container', 'chemical inventory', 'chemical compatibility'
    ],
    
    // Machine Safety & Lockout/Tagout
    'machine safety': [
      'lockout', 'tagout', 'loto', 'machine guarding', 'point of operation', 'energy control',
      'zero energy', 'energy isolation', '1910.147', 'authorized employee', 'affected employee',
      'power transmission', 'pinch point', 'nip point', 'group lockout', 'machine safety'
    ],
    
    // Fire Safety & Egress
    'fire safety': [
      'fire extinguisher', 'fire safety', 'emergency exit', 'exit route', 'evacuation',
      'fire alarm', 'sprinkler', 'fire suppression', '1910.157', 'fire prevention',
      'flammable storage', 'exit sign', 'emergency lighting', 'fire drill', 'fire classification',
      'class a fire', 'class b fire', 'class c fire', 'class d fire', 'class k fire'
    ],
    
    // Confined Spaces
    'confined space': [
      'confined space', 'permit required', 'entry permit', 'atmospheric testing', 
      'attendant', 'entrant', 'entry supervisor', '1910.146', 'rescue plan',
      'ventilation', 'gas monitor', 'air monitoring', 'limited egress', 'hazardous atmosphere',
      'engulfment', 'configuration trap', 'oxygen deficient', 'oxygen enriched'
    ],
    
    // Personal Protective Equipment
    'ppe': [
      'ppe', 'personal protective', 'hard hat', 'safety glasses', 'face shield', 'gloves',
      'safety shoes', 'steel toe', 'ear protection', 'hearing protection', '1910.132',
      'eye protection', 'hand protection', 'foot protection', 'protective clothing',
      'cut resistant', 'impact resistant', 'arc flash', 'welding helmet'
    ],
    
    // Electrical Safety
    'electrical safety': [
      'electrical safety', 'live work', 'energized', 'arc flash', 'shock hazard', 'gfci',
      'lockout', 'grounding', 'ground fault', '1910.333', 'insulated tools', 'qualified person',
      'nfpa 70e', 'approach boundary', 'limited approach', 'restricted approach', 'extension cord'
    ],
    
    // Incident Reporting
    'incident reporting': [
      'incident report', 'accident report', 'near miss', 'osha 300', 'recordable',
      'first aid', 'injury log', 'fatality', 'hospitalization', 'amputation', 'loss of eye',
      '1904', 'reporting requirement', 'incident investigation', 'root cause', 'corrective action'
    ],
    
    // Training & Documentation
    'training': [
      'safety training', 'orientation', 'competent person', 'qualified person', 'certification',
      'refresher training', 'training record', 'documentation', 'training requirement',
      'initial training', 'annual training', 'training matrix', 'training calendar',
      'authorized trainer', 'train the trainer', 'verification'
    ],
    
    // Ergonomics
    'ergonomics': [
      'ergonomics', 'ergonomic', 'musculoskeletal', 'carpal tunnel', 'repetitive motion',
      'lifting', 'manual handling', 'workstation design', 'keyboard height', 'monitor position',
      'back injury', 'strain', 'sprain', 'material handling', 'push pull', 'neutral posture'
    ],
    
    // Respiratory Protection
    'respiratory protection': [
      'respirator', 'n95', 'scba', 'papr', 'air purifying', 'supplied air', 'fit test',
      'medical evaluation', 'cartridge', 'filter', '1910.134', 'breathing air', 'idlh',
      'assigned protection factor', 'change schedule', 'positive pressure', 'negative pressure'
    ],
    
    // Emergency Planning
    'emergency planning': [
      'emergency action plan', 'evacuation plan', 'shelter in place', 'emergency response',
      'fire drill', 'tornado drill', 'emergency contact', 'meeting point', 'assembly area',
      '1910.38', 'alarm system', 'notification system', 'emergency coordinator', 'first aid kit',
      'aed', 'emergency route', 'emergency exit'
    ],
    
    // Industry-Specific Categories
    'construction': [
      'construction', 'scaffold', 'excavation', 'trenching', 'crane', 'rigging', 'steel erection',
      'concrete', 'demolition', 'welding', '1926', 'ladder safety', 'stairway', 'fall protection',
      'aerial lift', 'heavy equipment', 'operator certification'
    ],
    
    'manufacturing': [
      'manufacturing', 'machine guarding', 'conveyor', 'robot', 'assembly line', 'press',
      'injection molding', 'forklift', 'material handling', 'lockout', 'process safety',
      'confined space', 'ergonomics', 'chemical safety'
    ],
    
    'healthcare': [
      'healthcare', 'bloodborne pathogen', 'needlestick', 'sharps', 'patient handling',
      'radiation safety', 'laser safety', 'medication safety', 'infectious waste',
      '1910.1030', 'exposure control', 'universal precautions', 'isolation'
    ],
    
    'mining': [
      'mining', 'msha', 'underground', 'surface mining', 'coal', 'metal', 'nonmetal',
      'ventilation', 'ground control', 'blasting', 'dust control', 'methane', 'respirable dust',
      'rock dust', 'self-rescuer', 'mine rescue'
    ]
  };
  
  // First check for direct safety category matches
  const directCategoryMatches: string[] = [];
  const matchedTerms: string[] = [];
  
  // Track all matching categories for possible multiple matches
  const allMatchedCategories: string[] = [];
  
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
  
  // Split into words and filter out stop words for additional general keyword extraction
  const words = normalizedQuery.split(' ').filter(word => 
    word.length > 2 && !stopWords.includes(word)
  );
  
  // Find potential industry-specific terms
  const industryTerms = findIndustryTerms(normalizedQuery);
  
  // Combine all extracted terms while removing duplicates
  // Prioritize matched safety category terms
  return [...new Set([...directCategoryMatches, ...matchedTerms, ...allMatchedCategories, ...words, ...industryTerms])];
};

/**
 * Find industry-specific terms in query
 */
export const findIndustryTerms = (query: string): string[] => {
  const industryTerms: Record<string, string[]> = {
    'construction': [
      'scaffold', 'ladder', 'fall', 'harness', 'excavation', 'trench', 'concrete', 
      'formwork', 'steel erection', 'demolition', 'crane', 'rigging', 'rebar',
      'residential construction', 'commercial construction', 'roofing', 'framing'
    ],
    
    'chemical': [
      'hazardous', 'chemical', 'toxic', 'ventilation', 'spill', 'corrosive', 
      'flammable', 'oxidizer', 'acid', 'base', 'solvent', 'laboratory',
      'process safety', 'compatible storage', 'reactive', 'sds'
    ],
    
    'electrical': [
      'electrical', 'voltage', 'circuit', 'lockout', 'tagout', 'arc flash', 
      'grounding', 'gfci', 'insulation', 'energized', 'high voltage',
      'electrical panel', 'circuit breaker', 'power tool', 'extension cord'
    ],
    
    'healthcare': [
      'needle', 'bloodborne', 'pathogen', 'biohazard', 'patient handling', 
      'sharps', 'infectious', 'radiation', 'medication', 'mri', 'x-ray',
      'laser', 'anesthesia', 'operating room', 'specimen'
    ],
    
    'manufacturing': [
      'machine', 'guard', 'robot', 'conveyor', 'amputation', 'press', 'lathe', 
      'mill', 'forklift', 'material handling', 'assembly line', 'production',
      'automated', 'injection molding', 'cutting', 'forming'
    ],
    
    'oil and gas': [
      'drilling', 'wellhead', 'pipeline', 'flammable', 'explosive', 'hydrogen sulfide', 
      'process safety', 'hot work', 'confined space', 'offshore', 'refinery',
      'tank', 'pressure vessel', 'combustible', 'natural gas'
    ],
    
    'warehouse': [
      'forklift', 'pallet', 'racking', 'loading dock', 'material handling', 
      'order picker', 'reach truck', 'manual lifting', 'storage', 'inventory',
      'shipping', 'receiving', 'staging', 'conveyor', 'pallet jack'
    ],
    
    'office': [
      'ergonomic', 'workstation', 'keyboard', 'mouse', 'screen', 'monitor',
      'chair', 'desk', 'lighting', 'indoor air quality', 'eye strain',
      'carpal tunnel', 'posture', 'repetitive', 'stress'
    ],
    
    'mining': [
      'underground', 'surface', 'quarry', 'ventilation', 'dust', 'methane',
      'ground control', 'blasting', 'explosives', 'msha', 'conveyor',
      'haulage', 'highwall', 'respirable', 'self-rescuer'
    ]
  };
  
  // Find all matching industry terms
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
