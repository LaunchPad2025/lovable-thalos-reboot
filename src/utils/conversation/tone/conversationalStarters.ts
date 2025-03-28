
/**
 * Conversation starters to make responses more friendly
 */

/**
 * Get a random conversation starter
 * @returns A friendly conversation starter phrase
 */
export function getConversationStarter(): string {
  const starters = [
    "Great question! ",
    "I'm glad you asked about that. ",
    "That's something many people wonder about. ",
    "Here's what I found for you. ",
    "Happy to help with that! "
  ];
  return starters[Math.floor(Math.random() * starters.length)];
}

/**
 * Determines if a response needs a conversation starter
 * @param content The response content to check
 * @returns Boolean indicating if a starter should be added
 */
export function needsConversationStarter(content: string): boolean {
  return !content.includes("Great question") && 
    !content.includes("Thanks for asking") && 
    !content.includes("That's a good point") &&
    Math.random() > 0.5;
}
