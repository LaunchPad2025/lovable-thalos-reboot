import { Message } from '@/components/chatbot/types';

// Maximum number of messages to keep in context
const MAX_CONTEXT_LENGTH = 12;

/**
 * Prepare conversation history for the AI to maintain context
 * Formats the history in a way suitable for language models
 */
export function prepareConversationContext(messages: Message[]): string {
  // Limit the number of messages to prevent context window overflow
  const contextMessages = messages.slice(-MAX_CONTEXT_LENGTH);
  
  // Format messages for context, ensuring the model can differentiate roles
  return contextMessages.map(msg => {
    const role = msg.role === 'user' ? 'Human' : 'Assistant';
    return `${role}: ${msg.content}`;
  }).join('\n\n');
}
