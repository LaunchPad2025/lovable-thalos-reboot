
import { supabase } from '@/lib/supabase';
import { 
  isDirectRegulationCitation, 
  extractRegulationNumber 
} from '../../utils/regulation';
import { extractRequirements } from './requirementExtractor';

/**
 * Process direct regulation citations (e.g., 1910.119)
 */
export const processCitation = async (
  content: string,
  messageId: string
): Promise<{ 
  match: boolean; 
  response: string | null;
}> => {
  if (!isDirectRegulationCitation(content)) {
    return { match: false, response: null };
  }
  
  const regulationNumber = extractRegulationNumber(content);
  if (!regulationNumber) {
    return { match: false, response: null };
  }

  try {
    // Search for the regulation by citation in code, alt_phrases or title
    const { data: regulations, error } = await supabase
      .from('regulations')
      .select('id, title, description, document_type, authority, source_url, category, keywords')
      .or(`code.eq.${regulationNumber},alt_phrases.cs.{${regulationNumber}},title.ilike.%${regulationNumber}%`)
      .order('updated_at', { ascending: false })
      .limit(1);
    
    if (!error && regulations && regulations.length > 0) {
      const regulation = regulations[0];
      
      // Create a detailed response with citation format
      const response = `**${regulation.document_type || 'OSHA'} ${regulationNumber} - ${regulation.title || 'Regulation'}**

${regulation.description || 'This regulation establishes requirements for workplace safety and health.'}

Key requirements include:
- ${extractRequirements(regulation.description, regulation.keywords).join('\n- ')}
${regulation.authority ? `\nEnforced by: ${regulation.authority}` : ''}

Would you like more specific information about implementing this regulation or documentation requirements?`;
      
      // Update paulie_queries table with the response
      try {
        await supabase.from('paulie_queries').update({
          response: response,
          review_status: 'citation_match',
          notes: `Direct citation match: ${regulationNumber}`
        }).eq('message_id', messageId);
      } catch (logError) {
        console.error('Error logging citation match:', logError);
      }
      
      return {
        match: true,
        response: response
      };
    } else {
      // Log the failed citation match
      try {
        await supabase.from('regulation_match_failures').insert({
          question: content,
          notes: `Citation not found: ${regulationNumber}`,
          matched_keywords: [regulationNumber],
          timestamp: new Date().toISOString(),
          reviewed: false
        });
      } catch (logError) {
        console.error('Error logging citation match failure:', logError);
      }
      
      return { match: false, response: null };
    }
  } catch (error) {
    console.error('Error fetching regulation by citation:', error);
    return { match: false, response: null };
  }
};
