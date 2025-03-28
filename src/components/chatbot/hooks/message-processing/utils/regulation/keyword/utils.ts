
/**
 * Utility functions for keyword extraction
 */

/**
 * Common stop words to filter out from keyword extraction
 */
export const stopWords = [
  'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 
  'for', 'with', 'about', 'is', 'are', 'how', 'what', 'when', 
  'where', 'why', 'can', 'do', 'does', 'should', 'would', 'could', 'will'
];

/**
 * Normalize a query string by removing punctuation, extra spaces, etc.
 * 
 * @param query - The raw user query string
 * @returns Normalized query string
 */
export const normalizeQuery = (query: string): string => {
  return query.toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
};

/**
 * Extract words from a query, filtering out stop words
 * 
 * @param query - The normalized query string
 * @returns Array of meaningful words
 */
export const extractWords = (query: string): string[] => {
  return query.split(' ').filter(word => 
    word.length > 2 && !stopWords.includes(word)
  );
};
