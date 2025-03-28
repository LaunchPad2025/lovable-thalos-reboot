
import { supabase } from '@/lib/supabase';
import { prepareConversationContext, enhanceResponseTone, generateFollowUpQuestions } from './conversationUtils';

// Model options
export const AI_MODELS = {
  FALCON: 'OpenAssistant/falcon-7b-sft',
  DIALOGPT: 'microsoft/DialoGPT-medium',
  OPENASSISTANT: 'OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5',
  LLAMA2: 'meta-llama/Llama-2-7b-chat-hf'
};

// Enhanced system prompt with more conversational tone
const DEFAULT_SYSTEM_PROMPT = `You are Paulie, a friendly and helpful AI assistant specialized in workplace safety.
Your personality is warm, conversational, and practical - like a trusted safety mentor.

When responding:
1. Use a casual, natural tone - be friendly first, informative second.
2. Avoid quoting regulations directly unless specifically asked. Instead, explain concepts in simple terms.
3. Use phrases like "Great question!" or "Here's what I found for you" to sound more conversational.
4. Reference the previous 2-3 messages to maintain conversation flow.
5. If a follow-up question is vague, assume it relates to the previously discussed topic.
6. Provide practical advice that's easy to implement, not just regulatory information.
7. If unsure, acknowledge it openly rather than guessing.
8. Format longer responses with bullet points or short paragraphs for readability.
9. End with 1-2 helpful follow-up suggestions related to the topic.

Remember: You're having a conversation with a real person who needs practical safety guidance.`;

/**
 * Process a user message using Hugging Face Inference API
 * @param message User's message
 * @param conversationHistory Previous conversation context
 * @param modelId The Hugging Face model to use
 */
export async function processWithHuggingFace(
  message: string, 
  previousMessages: any[],
  modelId: string = AI_MODELS.DIALOGPT
): Promise<string> {
  try {
    // Prepare conversation context from previous messages
    const conversationContext = prepareConversationContext(previousMessages);
    
    // Call the Hugging Face processing edge function
    const { data, error } = await supabase.functions.invoke('process-with-huggingface', {
      body: {
        message,
        conversationHistory: conversationContext,
        modelId,
        systemPrompt: DEFAULT_SYSTEM_PROMPT
      }
    });

    if (error) {
      console.error('Error calling Hugging Face edge function:', error);
      // Instead of returning an error message, throw an error to trigger the fallback
      throw new Error(`Failed to process with Hugging Face: ${error.message}`);
    }

    // Check if we got a fallback signal from the edge function
    if (data.fallback) {
      throw new Error('Edge function suggested using fallback');
    }

    // Get the raw response
    let response = data.response || 'Sorry, I couldn\'t generate a response at this time.';
    
    // Enhance the response tone to be more conversational
    response = enhanceResponseTone(response);
    
    return response;
  } catch (error) {
    console.error('Exception in Hugging Face processing:', error);
    // Throw the error to trigger the fallback mechanism
    throw error;
  }
}

/**
 * Fallback to generate a response when Hugging Face is unavailable
 * Uses a template-based approach with safety regulations data
 */
export function generateFallbackResponse(message: string, previousMessages: any[]): string {
  // Create a context-aware fallback by extracting topics from the conversation
  const conversationContext = prepareConversationContext(previousMessages);
  let topic = "workplace safety";
  
  // Extract potential topic from the message
  if (message.toLowerCase().includes("chemical")) topic = "chemical safety";
  else if (message.toLowerCase().includes("fall") || message.toLowerCase().includes("height")) topic = "fall protection";
  else if (message.toLowerCase().includes("ppe") || message.toLowerCase().includes("protective")) topic = "personal protective equipment";
  
  return `Great question about ${topic}! While I'm having trouble accessing my full knowledge base at the moment, I can share some helpful guidance. 

OSHA has specific regulations covering this area that can help keep your workplace safe. For the most current details, I'd recommend checking with your safety officer or visiting osha.gov.

Is there something else I can help with related to workplace safety?`;
}

/**
 * Generate potential follow-up questions based on the conversation
 * @param userMessage The user's latest message
 * @param aiResponse The AI's response to that message
 * @returns Array of suggested follow-up questions
 */
export function suggestFollowUpQuestions(userMessage: string, aiResponse: string): string[] {
  return generateFollowUpQuestions(userMessage, aiResponse);
}
