
/**
 * Check if two responses are too similar
 */
export const similarityCheck = (current: string, previous: string): boolean => {
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
