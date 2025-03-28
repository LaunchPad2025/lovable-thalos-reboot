
// This file is kept for backward compatibility
// Export everything from the new regulation module
export * from './regulation';

// Add explicit fall protection handling
import { getFallProtectionResponse } from './follow-up/topicResponses';

export const handleFallProtectionQuery = (query: string): string | null => {
  const fallProtectionTerms = [
    'fall protection', 'fall arrest', 'tie-off', 'harness', 
    'scaffold safety', '1926.501', 'lanyard', 'guardrail',
    'safety net', 'osha fall', 'fall requirements'
  ];
  
  // Check if the query is related to fall protection
  if (fallProtectionTerms.some(term => query.toLowerCase().includes(term))) {
    return getFallProtectionResponse();
  }
  
  return null;
};
