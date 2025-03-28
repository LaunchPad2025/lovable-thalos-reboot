
/**
 * Handles keyword-based regulation search functionality
 */
import { supabase } from '@/lib/supabase';
import { formatRegulationsResponse } from '../responseFormatters';

/**
 * Search for regulations by keywords
 */
export const searchByKeywords = async (
  query: string,
  keyTerms: string[]
): Promise<{ 
  found: boolean; 
  regulations?: any[];
  response?: string;
}> => {
  if (keyTerms.length === 0) {
    console.log('No key terms extracted from query');
    return { found: false };
  }
  
  try {
    // Enhanced query to find regulations with overlapping keywords
    // Also checking alt_phrases for better conversational matching
    const { data: regulations, error } = await supabase
      .from('regulations')
      .select('id, title, description, document_type, authority, source_url, keywords, alt_phrases, category, updated_at, industry')
      .or(`keywords.cs.{${keyTerms.join(',')}},alt_phrases.cs.{${keyTerms.join(',')}}`)
      .order('updated_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching regulations with keywords:', error);
      
      // If the alt_phrases column doesn't exist or query fails, fallback to just checking keywords
      const { data: fallbackRegulations, error: fallbackError } = await supabase
        .from('regulations')
        .select('id, title, description, document_type, authority, source_url, keywords, category, updated_at, industry')
        .filter('keywords', 'cs', `{${keyTerms.join(',')}}`)
        .order('updated_at', { ascending: false });
      
      if (fallbackError) {
        console.error('Error in fallback regulation query:', fallbackError);
        return { found: false };
      }
      
      if (!fallbackRegulations || fallbackRegulations.length === 0) {
        console.log('No regulations with matching keywords found in database');
        return { found: false };
      }
      
      return { 
        found: true,
        regulations: fallbackRegulations,
      };
    }
    
    if (!regulations || regulations.length === 0) {
      console.log('No regulations with matching keywords found in database');
      return { found: false };
    }
    
    return {
      found: true,
      regulations
    };
  } catch (error) {
    console.error('Error in searchByKeywords:', error);
    return { found: false };
  }
};
