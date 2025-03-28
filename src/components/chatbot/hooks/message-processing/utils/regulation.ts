
/**
 * Main regulation matching module that brings together all sub-modules
 */
import { findExactRegulationMatch, findRegulationsByKeywords, logRegulationMatchFailure } from './regulation/databaseOperations';
import { extractKeyTerms, findIndustryTerms } from './regulation/keywordExtraction';
import { formatRegulationsResponse, formatRegulationResponse } from './regulation/responseFormatters';
import { findStaticRegulationMatch } from './regulation/staticRegulations';
import { checkRegulationExists } from '@/utils/regulationUtils';
import { handleFallProtectionQuery } from './regulationMatching';

// Re-export for backward compatibility
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
