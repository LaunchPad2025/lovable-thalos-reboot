
import { supabase } from '@/lib/supabase';
import { 
  isDirectRegulationCitation, 
  extractRegulationNumber,
  formatCitation
} from '../../utils/regulation/citationMatcher';

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
        // Try to find the exact regulation by citation number in code or alt_phrases
        const { data: matchedRegulations, error } = await supabase
          .from('regulations')
          .select('id, title, description, document_type, authority, source_url, category, keywords')
          .or(`code.eq.${regulationNumber},alt_phrases.cs.{${regulationNumber}},title.ilike.%${regulationNumber}%`)
          .order('updated_at', { ascending: false })
          .limit(1);
        
        if (!error && matchedRegulations && matchedRegulations.length > 0) {
          const regulation = matchedRegulations[0];
          
          // Create a targeted response with the citation
          const response = `**${regulation.document_type || 'OSHA'} ${regulationNumber} - ${regulation.title || 'Regulation'}**

${regulation.description || 'This regulation establishes requirements for workplace safety and health.'}

Key requirements include:
${generateKeyRequirements(regulation.keywords, regulation.description)}
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
          
          // Get topic from regulation to generate better follow-up suggestions
          const topic = detectTopicFromRegulation(regulation);
          
          // Return citation-specific follow-up suggestions
          return {
            matched: true,
            response,
            followUpSuggestions: generateFollowUpsForTopic(regulationNumber, topic)
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
        }
      } catch (error) {
        console.error("Error fetching regulation by citation:", error);
      }
    }
  }
  
  return { matched: false };
};

/**
 * Generate key requirements based on keywords and description
 */
const generateKeyRequirements = (keywords: string[] | null, description: string | null): string => {
  // Default requirements that apply to most regulations
  const defaultRequirements = [
    "Regular inspections and documentation",
    "Employee training on hazard recognition and safe work practices",
    "Implementation of engineering and administrative controls",
    "Appropriate personal protective equipment (PPE)"
  ];
  
  // If we have keywords, use them to generate more specific requirements
  if (keywords && keywords.length > 0) {
    // Special case for HAZWOPER
    if (keywords.includes('HAZWOPER') || keywords.includes('hazardous waste operations')) {
      return `- HAZWOPER training (40 hours for hazardous waste workers, 24 hours for occasional site workers)
- Site-specific health and safety plans
- Medical surveillance program for exposed workers
- Emergency response procedures and decontamination facilities
- Air monitoring and hazard assessment`;
    }
    
    // Special case for Confined Spaces
    if (keywords.includes('confined space') || keywords.includes('permit space')) {
      return `- Written permit space program
- Identification and evaluation of permit spaces
- Entry permits and procedures
- Trained attendants, entrants, and supervisors
- Testing and monitoring of atmospheric hazards
- Rescue and emergency services`;
    }
    
    // Special case for Fall Protection
    if (keywords.includes('fall protection') || keywords.includes('fall prevention')) {
      return `- Protection required at heights of 6 feet (construction) or 4 feet (general industry)
- Guardrail systems, safety net systems, or personal fall arrest systems
- Training on fall hazards and protective measures
- Regular inspection of fall protection equipment
- Fall protection plans for leading edge work`;
    }
  }
  
  // Extract specific requirements from description if possible
  if (description && description.length > 100) {
    const sentences = description.split(/\.\s+/);
    const requirementSentences = sentences.filter(s => 
      s.includes('require') || s.includes('must') || s.includes('shall')
    );
    
    if (requirementSentences.length >= 3) {
      return requirementSentences.slice(0, 4).map(s => `- ${s.trim()}`).join('\n');
    }
  }
  
  // Fall back to default requirements
  return defaultRequirements.map(req => `- ${req}`).join('\n');
};

/**
 * Detect topic from regulation metadata
 */
const detectTopicFromRegulation = (regulation: any): string => {
  // Try to extract topic from various fields
  const category = regulation.category?.toLowerCase() || '';
  const title = regulation.title?.toLowerCase() || '';
  const keywords = regulation.keywords || [];
  
  // Check for common safety topics
  if (category.includes('fall') || title.includes('fall') || keywords.some(k => k.includes('fall'))) {
    return 'fall protection';
  }
  
  if (category.includes('hazard') && (category.includes('communication') || category.includes('com'))) {
    return 'hazcom';
  }
  
  if (title.includes('confined space') || keywords.some(k => k.includes('confined space'))) {
    return 'confined space';
  }
  
  if (title.includes('hazardous waste') || keywords.some(k => k.includes('hazwoper'))) {
    return 'hazwoper';
  }
  
  if (category.includes('ppe') || title.includes('protective equipment')) {
    return 'ppe';
  }
  
  // Default topic based on category or empty string if not found
  return category || '';
};

/**
 * Generate follow-up suggestions based on regulation topic
 */
const generateFollowUpsForTopic = (regulationNumber: string, topic: string): string[] => {
  const commonSuggestions = [
    `What are the documentation requirements for ${regulationNumber}?`,
    `What training is required for compliance with ${regulationNumber}?`,
    `Are there any exceptions to ${regulationNumber}?`
  ];
  
  // Topic-specific follow-ups
  switch (topic) {
    case 'fall protection':
      return [
        `What height requires fall protection under ${regulationNumber}?`,
        `What types of fall protection systems meet ${regulationNumber} requirements?`,
        `How often should fall protection equipment be inspected?`
      ];
      
    case 'hazcom':
      return [
        `What GHS labeling is required under ${regulationNumber}?`,
        `How should Safety Data Sheets be managed according to ${regulationNumber}?`,
        `What chemical inventory requirements are in ${regulationNumber}?`
      ];
      
    case 'confined space':
      return [
        `What atmospheric testing is required by ${regulationNumber}?`,
        `What are the attendant responsibilities under ${regulationNumber}?`,
        `How do I develop a confined space rescue plan per ${regulationNumber}?`
      ];
      
    case 'hazwoper':
      return [
        `What levels of HAZWOPER training are required in ${regulationNumber}?`,
        `What medical surveillance is needed under ${regulationNumber}?`,
        `What should be in an emergency response plan per ${regulationNumber}?`
      ];
      
    default:
      return commonSuggestions;
  }
};
