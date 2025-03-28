
/**
 * Main regulation matching module that brings together all sub-modules
 */
import { findExactRegulationMatch, findRegulationsByKeywords } from './databaseOperations';
import { extractKeyTerms, findIndustryTerms } from './keywordExtraction';
import { formatRegulationsResponse, formatRegulationResponse } from './responseFormatters';
import { findStaticRegulationMatch } from './staticRegulations';
import { checkRegulationExists } from '@/utils/regulationUtils';

// Re-export for backward compatibility
export {
  findExactRegulationMatch,
  findRegulationsByKeywords,
  extractKeyTerms,
  findIndustryTerms,
  formatRegulationsResponse,
  formatRegulationResponse,
  findStaticRegulationMatch,
  checkRegulationExists
};
