
/**
 * Main regulation matching module that brings together all sub-modules
 */
import { findExactRegulationMatch } from './regulation/exactMatch';
import { findRegulationsByKeywords } from './regulation/regulationSearch';
import { findRegulationsByIndustry } from './regulation/industrySearch';
import { extractKeyTerms, findIndustryTerms } from './regulation/keywordExtraction';
import { formatRegulationsResponse, formatRegulationResponse } from './regulation/responseFormatters';
import { findStaticRegulationMatch } from './regulation/staticRegulations';
import { checkRegulationExists } from '@/utils/regulationUtils';
import { logRegulationMatchFailure } from './regulation/loggingOperations';
import { 
  handleFallProtectionQuery, 
  isDirectRegulationCitation, 
  extractRegulationNumber 
} from './regulation/fallProtection';
import { 
  formatCitation,
  parseCitationParts
} from './regulation/citationMatcher';

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
  extractRegulationNumber,
  formatCitation,
  parseCitationParts
};
