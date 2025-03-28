
/**
 * Exact regulation matching functionality
 */
import { findRegulationsByKeywords } from './regulationSearch';
import { findStaticRegulationMatch } from './staticRegulations';

/**
 * Check for exact matches in regulatory database
 */
export const findExactRegulationMatch = async (query: string, userId?: string): Promise<string | null> => {
  // First try to match with database regulations based on keywords
  const matchResult = await findRegulationsByKeywords(query, userId);
  if (matchResult) {
    return matchResult;
  }

  // Fall back to static regulations if no database match
  return null;
};
