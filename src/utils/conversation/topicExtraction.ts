
import { Message } from '@/components/chatbot/types';

// Common safety topics for extraction
const safetyTopics = [
  'ppe', 'chemical', 'fall protection', 'lockout/tagout', 'confined space',
  'hazard communication', 'ergonomics', 'electrical safety', 'fire safety',
  'machine guarding', 'respiratory protection', 'hearing conservation',
  'bloodborne pathogens', 'emergency action plan', 'scaffolding', 'ladders',
  'forklift', 'crane', 'welding', 'excavation', 'trenching', 'asbestos',
  'lead', 'silica', 'radiation', 'hazardous waste', 'recordkeeping',
  'training', 'new employees', 'safety program', 'inspection', 'audit',
  'violation', 'fine', 'penalty', 'citation', 'compliance', 'standard'
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
    safetyTopics.forEach(topic => {
      if (content.includes(topic.toLowerCase()) && !topicsFound.includes(topic)) {
        topicsFound.push(topic);
      }
    });
  });
  
  return topicsFound;
}
