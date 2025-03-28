
/**
 * Main regulation matching module that brings together all sub-modules
 */
import { findExactRegulationMatch } from './exactMatch';
import { findRegulationsByKeywords } from './regulationSearch';
import { findRegulationsByIndustry } from './industrySearch';
import { extractKeyTerms, findIndustryTerms } from './keywordExtraction';
import { formatRegulationsResponse, formatRegulationResponse } from './responseFormatters';
import { findStaticRegulationMatch } from './staticRegulations';
import { checkRegulationExists } from '@/utils/regulationUtils';
import { logRegulationMatchFailure } from './loggingOperations';
import { handleFallProtectionQuery, isDirectRegulationCitation, extractRegulationNumber } from './fallProtection';

// Export all the components for backward compatibility
export {
  findExactRegulationMatch,
  findRegulationsByKeywords,
  findRegulationsByIndustry,
  extractKeyTerms,
  findIndustryTerms,
  formatRegulationsResponse,
  formatRegulationResponse,
  findStaticRegulationMatch,
  checkRegulationExists,
  logRegulationMatchFailure,
  handleFallProtectionQuery,
  isDirectRegulationCitation,
  extractRegulationNumber
};
