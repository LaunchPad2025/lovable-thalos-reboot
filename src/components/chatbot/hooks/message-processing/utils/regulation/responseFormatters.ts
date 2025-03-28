
/**
 * Format regulation responses for display
 */

/**
 * Format multiple regulations into a conversational response
 */
export const formatRegulationsResponse = (
  regulations: any[], 
  query: string,
  matchedKeywords: string[]
): string => {
  const mainKeyword = matchedKeywords[0] || regulations[0]?.category || "this topic";
  
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
export const formatRegulationResponse = (
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
