
import { safetyRegulationResponses } from '../../data/safetyRegulationData';

/**
 * Check for exact matches in regulatory database
 */
export const findExactRegulationMatch = (query: string): string | null => {
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
