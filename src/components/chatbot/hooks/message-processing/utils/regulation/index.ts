
/**
 * Main regulation matching module that brings together all sub-modules
 */
import { findExactRegulationMatch, findRegulationsByKeywords, logRegulationMatchFailure } from './databaseOperations';
import { extractKeyTerms, findIndustryTerms } from './keywordExtraction';
import { formatRegulationsResponse, formatRegulationResponse } from './responseFormatters';
import { findStaticRegulationMatch } from './staticRegulations';
import { checkRegulationExists } from '@/utils/regulationUtils';
import { handleFallProtectionQuery } from './fallProtection';

// Export all the components for backward compatibility
export {
  findExactRegulationMatch,
  findRegulationsByKeywords,
  extractKeyTerms,
  findIndustryTerms,
  formatRegulationsResponse,
  formatRegulationResponse,
  findStaticRegulationMatch,
  checkRegulationExists,
  logRegulationMatchFailure,
  handleFallProtectionQuery
};
