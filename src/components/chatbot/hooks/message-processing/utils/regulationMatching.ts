
// This file is kept for backward compatibility
// Export everything from the new regulation module
export * from './regulation';

// Add explicit fall protection handling
import { getFallProtectionResponse } from './follow-up/topicResponses';

export const handleFallProtectionQuery = (query: string): string | null => {
  // Import the implementation from the new module structure
  const { handleFallProtectionQuery: handleFallProtectionQueryImpl } = require('./regulation/fallProtection');
  return handleFallProtectionQueryImpl(query);
};
