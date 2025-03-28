
/**
 * Backward compatibility layer for keyword analysis module
 * Imports from the new modular structure and re-exports for legacy usage
 */
import { findMatchingKeywords, getKeywordBasedSuggestions } from './keywords';

export { findMatchingKeywords, getKeywordBasedSuggestions };
