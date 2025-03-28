import { supabase } from '@/lib/supabase';
import { detectIndustryContext, formatIndustryFallbackResponse, getIndustrySpecificSuggestions } from '@/utils/conversation/follow-up-suggestions/industryDetection';
import { isDirectRegulationCitation, extractRegulationNumber } from '../utils/regulation';

/**
 * Generate fallback response when no matches are found
 * Enhanced with regulation citation detection, industry-aware fallback behavior and tiered responses
 */
export const processFallbackResponse = async (
  content: string,
  messageId: string
): Promise<{ 
  response: string;
  followUpSuggestions: string[];
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
  
  // Detect the industry context from the user's query
  const detectedIndustry = detectIndustryContext(content);
  
  // Try to find industry-specific regulations even if no direct match was found
  let industryBasedRegulations = null;
  
  if (detectedIndustry) {
    try {
      // Try to find at least one relevant regulation for the detected industry
      const { data: regulations, error } = await supabase
        .from('regulations')
        .select('id, title, description, document_type, authority, source_url, category')
        .filter('industry_tags', 'cs', `{${detectedIndustry}}`)
        .order('updated_at', { ascending: false })
        .limit(1);
      
      if (!error && regulations && regulations.length > 0) {
        industryBasedRegulations = regulations;
      }
    } catch (error) {
      console.error("Error fetching industry-specific regulations:", error);
    }
  }
  
  let response = '';
  
  // Tiered fallback pattern:
  // 1. If we have an industry-specific regulation, use that for a better response
  if (industryBasedRegulations && industryBasedRegulations.length > 0) {
    const regulation = industryBasedRegulations[0];
    
    // Create a more specific response with the regulation found
    response = `Based on your question about ${detectedIndustry.replace('_', ' ')} safety, here's a relevant regulation:

**${regulation.title || 'Safety Regulation'}**
${regulation.description || ''}

This is part of ${regulation.document_type || ''} ${regulation.authority || ''}.

Other important safety areas in the ${detectedIndustry.replace('_', ' ')} industry include:
`;

    // Get the top safety categories for this industry
    const topCategories = getTopSafetyCategoriesForIndustry(detectedIndustry);
    for (const category of topCategories.slice(0, 3)) {
      response += `• ${category}\n`;
    }
    
    response += '\nWould you like more specific information about any of these areas?';
  } 
  // 2. Otherwise, fall back to the industry-aware generic response
  else {
    response = formatIndustryFallbackResponse(detectedIndustry, content);
  }
  
  // Generate industry-specific follow-up suggestions
  const industrySuggestions = detectedIndustry 
    ? getIndustrySpecificSuggestions(detectedIndustry)
    : [
        "What specific safety topic are you interested in?",
        "Tell me about Fall Protection requirements",
        "What are the Chemical Safety (HazCom) rules?",
        "Explain Confined Space Entry requirements",
        "What PPE is required for my industry?"
      ];
  
  // Log the regulation match failure for analysis
  try {
    const user = await supabase.auth.getUser();
    const userId = user.data?.user?.id;
    
    await supabase.from('regulation_match_failures').insert({
      question: content,
      user_id: userId || null,
      matched_keywords: [], // No keywords matched
      fallback_industry: detectedIndustry,
      timestamp: new Date().toISOString(),
      reviewed: false
    });
    
    // Update paulie_queries table with the fallback response
    await supabase.from('paulie_queries').update({
      response: response,
      review_status: 'industry_fallback',
      notes: `Using industry fallback: ${detectedIndustry || 'none detected'}`
    }).eq('message_id', messageId);
  } catch (error) {
    console.error('Error logging regulation match failure:', error);
    // Continue even if logging fails
  }
  
  return {
    response,
    followUpSuggestions: industrySuggestions
  };
};

/**
 * Get top safety categories for a specific industry, tailored for more accurate responses
 */
function getTopSafetyCategoriesForIndustry(industry: string): string[] {
  const categoriesByIndustry: Record<string, string[]> = {
    'oil_gas': [
      'Process Safety Management (PSM)',
      'H2S Safety and Monitoring',
      'Hot Work Permits',
      'Confined Space Entry',
      'Emergency Response Planning',
      'Lockout/Tagout (LOTO)'
    ],
    'construction': [
      'Fall Protection',
      'Electrical Safety',
      'Trenching and Excavation',
      'Struck-by Hazards',
      'Scaffolding'
    ],
    'manufacturing': [
      'Machine Guarding',
      'Lockout/Tagout',
      'Hazardous Materials',
      'Ergonomics',
      'Electrical Safety'
    ],
    'healthcare': [
      'Bloodborne Pathogens',
      'Ergonomics',
      'Workplace Violence',
      'Hazardous Drugs',
      'Needlestick Prevention'
    ],
    'logistics': [
      'Forklift Safety',
      'Material Handling',
      'Loading Dock Safety',
      'Racking and Storage',
      'Pedestrian Safety'
    ],
    'laboratory': [
      'Chemical Safety',
      'Biological Safety',
      'Emergency Equipment',
      'Fume Hood Operations',
      'PPE Requirements'
    ]
  };
  
  return categoriesByIndustry[industry] || [
    'Hazard Communication',
    'Emergency Action Plans',
    'Fire Safety',
    'PPE Requirements',
    'Job Hazard Analysis'
  ];
}
