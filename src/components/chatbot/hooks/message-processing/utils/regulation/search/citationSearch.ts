
/**
 * Handles direct regulation citation search functionality
 */
import { supabase } from '@/lib/supabase';
import { isDirectRegulationCitation, extractRegulationNumber } from '../citationMatcher';
import { formatRegulationsResponse } from '../responseFormatters';

/**
 * Search for regulations by direct citation (e.g., 1910.119)
 */
export const searchByCitation = async (
  query: string
): Promise<{ 
  found: boolean; 
  regulations?: any[];
  regulationCode?: string;
  response?: string;
}> => {
  // Check if the query contains a direct citation
  if (!isDirectRegulationCitation(query)) {
    return { found: false };
  }

  const regulationCode = extractRegulationNumber(query);
  if (!regulationCode) {
    return { found: false };
  }

  console.log('Detected direct regulation citation:', regulationCode);
  
  try {
    // Try to find the regulation by code
    const { data: regulationByCode, error: codeError } = await supabase
      .from('regulations')
      .select('id, title, description, document_type, authority, source_url, keywords, alt_phrases, category, updated_at, industry')
      .or(`code.eq.${regulationCode},alt_phrases.cs.{${regulationCode}}`)
      .order('updated_at', { ascending: false })
      .limit(1);
      
    if (!codeError && regulationByCode && regulationByCode.length > 0) {
      // We found a direct match by code
      return { 
        found: true, 
        regulations: regulationByCode,
        regulationCode,
        response: formatRegulationsResponse(regulationByCode, query, [regulationCode], [])
      };
    }
    
    // Also try looking in title (many regulations have their code in the title)
    const { data: regulationByTitle, error: titleError } = await supabase
      .from('regulations')
      .select('id, title, description, document_type, authority, source_url, keywords, alt_phrases, category, updated_at, industry')
      .ilike('title', `%${regulationCode}%`)
      .order('updated_at', { ascending: false })
      .limit(1);
      
    if (!titleError && regulationByTitle && regulationByTitle.length > 0) {
      return { 
        found: true,
        regulations: regulationByTitle,
        regulationCode,
        response: formatRegulationsResponse(regulationByTitle, query, [regulationCode], []) 
      };
    }
  } catch (error) {
    console.error('Error searching by citation:', error);
  }
  
  return { found: false, regulationCode };
};
