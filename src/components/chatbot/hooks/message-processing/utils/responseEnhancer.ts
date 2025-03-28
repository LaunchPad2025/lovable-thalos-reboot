/**
 * Enhance AI response with additional context and practical advice if needed
 */
export const enhanceResponse = (
  originalResponse: string,
  localResponse: string,
  previousMessages: any[] = []
): string => {
  // Get previous assistant response for comparison (to avoid repetition)
  const previousAssistantMessages = previousMessages
    .filter(msg => msg.role === 'assistant')
    .map(msg => msg.content)
    .slice(-2);
  
  // Check if current response is too similar to previous one
  const isTooSimilar = previousAssistantMessages.length > 0 && 
    similarityCheck(originalResponse, previousAssistantMessages[0]);
  
  // If explicitly asked to repeat information
  const lastUserMessage = previousMessages
    .filter(msg => msg.role === 'user')
    .map(msg => msg.content)
    .pop() || '';
  
  const isAskingToRepeat = lastUserMessage.toLowerCase().includes('repeat that') || 
    lastUserMessage.toLowerCase().includes('say that again') ||
    lastUserMessage.toLowerCase().includes('full text') ||
    lastUserMessage.toLowerCase().includes('show me again');
  
  // If the user specifically asks for repetition, we should allow it
  if (isAskingToRepeat) {
    return addConversationalElements(originalResponse);
  }
  
  // If the response is too repetitive, we should enhance with local knowledge
  if (isTooSimilar) {
    console.log("Response too similar to previous, using alternative wording");
    // Choose between reformulating the original or using local knowledge
    if (localResponse.length > 100) {
      return addConversationalElements(localResponse);
    } else {
      return reformulateResponse(originalResponse);
    }
  }
  
  // If the response is too short or generic, enhance it
  if (originalResponse.length < 50 || 
      originalResponse.includes("I don't have specific information") ||
      originalResponse.includes("I don't know") ||
      originalResponse.includes("I'm not sure") ||
      originalResponse.includes("check with your safety")) {
    
    console.log("Response too generic, enhancing with local knowledge base");
    
    // If the local response is more detailed, use it instead
    if (localResponse.length > originalResponse.length * 1.2) {
      return addConversationalElements(localResponse);
    } else {
      // Create a more natural combined response
      const transitions = [
        "Additionally, ",
        "I can also add that ",
        "To give you more context, ",
        "It's also worth noting that ",
        "For more specific guidance, "
      ];
      const transition = transitions[Math.floor(Math.random() * transitions.length)];
      
      // Combine responses without redundancy
      return addConversationalElements(originalResponse + "\n\n" + transition + localResponse.toLowerCase());
    }
  }
  
  return addConversationalElements(originalResponse);
};

/**
 * Add conversational and practical elements to make responses more helpful,
 * with improved formatting, headings, and clear structure
 */
const addConversationalElements = (response: string): string => {
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
  
  // Add industry customization hints if detected
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
};

/**
 * Check if two responses are too similar
 */
const similarityCheck = (current: string, previous: string): boolean => {
  // Simple similarity check - can be improved
  const currentWords = new Set(current.toLowerCase().split(/\s+/).filter(w => w.length > 4));
  const previousWords = new Set(previous.toLowerCase().split(/\s+/).filter(w => w.length > 4));
  
  let commonWords = 0;
  currentWords.forEach(word => {
    if (previousWords.has(word)) commonWords++;
  });
  
  const similarityScore = commonWords / Math.max(currentWords.size, previousWords.size);
  return similarityScore > 0.7; // If 70% of key words are the same, consider it too similar
};

/**
 * Reformulate a response to avoid repetition while adding practical advice
 */
const reformulateResponse = (response: string): string => {
  // Split into sentences
  const sentences = response.split(/\.\s+/);
  
  // Keep only first and last sentences, plus one random one from the middle if available
  let reformed = sentences[0] + ". ";
  
  if (sentences.length > 3) {
    const randomMiddleIdx = 1 + Math.floor(Math.random() * (sentences.length - 2));
    reformed += "In other words, " + sentences[randomMiddleIdx].toLowerCase() + ". ";
  }
  
  if (sentences.length > 1) {
    reformed += sentences[sentences.length - 1] + ".";
  }
  
  // Add practical implementation advice with better formatting
  const practicalImplementation = [
    "\n\n**How to put this into practice:**\nFocus on clear documentation, regular training, and consistent implementation. Start with a written program that outlines responsibilities and procedures.",
    "\n\n**Implementation steps:**\n1. Create standardized forms\n2. Train all affected employees\n3. Conduct regular audits to ensure compliance is maintained\n4. Document all verification activities",
    "\n\n**Practical application:**\n- Develop a step-by-step procedure\n- Assign clear responsibilities\n- Document all activities with dates and signatures\n- Perform regular effectiveness reviews"
  ];
  
  reformed += practicalImplementation[Math.floor(Math.random() * practicalImplementation.length)];
  
  return reformed;
};
