/**
 * Enhance AI response with additional context if needed
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
      originalResponse.includes("I'm not sure")) {
    
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
 * Add conversational elements to make responses more natural
 */
const addConversationalElements = (response: string): string => {
  // Add practical advice if not already present
  if (!response.includes("make sure") && 
      !response.includes("be sure to") && 
      !response.includes("should") &&
      !response.includes("important to") &&
      response.length > 150) {
    
    const practicalTips = [
      "\n\nPractical tip: Make sure to document all inspections and keep records easily accessible.",
      "\n\nQuick tip: Creating a simple checklist can help ensure consistency in your safety protocols.",
      "\n\nHelpful hint: Training your team on proper procedures is just as important as having the right equipment.",
      "\n\nPro tip: Consider appointing a safety coordinator to oversee compliance with these requirements."
    ];
    
    response += practicalTips[Math.floor(Math.random() * practicalTips.length)];
  }
  
  // Replace "Would you like to see X?" with more specific offers
  response = response.replace(
    /Would you like to see (a|the) (.+?)\?/gi,
    (match, article, item) => {
      return `I can show you a quick guide for ${item}. Want to see that?`;
    }
  );
  
  // Ensure responses about inspections are specific
  if (response.includes("inspect") && !response.includes("before each use") && !response.includes("annually")) {
    response = response.replace(
      /should be inspected/gi,
      "should be inspected before each use and periodically by a competent person"
    );
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
 * Reformulate a response to avoid repetition
 */
const reformulateResponse = (response: string): string => {
  // Split into sentences
  const sentences = response.split(/\.\s+/);
  
  // Keep only first and last sentences, plus one random one from the middle if available
  let reformed = sentences[0] + ". ";
  
  if (sentences.length > 3) {
    const randomMiddleIdx = 1 + Math.floor(Math.random() * (sentences.length - 2));
    reformed += "To put it another way, " + sentences[randomMiddleIdx].toLowerCase() + ". ";
  }
  
  if (sentences.length > 1) {
    reformed += sentences[sentences.length - 1] + ".";
  }
  
  // Add practical advice
  reformed += "\n\nHere's a practical approach: focus on consistent documentation and regular training for your team.";
  
  return reformed;
};
