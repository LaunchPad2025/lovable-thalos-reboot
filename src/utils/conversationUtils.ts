import { Message } from '@/components/chatbot/types';

// Maximum number of messages to keep in context
const MAX_CONTEXT_LENGTH = 10;

/**
 * Prepare conversation history for the AI to maintain context
 * Formats the history in a way suitable for language models
 */
export function prepareConversationContext(messages: Message[]): string {
  // Limit the number of messages to prevent context window overflow
  const contextMessages = messages.slice(-MAX_CONTEXT_LENGTH);
  
  // Format messages for context
  return contextMessages.map(msg => {
    const role = msg.role === 'user' ? 'Human' : 'Assistant';
    return `${role}: ${msg.content}`;
  }).join('\n\n');
}

/**
 * Process the message content to make it more natural and friendly
 */
export function enhanceResponseTone(content: string): string {
  // If content is too formal or technical, we could adjust it here
  // This is a simple example - in practice, this would be handled by the model itself
  return content;
}

/**
 * Generate relevant follow-up questions based on the conversation
 */
export function generateFollowUpQuestions(userQuery: string, aiResponse: string): string[] {
  // In a real implementation, this would use the model to generate relevant follow-ups
  // For now, we'll use a hardcoded approach based on safety keywords

  const safetyKeywords = {
    'ppe': ['What specific PPE do you need guidance on?', 'Are you having issues with PPE compliance?'],
    'chemical': ['What chemicals are you working with?', 'Do you need help with chemical storage guidelines?'],
    'training': ['What type of safety training are you looking for?', 'Do you need help tracking employee training?'],
    'fall': ['What height are you working at?', 'Are you looking for fall protection equipment recommendations?'],
    'hazard': ['Can you describe the specific hazard in more detail?', 'Is this a new hazard or an ongoing concern?'],
    'violation': ['When did you first notice this potential violation?', 'Would you like guidance on how to address this issue?']
  };

  // Check for keywords in the user query
  const lowerQuery = userQuery.toLowerCase();
  const suggestions: string[] = [];
  
  Object.entries(safetyKeywords).forEach(([keyword, questions]) => {
    if (lowerQuery.includes(keyword) && suggestions.length < 2) {
      // Add a relevant follow-up question
      suggestions.push(questions[Math.floor(Math.random() * questions.length)]);
    }
  });
  
  // If no specific keywords matched, add generic follow-ups
  if (suggestions.length === 0) {
    suggestions.push(
      'Would you like more specific information about this topic?',
      'Is there a particular aspect of workplace safety you\'re concerned about?'
    );
  }
  
  return suggestions.slice(0, 2); // Return at most 2 suggestions
}
