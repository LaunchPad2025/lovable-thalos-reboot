
import { Message } from '../../../types';
import { processWithHuggingFace, suggestFollowUpQuestions } from '@/utils/huggingfaceUtils';

/**
 * Process message using Hugging Face API with error handling
 */
export const processWithAI = async (
  content: string, 
  allMessages: Message[]
): Promise<string> => {
  try {
    console.log("Attempting to process with HuggingFace API");
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
