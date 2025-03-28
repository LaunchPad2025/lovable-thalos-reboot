
/**
 * Citation-based regulation search functionality
 */
import { supabase } from '@/lib/supabase';
import { formatRegulationResponse } from '../responseFormatters';
import { isDirectRegulationCitation, extractRegulationNumber } from '../citationMatcher';
import { generateOshaSourceLink } from '../responseFormatters';

/**
 * Search for regulations by citation reference
 */
export const searchByCitation = async (query: string): Promise<{ 
  found: boolean; 
  response?: string;
  regulation?: any;
}> => {
  if (!isDirectRegulationCitation(query)) {
    return { found: false };
  }
  
  const regulationNumber = extractRegulationNumber(query);
  if (!regulationNumber) {
    return { found: false };
  }
  
  try {
    // Search for the regulation by code, alt_phrases, or title
    const { data: regulations, error } = await supabase
      .from('regulations')
      .select('id, title, description, document_type, authority, source_url, keywords, category, code')
      .or(`code.eq.${regulationNumber},alt_phrases.cs.{${regulationNumber}},title.ilike.%${regulationNumber}%`)
      .order('updated_at', { ascending: false })
      .limit(1);
    
    if (error || !regulations || regulations.length === 0) {
      console.log('No regulation found for citation:', regulationNumber);
      return { found: false };
    }
    
    // Generate OSHA source link
    const oshaLink = generateOshaSourceLink(regulationNumber);
    const sourceLink = oshaLink ? `\n\n**[See full regulation: ${regulationNumber}](${oshaLink})**` : '';
    
    // Create formatted response for the regulation
    const regulation = regulations[0];
    const response = `**${regulation.document_type || 'OSHA'} ${regulationNumber} - ${regulation.title || 'Regulation'}**

${regulation.description || 'This regulation establishes requirements for workplace safety and health.'}${sourceLink}

Key requirements include:
- Regular inspections and documentation
- Employee training on hazard recognition
- Implementation of engineering controls
- Documentation of compliance efforts
${regulation.authority ? `\nEnforced by: ${regulation.authority}` : ''}

Would you like more specific information about implementing this regulation?`;
    
    return {
      found: true,
      response,
      regulation
    };
  } catch (error) {
    console.error('Error in searchByCitation:', error);
    return { found: false };
  }
};
