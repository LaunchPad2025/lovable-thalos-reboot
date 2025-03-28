

// This file is kept for backward compatibility
// Export everything from the new regulation module
export * from './regulation';

// Add explicit fall protection handling
import { getFallProtectionResponse } from './follow-up/topicResponses';

export const handleFallProtectionQuery = (query: string): string | null => {
  const fallProtectionTerms = [
    // Basic terms
    'fall protection', 'fall arrest', 'tie-off', 'harness', 'scaffold safety', 
    '1926.501', 'lanyard', 'guardrail', 'safety net', 'osha fall',
    
    // Additional specific terms
    'anchor point', 'lifeline', 'leading edge', 'fall restraint', 'fall prevention',
    'height requirement', 'roof safety', 'elevated work', '1910.28', 'walking-working',
    'floor opening', 'hole cover', 'fall distance', 'fall clearance', 'impact force',
    'self-retracting', 'deceleration device', 'horizontal lifeline', 'vertical lifeline',
    'fall protection plan', 'fall protection training', 'competent person fall'
  ];
  
  // Check if the query is related to fall protection
  // Enhanced to include partial matches for more complex queries
  if (fallProtectionTerms.some(term => query.toLowerCase().includes(term)) || 
      query.toLowerCase().includes('fall') && (
        query.toLowerCase().includes('height') || 
        query.toLowerCase().includes('feet') || 
        query.toLowerCase().includes('requirement') ||
        query.toLowerCase().includes('osha') || 
        query.toLowerCase().includes('protection') ||
        query.toLowerCase().includes('standard')
      )
     ) {
    return getFallProtectionResponse();
  }
  
  return null;
};

