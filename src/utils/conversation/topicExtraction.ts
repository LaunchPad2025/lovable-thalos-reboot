
import { Message } from '@/components/chatbot/types';

// Comprehensive safety topics for extraction with enhanced recognition across all safety domains
const safetyTopics = [
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

// Category-specific terms mapped to their parent category
const categoryMappings: Record<string, string> = {
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

/**
 * Extract key safety topics from conversation for better context management
 * This helps Paulie remain on topic and reference previous exchanges
 */
export function extractSafetyTopics(messages: Message[]): string[] {
  const topicsFound: Set<string> = new Set();
  
  // Look through recent messages (up to 10 for better context memory)
  const recentMessages = messages.slice(-10);
  
  recentMessages.forEach(msg => {
    const content = msg.content.toLowerCase();
    
    // First check for fall protection specific terms to prioritize them
    if ((content.includes('fall protection') || content.includes('fall arrest') || 
         content.includes('harness') || content.includes('lanyard') || 
         content.includes('tie-off') || content.includes('1926.501')) && 
        !topicsFound.has('fall protection')) {
      topicsFound.add('fall protection');
    }
    
    // Check for height requirements which should map to fall protection
    if ((content.includes('feet') || content.includes('height') || content.includes('elevation')) && 
        (content.includes('requirement') || content.includes('standard') || content.includes('regulation')) && 
        !topicsFound.has('fall protection')) {
      topicsFound.add('fall protection');
    }
    
    // Check for standards that map to specific categories
    for (const [standard, category] of Object.entries({
      '1926.501': 'fall protection',
      '1910.28': 'fall protection', 
      '1910.1200': 'chemical safety',
      '1910.147': 'machine safety',
      '1910.146': 'confined space',
      '1910.132': 'ppe',
      '1910.134': 'respiratory protection'
    })) {
      if (content.includes(standard) && !topicsFound.has(category)) {
        topicsFound.add(category);
      }
    }
    
    // Check for conversational phrases that map to specific topics
    const conversationalPhrases: Record<string, string[]> = {
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
    
    for (const [category, phrases] of Object.entries(conversationalPhrases)) {
      for (const phrase of phrases) {
        if (content.includes(phrase) && !topicsFound.has(category)) {
          topicsFound.add(category);
          break;
        }
      }
    }
    
    // Check for category-specific terms and map to parent categories
    for (const [term, category] of Object.entries(categoryMappings)) {
      if (content.includes(term) && !topicsFound.has(category)) {
        topicsFound.add(category);
      }
    }
    
    // Then check general safety topics
    safetyTopics.forEach(topic => {
      if (content.includes(topic.toLowerCase()) && !topicsFound.has(topic)) {
        // Check if this topic is a sub-topic of a category we've already identified
        const isMappedTopic = Object.keys(categoryMappings).includes(topic);
        
        if (!isMappedTopic) {
          topicsFound.add(topic);
        }
      }
    });
  });
  
  return Array.from(topicsFound);
}
