
import { supabase } from '@/lib/supabase';
import { isDirectRegulationCitation, extractRegulationNumber } from '../../utils/regulation';

/**
 * Handle potential direct regulation citations in user query
 */
export const handleCitationMatch = async (
  content: string,
  messageId: string
): Promise<{ 
  matched: boolean; 
  response?: string;
  followUpSuggestions?: string[];
}> => {
  // First check if the query contains a direct regulation citation
  if (isDirectRegulationCitation(content)) {
    const regulationNumber = extractRegulationNumber(content);
    if (regulationNumber) {
      console.log(`Detected direct regulation citation: ${regulationNumber}`);
      
      try {
        // Try to find the exact regulation by citation number in alt_phrases
        const { data: matchedRegulations, error } = await supabase
          .from('regulations')
          .select('id, title, description, document_type, authority, source_url, category')
          .or(`alt_phrases.cs.{${regulationNumber}},title.ilike.%${regulationNumber}%,description.ilike.%${regulationNumber}%`)
          .order('updated_at', { ascending: false })
          .limit(1);
        
        if (!error && matchedRegulations && matchedRegulations.length > 0) {
          const regulation = matchedRegulations[0];
          
          // Create a targeted response with the citation
          const response = `**${regulation.document_type || 'OSHA'} ${regulationNumber} - ${regulation.title || 'Regulation'}**

${regulation.description || 'This regulation establishes requirements for workplace safety and health.'}

Key requirements include:
- Regular inspections and documentation
- Employee training on hazard recognition and safe work practices
- Implementation of engineering and administrative controls
- Appropriate personal protective equipment (PPE)
${regulation.authority ? `\nEnforced by: ${regulation.authority}` : ''}

Would you like more specific information about implementing this regulation or documentation requirements?`;
          
          // Log the successful citation match
          try {
            await supabase.from('paulie_queries').update({
              response,
              review_status: 'citation_match',
              notes: `Direct citation match: ${regulationNumber}`
            }).eq('message_id', messageId);
          } catch (logError) {
            console.error('Error logging citation match:', logError);
          }
          
          // Return citation-specific follow-up suggestions
          return {
            matched: true,
            response,
            followUpSuggestions: [
              `What are the documentation requirements for ${regulationNumber}?`,
              `What training is required for compliance with ${regulationNumber}?`,
              `Are there any exceptions to ${regulationNumber}?`
            ]
          };
        }
      } catch (error) {
        console.error("Error fetching regulation by citation:", error);
      }
    }
  }
  
  return { matched: false };
};
