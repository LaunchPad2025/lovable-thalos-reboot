
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

// Updated to properly handle async function
export const handleFallProtectionQuery = async (query: string): Promise<string | null> => {
  // This is an async version that calls the async implementation
  try {
    // Call the async function
    const result = await handleFallProtectionQueryImpl(query);
    if (result) {
      return result;
    }
    
    // Use the static fall protection response for fallback
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
