
// Import from the proper location
import { safetyRegulationResponses } from '../../../data/safetyRegulationData';
import { supabase } from '@/lib/supabase';

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
  for (const regulation of safetyRegulationResponses) {
    for (const keyword of regulation.keywords) {
      if (query.toLowerCase().includes(keyword.toLowerCase())) {
        // Provide a more conversational and detailed response
        const regulationInfo = regulation.response;
        
        // Remove formal citation language unless specific request
        const simplifiedInfo = query.includes('citation') || query.includes('standard') || query.includes('regulation number')
          ? regulationInfo
          : regulationInfo
              .replace(/according to osha regulation [^,]+,/gi, '')
              .replace(/osha standard [^,]+,/gi, '')
              .replace(/\([0-9]+ CFR [^\)]+\)/gi, '')
              .replace(/\([^\)]+\)/gi, '');
        
        // Structure in a more conversational format
        const openingPhrases = [
          `Great question about ${keyword}! Here's what you need to know: `,
          `I'd be happy to help with information about ${keyword}. `,
          `When it comes to ${keyword}, here's the guidance you should follow: `,
          `Thanks for asking about ${keyword}! `
        ];
        
        const opening = openingPhrases[Math.floor(Math.random() * openingPhrases.length)];
        
        // Break the response into bullet points for better readability if it's long
        let formattedResponse = simplifiedInfo;
        if (simplifiedInfo.length > 200) {
          const sentences = simplifiedInfo.split(/\.\s+/);
          if (sentences.length > 2) {
            formattedResponse = sentences.slice(0, 3).map(s => `• ${s}`).join('\n');
          }
        }
        
        const closingPhrases = [
          `\n\nIs there anything specific about ${keyword} you'd like me to explain in more detail?`,
          `\n\nDoes this address your question about ${keyword}?`,
          `\n\nWould you like me to provide more practical implementation advice for this?`
        ];
        
        const closing = closingPhrases[Math.floor(Math.random() * closingPhrases.length)];
        
        return opening + formattedResponse + closing;
      }
    }
  }
  
  return null;
};

/**
 * Find regulations based on keyword matching from the database
 */
export const findRegulationsByKeywords = async (query: string, userId?: string): Promise<string | null> => {
  try {
    const queryLower = query.toLowerCase();
    const matchedKeywords: string[] = [];
    
    // Get all available keywords from the database to match against
    const { data: regulations, error } = await supabase
      .from('regulations')
      .select('id, title, description, document_type, authority, source_url, keywords, category')
      .not('keywords', 'is', null);
    
    if (error) {
      console.error('Error fetching regulations with keywords:', error);
      return null;
    }
    
    if (!regulations || regulations.length === 0) {
      console.log('No regulations with keywords found in database');
      return null;
    }
    
    // Find matching regulations based on keywords
    const matchingRegulations = regulations.filter(reg => {
      if (!reg.keywords || !Array.isArray(reg.keywords)) return false;
      
      const keywordMatches = reg.keywords.filter(keyword => {
        if (typeof keyword !== 'string') return false;
        const match = queryLower.includes(keyword.toLowerCase());
        if (match && !matchedKeywords.includes(keyword)) {
          matchedKeywords.push(keyword);
        }
        return match;
      });
      
      return keywordMatches.length > 0;
    });
    
    if (matchingRegulations.length === 0) {
      console.log('No keyword matches found in query:', query);
      return null;
    }
    
    // If we have multiple matches, sort by number of keyword matches (most relevant first)
    matchingRegulations.sort((a, b) => {
      const aMatches = a.keywords.filter(k => queryLower.includes(k.toLowerCase())).length;
      const bMatches = b.keywords.filter(k => queryLower.includes(k.toLowerCase())).length;
      return bMatches - aMatches;
    });
    
    // Log the query for learning purposes
    try {
      await supabase.from('paulie_queries').insert({
        question: query,
        matched_keywords: matchedKeywords,
        matched_category: matchingRegulations[0]?.category,
        matched_regulation_id: matchingRegulations[0]?.id,
        user_id: userId
      });
    } catch (logError) {
      console.error('Error logging query:', logError);
      // Don't fail if logging fails
    }
    
    // If we have a single match, provide detailed information
    if (matchingRegulations.length === 1) {
      const regulation = matchingRegulations[0];
      return formatRegulationResponse(regulation, matchedKeywords);
    } 
    
    // If we have multiple relevant results, offer a summary
    if (matchingRegulations.length > 1) {
      const firstReg = matchingRegulations[0];
      let response = formatRegulationResponse(firstReg, matchedKeywords);
      
      response += "\n\nI found several regulations that may apply to your question. Would you like to see a summary of each?";
      
      return response;
    }
    
    return null;
  } catch (error) {
    console.error('Error in findRegulationsByKeywords:', error);
    return null;
  }
};

/**
 * Format a regulation into a conversational response
 */
const formatRegulationResponse = (
  regulation: any, 
  matchedKeywords: string[]
): string => {
  const mainKeyword = matchedKeywords[0] || regulation.category || "this topic";
  
  // Create a conversational opener
  const openingPhrases = [
    `Great question about ${mainKeyword}! `,
    `I found relevant regulatory information about ${mainKeyword}. `,
    `Regarding ${mainKeyword}, here's what you should know: `,
    `I have important information about ${mainKeyword} for you. `
  ];
  
  const opening = openingPhrases[Math.floor(Math.random() * openingPhrases.length)];
  
  // Format the regulation content
  let content = '';
  
  if (regulation.title) {
    content += `\n\n**${regulation.title}**`;
  }
  
  if (regulation.description) {
    content += `\n\n${regulation.description}`;
  }
  
  if (regulation.authority) {
    content += `\n\nIssued by: ${regulation.authority}`;
  }
  
  // Add a conversational closer
  const closingPhrases = [
    `\n\nDo you need more specific information about this regulation?`,
    `\n\nWould you like practical implementation advice for this requirement?`,
    `\n\nIs there a specific aspect of this regulation you'd like me to explain further?`
  ];
  
  const closing = closingPhrases[Math.floor(Math.random() * closingPhrases.length)];
  
  return opening + content + closing;
};
