

import { Message } from '@/components/chatbot/types';

// Common safety topics for extraction with enhanced fall protection recognition
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
  
  // Additional specialized topics
  'hazcom', 'sds', 'chemical inventory', 'container labeling', 'ghs',
  'loto', 'energy isolation', 'zero energy', 'permit space', 'atmospheric testing',
  'ventilation', 'rescue plan', 'air monitoring', 'fit test', 'scba',
  'n95', 'hard hat', 'safety glasses', 'face shield', 'cut resistant',
  'arc flash', 'gfci', 'grounding', 'excavation safety', 'soil classification',
  'shoring', 'sloping', 'benching', 'competent person', 'job hazard analysis'
];

// Fall protection specific terms that should always map to fall protection category
const fallProtectionTerms = [
  // Basic terms
  'fall arrest', 'harness', 'lanyard', 'anchor', 'tie-off', 
  'guardrail', 'safety net', 'scaffold', '1926.501', '1910.28',
  
  // Additional specific terms
  'leading edge', 'fall restraint', 'fall prevention', 'roof safety',
  'elevated work', 'floor opening', 'hole cover', 'fall distance', 
  'fall clearance', 'self-retracting', 'deceleration device',
  'horizontal lifeline', 'vertical lifeline', 'impact force',
  'free fall distance', 'fall protection plan'
];

/**
 * Extract key safety topics from conversation for better context management
 * This helps Paulie remain on topic and reference previous exchanges
 */
export function extractSafetyTopics(messages: Message[]): string[] {
  const topicsFound: string[] = [];
  
  // Look through recent messages (increased from 5 to 7 for better context memory)
  const recentMessages = messages.slice(-7);
  
  recentMessages.forEach(msg => {
    const content = msg.content.toLowerCase();
    
    // First check for fall protection specific terms to prioritize them
    for (const term of fallProtectionTerms) {
      if (content.includes(term) && !topicsFound.includes('fall protection')) {
        topicsFound.push('fall protection');
        break;
      }
    }
    
    // Check for height requirements which should map to fall protection
    if ((content.includes('feet') || content.includes('height') || content.includes('elevation')) && 
        (content.includes('requirement') || content.includes('standard') || content.includes('regulation')) && 
        !topicsFound.includes('fall protection')) {
      topicsFound.push('fall protection');
    }
    
    // Check for OSHA standards that map to fall protection
    if ((content.includes('1926.501') || content.includes('1926.502') || 
         content.includes('1910.28') || content.includes('1910.29')) && 
        !topicsFound.includes('fall protection')) {
      topicsFound.push('fall protection');
    }
    
    // Then check general safety topics
    safetyTopics.forEach(topic => {
      if (content.includes(topic.toLowerCase()) && !topicsFound.includes(topic)) {
        // Avoid duplicate entries and ensure proper categorization
        if (topic === 'fall arrest' || topic === 'harness' || topic === 'lanyard' || 
            topic === 'anchor point' || topic === 'guardrail' || topic === 'safety net') {
          // These are fall protection components, so add the parent category
          if (!topicsFound.includes('fall protection')) {
            topicsFound.push('fall protection');
          }
        } else {
          topicsFound.push(topic);
        }
      }
    });
  });
  
  return topicsFound;
}

