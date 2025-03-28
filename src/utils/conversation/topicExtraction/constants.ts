
/**
 * Constants used for safety topic extraction
 */

// Comprehensive safety topics for extraction with enhanced recognition across all safety domains
export const safetyTopics = [
  // General safety topics
  'ppe', 'chemical', 'fall protection', 'lockout/tagout', 'confined space',
  'hazard communication', 'ergonomics', 'electrical safety', 'fire safety',
  'machine guarding', 'respiratory protection', 'hearing conservation',
  'bloodborne pathogens', 'emergency action plan', 'scaffolding', 'ladders',
  'forklift', 'crane', 'welding', 'excavation', 'trenching', 'asbestos',
  'lead', 'silica', 'radiation', 'hazardous waste', 'recordkeeping',
  'training', 'new employees', 'safety program', 'inspection', 'audit',
  'violation', 'fine', 'penalty', 'citation', 'compliance', 'standard',
  
  // Enhanced fall protection topics
  'fall arrest', 'harness', 'lanyard', 'anchor point', 'tie-off',
  'guardrail', 'safety net', '1926.501', '1910.28', 'leading edge',
  'fall restraint', 'fall prevention', 'roof safety', 'elevated work',
  'floor opening', 'hole cover', 'fall distance', 'self-retracting',
  'horizontal lifeline', 'vertical lifeline', 'fall clearance',
  
  // Enhanced chemical safety / HazCom topics
  'hazcom', 'sds', 'chemical inventory', 'container labeling', 'ghs',
  'flammable storage', 'corrosive', 'oxidizer', 'toxic', 'safety data sheet',
  'secondary container', 'chemical compatibility', 'pictogram', 'signal word',
  
  // Enhanced machine safety topics
  'loto', 'energy isolation', 'zero energy', 'authorized employee',
  'affected employee', 'machine guarding', 'point of operation', 'nip point',
  'power transmission', 'lockout device', 'tagout device', 'group lockout',
  
  // Enhanced confined space topics
  'permit space', 'atmospheric testing', 'ventilation', 'rescue plan', 
  'air monitoring', 'attendant', 'entrant', 'entry supervisor', 'engulfment',
  'oxygen deficient', 'oxygen enriched', 'hazardous atmosphere',
  
  // Enhanced fire safety topics
  'fire extinguisher', 'sprinkler', 'fire alarm', 'emergency exit',
  'evacuation route', 'fire drill', 'fire classification', 'fire prevention',
  'class a fire', 'class b fire', 'class c fire', 'class d fire', 'class k fire',
  
  // Enhanced respiratory protection topics
  'fit test', 'scba', 'air-purifying', 'breathing air', 'n95', 'papr',
  'medical evaluation', 'cartridge', 'filter', 'assigned protection factor',
  
  // Enhanced electrical safety topics
  'arc flash', 'gfci', 'grounding', 'energized', 'live work', 'shock hazard',
  'approach boundary', 'limited approach', 'restricted approach', 'qualified person',
  
  // Enhanced incident reporting topics
  'near miss', 'osha 300', 'recordable', 'first aid', 'incident investigation',
  'root cause', 'corrective action', 'fatality', 'hospitalization', 'amputation',
  
  // New conversational phrases (alternative expressions)
  'when is fall protection required', 'what height needs harness', 'need guardrails',
  'rooftop work', 'prevent falls', 'label chemical containers', 'required in safety data sheet',
  'what does ghs mean', 'store flammable materials', 'post chemical hazards',
  'what is loto', 'lock out machine', 'when is tagout required', 'authorized for lockout',
  'typical loto checklist', 'qualifies as confined space', 'permit for tank entry',
  'tested before entering', 'sign off on confined space', 'confined space rescue requirements',
  'ppe required for welding', 'need respirator', 'gloves required', 'ppe training rules',
  'check ppe compliance',
  
  // Industry-specific topics
  'construction safety', 'manufacturing safety', 'healthcare safety', 'laboratory safety',
  'office safety', 'warehouse safety', 'mining safety', 'oil and gas safety',
  'retail safety', 'food service safety', 'agricultural safety', 'logging safety'
];

// Standard-specific mappings
export const standardMappings: Record<string, string> = {
  '1910.1200': 'chemical safety',
  '1910.147': 'machine safety',
  '1910.146': 'confined space',
  '1910.132': 'ppe',
  '1910.134': 'respiratory protection',
  '1910.157': 'fire safety',
  '1910.1030': 'bloodborne pathogens'
};

// Fall-protection specific terms for prioritization
export const fallProtectionTerms = [
  'fall protection', 'fall arrest', 'harness', 'lanyard', 
  'tie-off', '1926.501', 'feet', 'height', 'elevation'
];
