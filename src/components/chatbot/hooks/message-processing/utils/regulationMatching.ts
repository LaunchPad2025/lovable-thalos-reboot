
// This file is kept for backward compatibility
// Export everything from the new regulation module
export * from './regulation';

// Add explicit fall protection handling
import { getFallProtectionResponse } from './follow-up/topicResponses';
import { 
  handleFallProtectionQuery as handleFallProtectionQueryImpl,
  isDirectRegulationCitation,
  extractRegulationNumber
} from './regulation/fallProtection';

export {
  isDirectRegulationCitation,
  extractRegulationNumber
};

export const handleFallProtectionQuery = (query: string): string | null => {
  // Sync version that calls the async implementation
  // This is kept for backward compatibility
  try {
    // Call the async function but return a synchronous result
    handleFallProtectionQueryImpl(query).then(
      result => result, 
      error => {
        console.error('Error in handleFallProtectionQuery:', error);
        return null;
      }
    );
    
    // Use the static fall protection response for synchronous contexts
    if (query.toLowerCase().includes('fall protection') || 
        query.toLowerCase().includes('fall arrest') ||
        query.toLowerCase().includes('1926.501')) {
      return getFallProtectionResponse(query);
    }
    
    return null;
  } catch (error) {
    console.error('Error in handleFallProtectionQuery:', error);
    return null;
  }
};
