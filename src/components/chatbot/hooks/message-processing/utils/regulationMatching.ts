
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
 * Extract key terms from user query for better matching
 */
const extractKeyTerms = (query: string): string[] => {
  const stopWords = ['a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'with', 'about', 'is', 'are', 'how', 'what', 'when', 'where', 'why', 'can', 'do', 'does', 'should', 'would', 'could', 'will'];
  
  // Remove punctuation and normalize
  const normalizedQuery = query.toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
  
  // Split into words and filter out stop words
  const words = normalizedQuery.split(' ').filter(word => 
    word.length > 2 && !stopWords.includes(word)
  );
  
  // Find potential industry-specific terms
  const industryTerms = findIndustryTerms(normalizedQuery);
  
  return [...new Set([...words, ...industryTerms])];
};

/**
 * Find industry-specific terms in query
 */
const findIndustryTerms = (query: string): string[] => {
  const industryTerms: Record<string, string[]> = {
    'construction': ['scaffold', 'ladder', 'fall', 'harness', 'excavation', 'trench'],
    'chemical': ['hazardous', 'chemical', 'toxic', 'ventilation', 'spill'],
    'electrical': ['electrical', 'voltage', 'circuit', 'lockout', 'tagout'],
    'healthcare': ['needle', 'bloodborne', 'pathogen', 'biohazard'],
    'manufacturing': ['machine', 'guard', 'robot', 'conveyor', 'amputation']
  };
  
  const result: string[] = [];
  
  // Check for industry category matches
  Object.keys(industryTerms).forEach(industry => {
    if (query.toLowerCase().includes(industry)) {
      result.push(industry);
    }
    
    // Check for terms within each industry
    industryTerms[industry].forEach(term => {
      if (query.toLowerCase().includes(term)) {
        result.push(term);
        // Also include the parent industry for better context
        if (!result.includes(industry)) {
          result.push(industry);
        }
      }
    });
  });
  
  return result;
};

/**
 * Find regulations based on keyword matching from the database
 */
export const findRegulationsByKeywords = async (query: string, userId?: string): Promise<string | null> => {
  try {
    const keyTerms = extractKeyTerms(query);
    console.log('Extracted key terms:', keyTerms);
    
    if (keyTerms.length === 0) {
      console.log('No key terms extracted from query');
      return null;
    }
    
    // Get regulations with keywords that overlap with our key terms
    const { data: regulations, error } = await supabase
      .from('regulations')
      .select('id, title, description, document_type, citation, authority, source_url, keywords, category, updated_at')
      .filter('keywords', 'cs', `{${keyTerms.join(',')}}`)
      .order('updated_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching regulations with keywords:', error);
      return null;
    }
    
    if (!regulations || regulations.length === 0) {
      console.log('No regulations with matching keywords found in database');
      return null;
    }
    
    // Calculate relevance score based on number of keyword matches
    const scoredRegulations = regulations.map(reg => {
      if (!reg.keywords || !Array.isArray(reg.keywords)) {
        return { ...reg, score: 0 };
      }
      
      // Count how many query terms match with the regulation keywords
      const matchCount = keyTerms.filter(term => 
        reg.keywords.some(keyword => 
          keyword.toLowerCase().includes(term.toLowerCase()) || 
          term.toLowerCase().includes(keyword.toLowerCase())
        )
      ).length;
      
      return { ...reg, score: matchCount };
    });
    
    // Sort by score (highest first) and take top 3
    scoredRegulations.sort((a, b) => b.score - a.score);
    const topRegulations = scoredRegulations.slice(0, 3);
    
    // Log the query for learning purposes
    try {
      await supabase.from('paulie_queries').insert({
        question: query,
        matched_keywords: keyTerms,
        matched_regulation_ids: topRegulations.map(r => r.id),
        user_id: userId,
        created_at: new Date().toISOString()
      });
    } catch (logError) {
      console.error('Error logging query:', logError);
      // Don't fail if logging fails
    }
    
    // If we have matches, format the response
    if (topRegulations.length > 0) {
      return formatRegulationsResponse(topRegulations, query, keyTerms);
    }
    
    return null;
  } catch (error) {
    console.error('Error in findRegulationsByKeywords:', error);
    return null;
  }
};

/**
 * Format multiple regulations into a conversational response
 */
const formatRegulationsResponse = (
  regulations: any[], 
  query: string,
  matchedKeywords: string[]
): string => {
  const mainKeyword = matchedKeywords[0] || regulations[0].category || "this topic";
  
  // Create a conversational opener
  const openingPhrases = [
    `Great question about ${mainKeyword}! I found some relevant regulations that apply:`,
    `I've identified ${regulations.length} relevant regulations about ${mainKeyword}:`,
    `Here's what the safety regulations say about ${mainKeyword}:`,
    `Based on your question, these regulations apply to ${mainKeyword}:`
  ];
  
  const opening = openingPhrases[Math.floor(Math.random() * openingPhrases.length)];
  
  // Format each regulation
  let content = '';
  
  regulations.forEach((reg, index) => {
    content += `\n\n**${reg.title || 'Safety Regulation'}**`;
    
    if (reg.citation) {
      content += ` (${reg.citation})`;
    }
    
    if (reg.description) {
      // Truncate description if it's too long
      const maxLength = 150;
      const description = reg.description.length > maxLength
        ? reg.description.substring(0, maxLength) + '...'
        : reg.description;
      
      content += `\n${description}`;
    }
    
    if (reg.source_url) {
      content += `\n[Source document](${reg.source_url})`;
    }
  });
  
  // Add a conversational closer
  const closingPhrases = [
    `\n\nWould you like me to explain any of these regulations in more detail?`,
    `\n\nCan I help you implement these requirements in your workplace?`,
    `\n\nIs there a specific aspect of these regulations you'd like me to focus on?`,
    `\n\nWould you like practical tips for complying with these regulations?`
  ];
  
  const closing = closingPhrases[Math.floor(Math.random() * closingPhrases.length)];
  
  return opening + content + closing;
};

/**
 * Format a single regulation into a conversational response
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
