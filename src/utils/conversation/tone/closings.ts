
/**
 * Add helpful closing statements to responses
 */

/**
 * Get a random helpful closing statement
 * @returns A helpful closing statement
 */
export function getHelpfulClosing(): string {
  const closings = [
    " Hope that helps! Let me know if you need any clarification.",
    " Does that address what you were looking for?",
    " Is there anything specific about this you'd like me to explain further?",
    " Let me know if you need more specific information on this topic.",
    " Would you like me to elaborate on any part of this?"
  ];
  return closings[Math.floor(Math.random() * closings.length)];
}

/**
 * Determines if a response needs a helpful closing
 * @param content The response content to check
 * @returns Boolean indicating if a closing should be added
 */
export function needsHelpfulClosing(content: string): boolean {
  return !content.includes("hope that helps") && 
    !content.includes("let me know if") && 
    !content.includes("anything else") &&
    Math.random() > 0.6;
}
