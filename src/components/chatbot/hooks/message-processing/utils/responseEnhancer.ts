
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
 * Add conversational and practical elements to make responses more helpful
 */
const addConversationalElements = (response: string): string => {
  // Add practical advice if not already present
  if (!response.includes("make sure") && 
      !response.includes("be sure to") && 
      !response.includes("should") &&
      !response.includes("important to") &&
      response.length > 150) {
    
    const practicalTips = [
      "\n\nPractical tip: Create standardized forms for all safety processes to ensure consistency and completeness in your documentation.",
      "\n\nQuick tip: Digital safety management systems can help automate record-keeping and send alerts when inspections or training are due.",
      "\n\nHelpful hint: Training employees on why safety procedures matter, not just how to follow them, leads to better compliance and fewer incidents.",
      "\n\nPro tip: Consider using QR codes on equipment that link to digital maintenance and inspection records for easier tracking."
    ];
    
    response += practicalTips[Math.floor(Math.random() * practicalTips.length)];
  }
  
  // Replace generic offers with more specific, action-oriented ones
  response = response.replace(
    /Would you like to see (a|the) (.+?)\?/gi,
    (match, article, item) => {
      return `I can provide a practical template for ${item}. Would that be helpful?`;
    }
  );
  
  response = response.replace(
    /Would you like more information about (.+?)\?/gi,
    (match, topic) => {
      return `I can share some best practices for implementing ${topic} in your workplace. Interested?`;
    }
  );
  
  // Make inspection guidance more specific and practical
  if (response.includes("inspect") && !response.includes("before each use") && !response.includes("annually")) {
    response = response.replace(
      /should be inspected/gi,
      "should be inspected before each use and documented with standardized forms"
    );
  }
  
  // Add documentation guidance to regulatory information
  if ((response.includes("CFR") || response.includes("OSHA requires")) && 
      !response.includes("document") && !response.includes("record")) {
    response += "\n\nRemember to document your compliance efforts with dates, responsible parties, and specific actions taken.";
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
  
  // Add practical implementation advice
  const practicalImplementation = [
    "\n\nHere's how to put this into practice: Focus on clear documentation, regular training, and consistent implementation. Start with a written program that outlines responsibilities and procedures.",
    "\n\nTo implement this effectively: Create standardized forms, train all affected employees, and conduct regular audits to ensure compliance is maintained.",
    "\n\nFor practical application: Develop a step-by-step procedure, assign clear responsibilities, and document all activities with dates and signatures."
  ];
  
  reformed += practicalImplementation[Math.floor(Math.random() * practicalImplementation.length)];
  
  return reformed;
};
