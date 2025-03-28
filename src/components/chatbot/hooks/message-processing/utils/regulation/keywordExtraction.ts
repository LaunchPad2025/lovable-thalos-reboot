
/**
 * Entry point for keyword extraction functionality
 * Acts as a re-export layer for backward compatibility
 */

import { extractKeyTerms } from './keyword/keywordExtractor';
import { findIndustryTerms } from './keyword/industryTerms';

export { extractKeyTerms, findIndustryTerms };
