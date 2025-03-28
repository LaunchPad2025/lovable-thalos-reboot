
/**
 * Compatibility layer for fallback responses
 * This file re-exports the modular components from the new structure
 * to maintain backward compatibility
 */
import { 
  getDefaultResponse, 
  getPracticalSafetyGuidance, 
  getSpecializedFallbacks,
  getIndustrySpecificResponse
} from './fallback-responses';

// Re-export for backward compatibility
export { 
  getDefaultResponse, 
  getPracticalSafetyGuidance 
};
