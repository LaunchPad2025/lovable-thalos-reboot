
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
    // Fall Protection - expanded with more detailed terms and conversational phrases
    'fall protection': [
      'fall protection', 'fall arrest', 'tie-off', 'harness', 'scaffold safety', '1926.501', 
      'lanyard', 'guardrail', 'safety net', 'anchor point', 'lifeline', 'leading edge', 
      'fall restraint', 'fall prevention', 'height requirement', 'roof work', 'elevated work',
      'fall distance', 'fall clearance', 'self-retracting', '1910.28', 'floor opening',
      'rooftop', 'height', 'feet', 'falling', 'prevent falls', 'need guardrails', 'needs harness'
    ],
    
    // Chemical Safety / HazCom - expanded with conversational terms
    'chemical safety': [
      'hazcom', 'hazard communication', 'sds', 'safety data sheet', 'chemical label', 
      'pictogram', 'ghs', 'chemical storage', 'flammable cabinet', '1910.1200',
      'hazardous chemical', 'corrosive', 'toxic', 'oxidizer', 'container labeling',
      'secondary container', 'chemical inventory', 'chemical compatibility',
      'label chemical', 'chemical containers', 'flammable materials', 'store chemicals',
      'post chemical hazards', 'chemical hazard'
    ],
    
    // Machine Safety & Lockout/Tagout with conversational terms
    'machine safety': [
      'lockout', 'tagout', 'loto', 'machine guarding', 'point of operation', 'energy control',
      'zero energy', 'energy isolation', '1910.147', 'authorized employee', 'affected employee',
      'power transmission', 'pinch point', 'nip point', 'group lockout', 'machine safety',
      'lock out machine', 'tagging out', 'authorized for lockout', 'typical loto', 'loto checklist'
    ],
    
    // Fire Safety & Egress with conversational phrases
    'fire safety': [
      'fire extinguisher', 'fire safety', 'emergency exit', 'exit route', 'evacuation',
      'fire alarm', 'sprinkler', 'fire suppression', '1910.157', 'fire prevention',
      'flammable storage', 'exit sign', 'emergency lighting', 'fire drill', 'fire classification',
      'class a fire', 'class b fire', 'class c fire', 'class d fire', 'class k fire',
      'need fire extinguisher', 'fire drill frequency', 'emergency evacuation'
    ],
    
    // Confined Spaces with conversational phrases
    'confined space': [
      'confined space', 'permit required', 'entry permit', 'atmospheric testing', 
      'attendant', 'entrant', 'entry supervisor', '1910.146', 'rescue plan',
      'ventilation', 'gas monitor', 'air monitoring', 'limited egress', 'hazardous atmosphere',
      'engulfment', 'configuration trap', 'oxygen deficient', 'oxygen enriched',
      'qualifies as confined space', 'permit for tank entry', 'tested before entering',
      'sign off on confined space', 'rescue requirements'
    ],
    
    // Personal Protective Equipment with conversational phrases
    'ppe': [
      'ppe', 'personal protective', 'hard hat', 'safety glasses', 'face shield', 'gloves',
      'safety shoes', 'steel toe', 'ear protection', 'hearing protection', '1910.132',
      'eye protection', 'hand protection', 'foot protection', 'protective clothing',
      'cut resistant', 'impact resistant', 'arc flash', 'welding helmet',
      'ppe required for welding', 'need respirator', 'gloves required', 'ppe training rules',
      'check ppe compliance'
    ],
    
    // Electrical Safety with conversational phrases
    'electrical safety': [
      'electrical safety', 'live work', 'energized', 'arc flash', 'shock hazard', 'gfci',
      'lockout', 'grounding', 'ground fault', '1910.333', 'insulated tools', 'qualified person',
      'nfpa 70e', 'approach boundary', 'limited approach', 'restricted approach', 'extension cord',
      'electrical hazard', 'electrical shock', 'electrical permit', 'hot work'
    ],
    
    // Incident Reporting with conversational phrases
    'incident reporting': [
      'incident report', 'accident report', 'near miss', 'osha 300', 'recordable',
      'first aid', 'injury log', 'fatality', 'hospitalization', 'amputation', 'loss of eye',
      '1904', 'reporting requirement', 'incident investigation', 'root cause', 'corrective action',
      'report accident', 'track incidents', 'document injury', 'record keeping'
    ],
    
    // Training & Documentation with conversational phrases
    'training': [
      'safety training', 'orientation', 'competent person', 'qualified person', 'certification',
      'refresher training', 'training record', 'documentation', 'training requirement',
      'initial training', 'annual training', 'training matrix', 'training calendar',
      'authorized trainer', 'train the trainer', 'verification',
      'training schedule', 'training frequency', 'document training', 'training logs'
    ],
    
    // Ergonomics with conversational phrases
    'ergonomics': [
      'ergonomics', 'ergonomic', 'musculoskeletal', 'carpal tunnel', 'repetitive motion',
      'lifting', 'manual handling', 'workstation design', 'keyboard height', 'monitor position',
      'back injury', 'strain', 'sprain', 'material handling', 'push pull', 'neutral posture',
      'ergonomic assessment', 'safe lifting', 'proper posture', 'ergonomic equipment'
    ],
    
    // Respiratory Protection with conversational phrases
    'respiratory protection': [
      'respirator', 'n95', 'scba', 'papr', 'air purifying', 'supplied air', 'fit test',
      'medical evaluation', 'cartridge', 'filter', '1910.134', 'breathing air', 'idlh',
      'assigned protection factor', 'change schedule', 'positive pressure', 'negative pressure',
      'need respirator', 'respirator program', 'facial hair respirator', 'respiratory hazard'
    ],
    
    // Emergency Planning with conversational phrases
    'emergency planning': [
      'emergency action plan', 'evacuation plan', 'shelter in place', 'emergency response',
      'fire drill', 'tornado drill', 'emergency contact', 'meeting point', 'assembly area',
      '1910.38', 'alarm system', 'notification system', 'emergency coordinator', 'first aid kit',
      'aed', 'emergency route', 'emergency exit',
      'emergency procedures', 'evacuation drill', 'emergency preparedness'
    ],
    
    // Industry-Specific Categories
    'construction': [
      'construction', 'scaffold', 'excavation', 'trenching', 'crane', 'rigging', 'steel erection',
      'concrete', 'demolition', 'welding', '1926', 'ladder safety', 'stairway', 'fall protection',
      'aerial lift', 'heavy equipment', 'operator certification',
      'job site', 'construction site', 'building site'
    ],
    
    'manufacturing': [
      'manufacturing', 'machine guarding', 'conveyor', 'robot', 'assembly line', 'press',
      'injection molding', 'forklift', 'material handling', 'lockout', 'process safety',
      'confined space', 'ergonomics', 'chemical safety',
      'production line', 'factory floor', 'manufacturing plant'
    ],
    
    'healthcare': [
      'healthcare', 'bloodborne pathogen', 'needlestick', 'sharps', 'patient handling',
      'radiation safety', 'laser safety', 'medication safety', 'infectious waste',
      '1910.1030', 'exposure control', 'universal precautions', 'isolation',
      'hospital safety', 'medical facility', 'laboratory safety'
    ],
    
    'mining': [
      'mining', 'msha', 'underground', 'surface mining', 'coal', 'metal', 'nonmetal',
      'ventilation', 'ground control', 'blasting', 'dust control', 'methane', 'respirable dust',
      'rock dust', 'self-rescuer', 'mine rescue',
      'mining operation', 'mining site', 'quarry'
    ]
  };
  
  // First check for direct safety category matches
  const directCategoryMatches: string[] = [];
  const matchedTerms: string[] = [];
  
  // Track all matching categories for possible multiple matches
  const allMatchedCategories: string[] = [];
  
  // Analyze for conversational patterns that might imply topics
  // These are common question patterns that indicate a safety domain
  const conversationalPatterns: Record<string, RegExp[]> = {
    'fall protection': [
      /height.*(require|need).*fall protection/i,
      /need.*harness.*(height|work)/i,
      /guardrail.*scaffold/i,
      /roof.*work.*safety/i,
      /prevent.*fall/i
    ],
    'chemical safety': [
      /label.*chemical/i,
      /chemical.*storage/i,
      /sds.*sheet/i,
      /ghs.*label/i,
      /store.*flammable/i
    ],
    'machine safety': [
      /lockout.*tagout/i,
      /lock.*out.*machine/i,
      /machine.*guarding/i,
      /loto.*procedure/i,
      /authorized.*lockout/i
    ],
    'confined space': [
      /confined.*space.*entry/i,
      /permit.*tank.*entry/i,
      /test.*before.*enter/i,
      /confined.*space.*rescue/i,
      /need.*permit.*space/i
    ],
    'ppe': [
      /ppe.*required/i,
      /need.*respirator/i,
      /gloves.*required/i,
      /welding.*ppe/i,
      /check.*ppe/i
    ]
  };
  
  // Check for conversational patterns first
  for (const [category, patterns] of Object.entries(conversationalPatterns)) {
    for (const pattern of patterns) {
      if (pattern.test(normalizedQuery)) {
        if (!directCategoryMatches.includes(category)) {
          directCategoryMatches.push(category);
          allMatchedCategories.push(category);
        }
        break;
      }
    }
  }
  
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
  return [];
};
