/**
 * Add conversational and practical elements to make responses more helpful,
 * with improved formatting, headings, and clear structure
 */
export const addConversationalElements = (response: string): string => {
  // Fix run-on sentences - ensuring proper punctuation
  response = response.replace(/(\w)\s+([A-Z])/g, "$1. $2");
  response = response.replace(/(\w)\s+(Would you like|Should I|Do you need|Want|Need)/g, "$1. $2");
  
  // Add bold headings for lists to improve readability
  if (response.includes("1.") && response.includes("2.") && !response.includes("**")) {
    const topicWords = ["training", "inspection", "documentation", "record", "checklist", "audit", "safety", "hazard"];
    
    for (const word of topicWords) {
      if (response.toLowerCase().includes(word)) {
        const capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
        const headings = [
          `**${capitalizedWord} Best Practices**`,
          `**${capitalizedWord} Documentation Guidelines**`,
          `**Essential ${capitalizedWord} Steps**`,
          `**${capitalizedWord} Compliance Checklist**`
        ];
        
        const heading = headings[Math.floor(Math.random() * headings.length)];
        
        // Find where the list starts and add the heading there
        const listStartIndex = response.search(/\d\.\s+[A-Z]/);
        if (listStartIndex > 0) {
          // If list doesn't start at the beginning, add heading before the list
          if (listStartIndex > 20) {
            const beforeList = response.substring(0, listStartIndex).trim();
            const afterList = response.substring(listStartIndex);
            response = beforeList + "\n\n" + heading + "\n" + afterList;
          } else {
            response = heading + "\n" + response;
          }
        }
        
        break;
      }
    }
  }
  
  // Apply content enhancements
  response = applyContentEnhancements(response);
  
  return response;
};

/**
 * Apply various content enhancements to the response
 */
function applyContentEnhancements(response: string): string {
  // Improve formatting for numbered lists with sub-bullets
  response = response.replace(/(\d+\.\s+)([A-Z][^:]+):\s+/g, "$1**$2:**\n   ");
  
  // Add practical advice if not already present
  if (!response.includes("make sure") && 
      !response.includes("be sure to") && 
      !response.includes("should") &&
      !response.includes("important to") &&
      response.length > 150) {
    
    const practicalTips = [
      "\n\n**Practical Tip:** Create standardized forms for all safety processes to ensure consistency and completeness in your documentation.",
      "\n\n**Quick Tip:** Digital safety management systems can help automate record-keeping and send alerts when inspections or training are due.",
      "\n\n**Helpful Hint:** Training employees on why safety procedures matter, not just how to follow them, leads to better compliance and fewer incidents.",
      "\n\n**Pro Tip:** Consider using QR codes on equipment that link to digital maintenance and inspection records for easier tracking."
    ];
    
    response += practicalTips[Math.floor(Math.random() * practicalTips.length)];
  }
  
  // Add additional enhancements
  response = addTemplateOffers(response);
  response = addIndustryCustomization(response);
  response = addFollowUpQuestions(response);
  
  return response;
}

/**
 * Add template offers for training, inspection, and recordkeeping
 */
function addTemplateOffers(response: string): string {
  // Offer downloadable templates for training, inspection, and recordkeeping
  if ((response.toLowerCase().includes("training") || 
       response.toLowerCase().includes("inspection") || 
       response.toLowerCase().includes("record") || 
       response.toLowerCase().includes("document") || 
       response.toLowerCase().includes("checklist")) && 
      !response.toLowerCase().includes("would you like a downloadable")) {
    
    const templateOffers = [
      "\n\nWould you like a downloadable template for this that you can customize for your workplace?",
      "\n\nI can provide a downloadable template that you can adapt to your specific needs. Would that be helpful?",
      "\n\nWould you like me to provide a downloadable template or editable form for this?"
    ];
    
    response += templateOffers[Math.floor(Math.random() * templateOffers.length)];
  }
  
  return response;
}

/**
 * Add industry customization hints if detected
 */
function addIndustryCustomization(response: string): string {
  const industries = ["construction", "healthcare", "manufacturing", "warehouse", "office", "retail", "restaurant", "energy"];
  for (const industry of industries) {
    if (response.toLowerCase().includes(industry)) {
      const customizationHints = [
        `\n\nI can tailor this information specifically for the ${industry} industry if that would be helpful.`,
        `\n\nI notice you're in the ${industry} industry. I can customize this guidance for your specific sector.`,
        `\n\nSince you're in ${industry}, I can provide industry-specific examples and templates.`
      ];
      
      if (!response.toLowerCase().includes("industry") && !response.toLowerCase().includes("customize")) {
        response += customizationHints[Math.floor(Math.random() * customizationHints.length)];
      }
      break;
    }
  }
  
  return response;
}

/**
 * Add suggested follow-up questions for relevant topics
 */
function addFollowUpQuestions(response: string): string {
  // Add suggested follow-up questions for training, inspection, and recordkeeping topics
  if (!response.includes("Would you also like to know") && !response.includes("Related questions")) {
    if (response.toLowerCase().includes("training")) {
      response += "\n\n**Related questions you might ask:**\n- How often should refresher training be conducted?\n- What documentation is required for training certification?\n- Can you provide a training matrix template?";
    } else if (response.toLowerCase().includes("inspection")) {
      response += "\n\n**Related questions you might ask:**\n- What frequency of inspections is recommended?\n- How should inspection findings be documented?\n- Can you provide an inspection checklist template?";
    } else if (response.toLowerCase().includes("record") || response.toLowerCase().includes("document")) {
      response += "\n\n**Related questions you might ask:**\n- How long should safety records be retained?\n- What's the best way to organize safety documentation?\n- Can you provide a documentation system template?";
    }
  }
  
  return response;
}
