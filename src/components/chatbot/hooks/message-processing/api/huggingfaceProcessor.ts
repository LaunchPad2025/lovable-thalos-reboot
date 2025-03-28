
import { Message } from '../../../types';
import { processWithHuggingFace, suggestFollowUpQuestions } from '@/utils/huggingfaceUtils';

/**
 * Process message using Hugging Face API with improved context handling
 */
export const processWithAI = async (
  content: string, 
  allMessages: Message[]
): Promise<string> => {
  try {
    console.log("Attempting to process with HuggingFace API");
    
    // Identify clear follow-up questions to provide better context
    const isFollowUp = isFollowUpQuestion(content, allMessages);
    if (isFollowUp) {
      console.log("Detected follow-up question, providing additional context to model");
    }
    
    // Process with context-awareness
    const aiResponse = await processWithHuggingFace(content, allMessages);
    console.log("Hugging Face processing successful");
    
    return aiResponse;
  } catch (error) {
    console.error('Error with Hugging Face processing:', error);
    throw error; // Propagate the error to be handled by the caller
  }
};

/**
 * Generate follow-up suggestions based on conversation context
 */
export const generateSuggestions = (
  content: string,
  aiResponse: string
): string[] => {
  return suggestFollowUpQuestions(content, aiResponse);
};

/**
 * Simple check if this is likely a follow-up question
 */
const isFollowUpQuestion = (content: string, messages: Message[]): boolean => {
  if (messages.length < 2) return false;
  
  // Get the last few user messages
  const userMessages = messages
    .filter(msg => msg.role === 'user')
    .map(msg => msg.content);
  
  if (userMessages.length < 2) return false;
  
  // Follow-up indicators
  const shortQuestion = content.trim().split(/\s+/).length < 6;
  const startsWithQuestion = /^(how|what|when|where|why|who|is|are|can|should|would|do|does)/i.test(content.trim());
  const hasReferenceWords = /\b(it|this|that|these|those|they|them)\b/i.test(content);
  
  return shortQuestion || (startsWithQuestion && hasReferenceWords);
};
