
/**
 * Utilities for detecting follow-up questions
 */

/**
 * Check if the message appears to be a follow-up question
 */
export const isFollowUpQuestion = (query: string, previousUserMessages: string[]): boolean => {
  // Enhanced detection of follow-up questions with more patterns
  if (previousUserMessages.length === 0) return false;
  
  const followUpIndicators = [
    'what about', 'how about', 'and', 'but', 'so', 'then', 'what if',
    'would', 'could', 'should', 'why', 'when', 'is it', 'are they', 
    'do i need', 'is there', 'what else', 'anything else', 'how often', 
    'do we need', 'what\'s the', 'what is the', 'how much', 'how do i',
    'how should i', 'what should', 'tell me more', 'more info'
  ];
  
  const isShortQuery = query.length < 20;
  const hasFollowUpPhrase = followUpIndicators.some(indicator => 
    query.toLowerCase().includes(indicator)
  );
  const lacksContext = !query.includes('?') && query.split(' ').length < 6;
  
  return previousUserMessages.length > 0 && (isShortQuery || hasFollowUpPhrase || lacksContext);
};
