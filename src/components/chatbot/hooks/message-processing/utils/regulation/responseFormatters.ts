
/**
 * Format regulation responses for display
 */

/**
 * Generate OSHA source link based on regulation code
 */
export const generateOshaSourceLink = (code: string | null): string | null => {
  if (!code) return null;
  
  // Extract the main parts of the code (e.g., 1910.120)
  const match = code.match(/(\d+)\.(\d+)/);
  if (!match) return null;
  
  const [_, part, section] = match;
  return `https://www.osha.gov/laws-regs/regulations/standardnumber/${part}/${part}.${section}`;
};

/**
 * Format multiple regulations into a conversational response
 */
export const formatRegulationsResponse = (
  regulations: any[], 
  query: string,
  matchedKeywords: string[],
  matchedCategories: string[] = []
): string => {
  const mainKeyword = matchedKeywords[0] || regulations[0]?.category || "this topic";
  
  // Create a conversational opener that acknowledges multiple matches if applicable
  let opening = '';
  if (matchedCategories.length > 1) {
    opening = `Your question relates to multiple safety areas: ${matchedCategories.slice(0, 3).join(', ')}. Here's information about ${regulations[0]?.category || mainKeyword}:`;
  } else {
    const openingPhrases = [
      `Great question about ${mainKeyword}! I found some relevant regulations that apply:`,
      `I've identified ${regulations.length} relevant regulations about ${mainKeyword}:`,
      `Here's what the safety regulations say about ${mainKeyword}:`,
      `Based on your question, these regulations apply to ${mainKeyword}:`
    ];
    
    opening = openingPhrases[Math.floor(Math.random() * openingPhrases.length)];
  }
  
  // Format each regulation
  let content = '';
  
  regulations.forEach((reg, index) => {
    content += `\n\n**${reg.title || 'Safety Regulation'}**`;
    
    if (reg.authority || reg.document_type) {
      content += ` (${reg.authority || ''} ${reg.document_type || ''})`.trim();
    }
    
    if (reg.description) {
      // Enhanced description handling - extract the most relevant parts
      let description = reg.description;
      
      // If description is long, try to find and highlight key sentences
      if (description.length > 200) {
        // Extract key sentences that contain matching keywords
        const sentences = description.split(/\.\s+/);
        const relevantSentences = sentences.filter(sentence => 
          matchedKeywords.some(keyword => 
            sentence.toLowerCase().includes(keyword.toLowerCase())
          )
        );
        
        // If we have relevant sentences, use those; otherwise truncate
        if (relevantSentences.length > 0) {
          description = relevantSentences.slice(0, 2).join('. ') + '.';
        } else {
          description = description.substring(0, 200) + '...';
        }
      }
      
      content += `\n${description}`;
    }
    
    // Add regulation source link if available
    if (reg.code) {
      const oshaLink = generateOshaSourceLink(reg.code);
      if (oshaLink) {
        content += `\n\n**[See full regulation: ${reg.code}](${oshaLink})**`;
      }
    } else if (reg.source_url) {
      content += `\n\n**[Source document](${reg.source_url})**`;
    }
  });
  
  // Add practical advice or a checklist offer
  const practicalAdvice = [
    `\n\n**Practical Application:**\nEmployers should document compliance with this regulation through regular inspections, employee training, and clear written procedures.`,
    `\n\n**Implementation Guidance:**\nTo meet these requirements, maintain documentation of inspections, training records, and a written program that outlines your compliance approach.`,
    `\n\n**Best Practice:**\nMany organizations use checklists and regular audits to ensure ongoing compliance with these requirements.`
  ];
  
  content += practicalAdvice[Math.floor(Math.random() * practicalAdvice.length)];
  
  // Add checklist or template offer
  content += `\n\nWould you like any of these resources?`;
  
  // Dynamically suggest resources based on the regulation category
  if (regulations[0]?.category?.toLowerCase().includes('fall protection') || 
      matchedKeywords.includes('fall protection') || 
      matchedKeywords.includes('harness') ||
      matchedKeywords.includes('scaffold')) {
    content += `\n- ✅ A fall protection inspection checklist
- ✅ A scaffold safety inspection template
- ✅ A summary of OSHA 1926.501 requirements`;
  } else if (regulations[0]?.category?.toLowerCase().includes('chemical') || 
             matchedKeywords.includes('chemical') || 
             matchedKeywords.includes('hazcom')) {
    content += `\n- ✅ A chemical inventory template
- ✅ A GHS labeling guide
- ✅ A hazardous material storage guide`;
  } else if (regulations[0]?.category?.toLowerCase().includes('confined space') || 
             matchedKeywords.includes('confined space')) {
    content += `\n- ✅ A confined space entry permit template
- ✅ An atmospheric testing guide
- ✅ A confined space rescue plan template`;
  } else if (regulations[0]?.category?.toLowerCase().includes('machine') || 
             matchedKeywords.includes('lockout') || 
             matchedKeywords.includes('tagout')) {
    content += `\n- ✅ A lockout/tagout procedure template
- ✅ An equipment-specific energy control template
- ✅ A lockout/tagout inspection form`;
  } else {
    content += `\n- ✅ A compliance checklist for this regulation
- ✅ A training documentation template
- ✅ An implementation guide`;
  }
  
  // Add multi-category follow-up if applicable
  if (matchedCategories.length > 1) {
    content += `\n\nWould you also like information about ${matchedCategories.filter(c => c !== regulations[0]?.category).slice(0, 2).join(' or ')}?`;
  } else {
    // Add a conversational closer
    const closingPhrases = [
      `\n\nCan I help you implement these requirements in your workplace?`,
      `\n\nIs there a specific aspect of these regulations you'd like me to focus on?`,
      `\n\nWould you like practical tips for complying with these regulations?`
    ];
    
    content += closingPhrases[Math.floor(Math.random() * closingPhrases.length)];
  }
  
  return opening + content;
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
  
  // Add regulation source link if available
  if (regulation.code) {
    const oshaLink = generateOshaSourceLink(regulation.code);
    if (oshaLink) {
      content += `\n\n**[See full regulation: ${regulation.code}](${oshaLink})**`;
    }
  } else if (regulation.source_url) {
    content += `\n\n**[Source document](${regulation.source_url})**`;
  }
  
  if (regulation.authority) {
    content += `\n\nIssued by: ${regulation.authority}`;
  }
  
  // Add practical implementation advice
  const implementationAdvice = [
    `\n\n**Practical Implementation:**\nTo comply with this regulation, focus on documentation, regular inspections, and employee training. Many organizations develop checklists to ensure all requirements are consistently met.`,
    `\n\n**Compliance Strategy:**\nImplement a systematic approach that includes written procedures, regular audits, and ongoing employee training to ensure continued compliance with these requirements.`,
    `\n\n**Best Practices:**\nLeading companies address these requirements by integrating them into daily operations, conducting regular reviews, and maintaining comprehensive documentation.`
  ];
  
  content += implementationAdvice[Math.floor(Math.random() * implementationAdvice.length)];
  
  // Add a template or checklist offer
  content += `\n\nWould you like a compliance template or checklist for this regulation?`;
  
  // Add a conversational closer
  const closingPhrases = [
    `\n\nIs there any specific aspect of this requirement you need help implementing?`,
    `\n\nWould you like practical implementation advice for this requirement?`,
    `\n\nDo you need assistance with training or documentation for this requirement?`
  ];
  
  const closing = closingPhrases[Math.floor(Math.random() * closingPhrases.length)];
  
  return opening + content + closing;
};
