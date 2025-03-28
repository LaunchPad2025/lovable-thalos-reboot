
import { Message } from '@/components/chatbot/types';

// Common safety topics for extraction with enhanced fall protection recognition
const safetyTopics = [
  'ppe', 'chemical', 'fall protection', 'lockout/tagout', 'confined space',
  'hazard communication', 'ergonomics', 'electrical safety', 'fire safety',
  'machine guarding', 'respiratory protection', 'hearing conservation',
  'bloodborne pathogens', 'emergency action plan', 'scaffolding', 'ladders',
  'forklift', 'crane', 'welding', 'excavation', 'trenching', 'asbestos',
  'lead', 'silica', 'radiation', 'hazardous waste', 'recordkeeping',
  'training', 'new employees', 'safety program', 'inspection', 'audit',
  'violation', 'fine', 'penalty', 'citation', 'compliance', 'standard',
  'fall arrest', 'harness', 'lanyard', 'anchor point', 'tie-off',
  'guardrail', 'safety net', '1926.501', '1910.28', 'leading edge'
];

// Fall protection specific terms that should always map to fall protection category
const fallProtectionTerms = [
  'fall arrest', 'harness', 'lanyard', 'anchor', 'tie-off', 
  'guardrail', 'safety net', 'scaffold', '1926.501', '1910.28'
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
    
    // Then check general safety topics
    safetyTopics.forEach(topic => {
      if (content.includes(topic.toLowerCase()) && !topicsFound.includes(topic)) {
        topicsFound.push(topic);
      }
    });
  });
  
  return topicsFound;
}
