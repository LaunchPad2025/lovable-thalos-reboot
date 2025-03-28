
/**
 * Enhance AI response with additional context if needed
 */
export const enhanceResponse = (
  originalResponse: string,
  localResponse: string
): string => {
  // If the response is too short or generic, enhance it
  if (originalResponse.length < 50 || 
      originalResponse.includes("I don't have specific information") ||
      originalResponse.includes("I don't know") ||
      originalResponse.includes("I'm not sure")) {
    
    console.log("Response too generic, enhancing with local knowledge base");
    
    // If the local response is more detailed, use it instead
    if (localResponse.length > originalResponse.length * 1.2) {
      return localResponse;
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
      return originalResponse + "\n\n" + transition + localResponse.toLowerCase();
    }
  }
  
  return originalResponse;
};
