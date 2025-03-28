
import { Message } from '../../../types';
import { 
  findExactRegulationMatch, 
  logRegulationMatchFailure,
  isDirectRegulationCitation,
  extractRegulationNumber
} from '../utils/regulation';
import { extractKeyTerms } from '../utils/regulation/keywordExtraction';
import { supabase } from '@/lib/supabase';
import { extractSafetyTopics } from '@/utils/conversationUtils';
import { detectIndustryContext, getIndustrySpecificSuggestions } from '@/utils/conversation/follow-up-suggestions/industryDetection';

/**
 * Handle regulation-specific query processing
 * Enhanced with citation recognition and industry-aware fallback
 */
export const processRegulationQuery = async (
  content: string,
  allMessages: Message[],
  userId: string | null,
  messageId: string
): Promise<{ 
  match: boolean; 
  response: string | null;
  followUpSuggestions: string[];
}> => {
  // First check for direct regulation citations (e.g., 1910.119)
  if (isDirectRegulationCitation(content)) {
    const regulationNumber = extractRegulationNumber(content);
    if (regulationNumber) {
      try {
        // Search for the regulation by citation in alt_phrases or title
        const { data: regulations, error } = await supabase
          .from('regulations')
          .select('id, title, description, document_type, authority, source_url, category, keywords')
          .or(`alt_phrases.cs.{${regulationNumber}},title.ilike.%${regulationNumber}%`)
          .order('updated_at', { ascending: false })
          .limit(1);
        
        if (!error && regulations && regulations.length > 0) {
          const regulation = regulations[0];
          
          // Create a detailed response with citation format
          const response = `**${regulation.document_type || 'OSHA'} ${regulationNumber} - ${regulation.title || 'Regulation'}**

${regulation.description || 'This regulation establishes requirements for workplace safety and health.'}

Key requirements include:
- Regular inspections and documentation
- Employee training on requirements and procedures
- Implementation of proper hazard controls
- Documentation of compliance activities
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
          
          // Generate citation-specific follow-up suggestions
          return {
            match: true,
            response: response,
            followUpSuggestions: [
              `What are the documentation requirements for ${regulationNumber}?`,
              `What training is required for compliance with ${regulationNumber}?`,
              `Are there any exceptions to ${regulationNumber}?`
            ]
          };
        }
      } catch (error) {
        console.error('Error fetching regulation by citation:', error);
      }
    }
  }
  
  // If no direct citation match, try the regular regulation matching
  const regulationMatch = await findExactRegulationMatch(content, userId);
  
  if (regulationMatch) {
    // Update paulie_queries table with the response
    try {
      await supabase.from('paulie_queries').update({
        response: regulationMatch
      }).eq('message_id', messageId);
    } catch (error) {
      console.error('Error updating query with response:', error);
    }
    
    // Extract detected safety topics from conversation history
    const safetyTopics = extractSafetyTopics(allMessages);
    
    // Generate regulation-specific follow-up suggestions based on detected topics
    let followUpSuggestions = [
      "Can you explain how to implement this regulation?",
      "What documentation is required for compliance?",
      "Are there any exceptions to this regulation?"
    ];
    
    // Customize follow-ups based on detected safety topics
    if (safetyTopics.includes('fall protection')) {
      followUpSuggestions = [
        "What are the inspection requirements for fall protection equipment?",
        "How do I develop a site-specific fall protection plan?",
        "What training is required for workers using fall protection?"
      ];
    } else if (safetyTopics.includes('chemical safety') || safetyTopics.includes('hazcom')) {
      followUpSuggestions = [
        "What GHS labels are required for chemical containers?",
        "How should we store incompatible chemicals?",
        "What training is required for employees who work with chemicals?"
      ];
    } else if (safetyTopics.includes('confined space')) {
      followUpSuggestions = [
        "What testing is required before confined space entry?",
        "Who needs to be involved in a confined space entry?",
        "What rescue provisions are required for confined spaces?"
      ];
    }
    
    // Detect industry context for better follow-up suggestions
    const industryContext = detectIndustryContext(content, allMessages.map(m => m.content));
    if (industryContext) {
      // Add at least one industry-specific follow-up
      const industrySuggestions = getIndustrySpecificSuggestions(industryContext);
      if (industrySuggestions.length > 0) {
        // Replace the last suggestion with an industry-specific one
        followUpSuggestions[followUpSuggestions.length - 1] = industrySuggestions[0];
      }
    }
    
    return {
      match: true,
      response: regulationMatch,
      followUpSuggestions
    };
  }
  
  // No regulation match found - log the failure and return not matched
  const keyTerms = await extractKeyTerms(content);
  
  // Detect industry context
  const industryContext = detectIndustryContext(content);
  
  // Log the regulation match failure for analysis
  await logRegulationMatchFailure(content, keyTerms, userId, industryContext);
  
  return {
    match: false,
    response: null,
    followUpSuggestions: []
  };
};
