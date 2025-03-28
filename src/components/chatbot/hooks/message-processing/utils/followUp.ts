
/**
 * Check if the message appears to be a follow-up question
 */
export const isFollowUpQuestion = (query: string, previousUserMessages: string[]): boolean => {
  // Enhanced detection of follow-up questions with more patterns
  if (previousUserMessages.length === 0) return false;
  
  const followUpIndicators = [
    'what about', 'how about', 'and', 'but', 'so', 'then', 'what if',
    'would', 'could', 'should', 'why', 'when', 'is it', 'are they', 
    'do i need', 'is there', 'what else', 'anything else'
  ];
  
  const isShortQuery = query.length < 20;
  const hasFollowUpPhrase = followUpIndicators.some(indicator => 
    query.toLowerCase().includes(indicator)
  );
  const lacksContext = !query.includes('?') && query.split(' ').length < 6;
  
  return previousUserMessages.length > 0 && (isShortQuery || hasFollowUpPhrase || lacksContext);
};

/**
 * Handle follow-up questions by incorporating previous context
 */
export const handleFollowUpQuestion = (recentTopics: string[], query: string, previousMessages: any[]): string | null => {
  if (recentTopics.length === 0) return null;
  
  // Find the most recent non-user message to reference
  const previousResponses = previousMessages
    .filter(msg => msg.role === 'assistant')
    .map(msg => msg.content)
    .slice(-2);
  
  if (previousResponses.length === 0) return null;
  
  // Get the most recent topic discussed
  const mostRecentTopic = recentTopics[0];
  
  // Check if any topic from the conversation matches our regulations
  for (const topic of recentTopics) {
    for (const regulation of safetyRegulationResponses) {
      if (regulation.keywords.some(keyword => topic.toLowerCase().includes(keyword.toLowerCase()))) {
        // Create a conversational response that builds on previous context
        const openingPhrases = [
          `Building on what we discussed about ${topic}, `,
          `To add to our conversation about ${topic}, `,
          `Regarding ${topic} that we were discussing, `,
          `Following up on ${topic}, `
        ];
        
        const opening = openingPhrases[Math.floor(Math.random() * openingPhrases.length)];
        const response = regulation.response.replace(/According to OSHA|OSHA standard|OSHA regulation/gi, 'the safety guideline');
        
        const simplifiedResponse = response.split('. ').slice(0, 3).join('. ') + '.';
        
        const closingPhrases = [
          ` Does that help answer your follow-up question?`,
          ` Is this what you were looking for?`,
          ` Is there a specific aspect of this you'd like me to focus on?`
        ];
        
        const closing = closingPhrases[Math.floor(Math.random() * closingPhrases.length)];
        
        return opening + simplifiedResponse + closing;
      }
    }
  }
  
  return null;
};

// Import from the file we'll create next
import { safetyRegulationResponses } from '../../data/safetyRegulationData';
