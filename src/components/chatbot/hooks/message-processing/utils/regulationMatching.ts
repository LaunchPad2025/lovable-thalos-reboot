import { detectIndustryContext } from './regulation/industry/industryDetector';
import { supabase } from '@/lib/supabase';
import { extractKeyTerms } from './regulation/keywordExtraction';

/**
 * Core regulation matching functionality
 */
export const findRegulationMatch = async (query: string) => {
  // Get the industry context from the query
  const industryContext = detectIndustryContext(query);
  
  // Extract key terms from the query
  const keyTerms = await extractKeyTerms(query);
  
  // Log the query and extracted terms for analysis
  console.log(`Regulation query: ${query}`);
  console.log(`Extracted terms: ${keyTerms.join(', ')}`);
  console.log(`Detected industry: ${industryContext || 'None'}`);
  
  // Search for matching regulations in the database
  const { data: matchingRegulations, error } = await supabase
    .from('regulations')
    .select('*')
    .containsAny('keywords', keyTerms)
    .limit(5);
  
  if (error) {
    console.error('Error searching regulations:', error);
    return null;
  }
  
  // If we have matching regulations, format and return the best match
  if (matchingRegulations && matchingRegulations.length > 0) {
    // Prioritize industry-specific matches if industry context was detected
    let bestMatch = matchingRegulations[0];
    
    if (industryContext) {
      const industryMatch = matchingRegulations.find(
        reg => reg.industry === industryContext
      );
      
      if (industryMatch) {
        bestMatch = industryMatch;
      }
    }
    
    // Format the regulation response
    const matchResult = formatRegulationResponse(bestMatch);
    return matchResult;
  }
  
  // No matching regulations found
  return null;
};

/**
 * Format a regulation match into a user-friendly response
 */
const formatRegulationResponse = (regulation: any): string => {
  return `
**${regulation.title}**

${regulation.description}

**Key Requirements:**
${regulation.requirements}

**Compliance Guidance:**
${regulation.compliance_guidance}

Reference: ${regulation.citation}
`;
};
