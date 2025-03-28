
/**
 * Category-specific terms mapped to their parent categories
 */

// Category-specific terms mapped to their parent category
export const categoryMappings: Record<string, string> = {
  // Fall protection mappings
  'fall arrest': 'fall protection',
  'harness': 'fall protection',
  'lanyard': 'fall protection',
  'anchor point': 'fall protection',
  'tie-off': 'fall protection',
  'guardrail': 'fall protection',
  'safety net': 'fall protection',
  '1926.501': 'fall protection',
  '1910.28': 'fall protection',
  'leading edge': 'fall protection',
  'fall restraint': 'fall protection',
  'fall prevention': 'fall protection',
  'roof safety': 'fall protection',
  'elevated work': 'fall protection',
  'floor opening': 'fall protection',
  'hole cover': 'fall protection',
  'when is fall protection required': 'fall protection',
  'what height needs harness': 'fall protection',
  'need guardrails': 'fall protection',
  'rooftop work': 'fall protection',
  'prevent falls': 'fall protection',
  
  // Chemical safety mappings
  'hazcom': 'chemical safety',
  'sds': 'chemical safety',
  'safety data sheet': 'chemical safety',
  'ghs': 'chemical safety',
  'chemical inventory': 'chemical safety',
  'container labeling': 'chemical safety',
  'secondary container': 'chemical safety',
  'flammable storage': 'chemical safety',
  'chemical compatibility': 'chemical safety',
  'label chemical containers': 'chemical safety',
  'required in safety data sheet': 'chemical safety',
  'what does ghs mean': 'chemical safety',
  'store flammable materials': 'chemical safety',
  'post chemical hazards': 'chemical safety',
  
  // Machine safety mappings
  'lockout/tagout': 'machine safety',
  'loto': 'machine safety',
  'energy isolation': 'machine safety',
  'machine guarding': 'machine safety',
  'point of operation': 'machine safety',
  'what is loto': 'machine safety',
  'lock out machine': 'machine safety',
  'when is tagout required': 'machine safety',
  'authorized for lockout': 'machine safety',
  'typical loto checklist': 'machine safety',
  
  // Confined space mappings
  'permit space': 'confined space',
  'atmospheric testing': 'confined space',
  'entry permit': 'confined space',
  'attendant': 'confined space',
  'entrant': 'confined space',
  'qualifies as confined space': 'confined space',
  'permit for tank entry': 'confined space',
  'tested before entering': 'confined space',
  'sign off on confined space': 'confined space',
  'confined space rescue requirements': 'confined space',
  
  // PPE mappings
  'hard hat': 'ppe',
  'safety glasses': 'ppe',
  'face shield': 'ppe',
  'gloves': 'ppe',
  'safety shoes': 'ppe',
  'hearing protection': 'ppe',
  'protective clothing': 'ppe',
  'ppe required for welding': 'ppe',
  'need respirator': 'ppe',
  'gloves required': 'ppe',
  'ppe training rules': 'ppe',
  'check ppe compliance': 'ppe',
  
  // Map various standards to their categories
  '1910.1200': 'chemical safety',
  '1910.147': 'machine safety',
  '1910.146': 'confined space',
  '1910.132': 'ppe',
  '1910.134': 'respiratory protection',
  '1910.157': 'fire safety',
  '1910.1030': 'bloodborne pathogens'
};

// Conversational phrases mapped to specific topics
export const conversationalPhrases: Record<string, string[]> = {
  'fall protection': [
    'when is fall protection required', 
    'what height needs harness', 
    'need guardrails', 
    'rooftop work', 
    'prevent falls'
  ],
  'chemical safety': [
    'label chemical containers', 
    'required in safety data sheet', 
    'what does ghs mean', 
    'store flammable materials', 
    'post chemical hazards'
  ],
  'machine safety': [
    'what is loto', 
    'lock out machine', 
    'when is tagout required', 
    'authorized for lockout', 
    'typical loto checklist'
  ],
  'confined space': [
    'qualifies as confined space', 
    'permit for tank entry', 
    'tested before entering', 
    'sign off on confined space', 
    'confined space rescue requirements'
  ],
  'ppe': [
    'ppe required for welding', 
    'need respirator', 
    'gloves required', 
    'ppe training rules', 
    'check ppe compliance'
  ]
};
