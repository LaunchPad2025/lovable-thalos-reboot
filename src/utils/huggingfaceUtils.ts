
import { supabase } from '@/lib/supabase';
import { prepareConversationContext, enhanceResponseTone, generateFollowUpQuestions } from './conversationUtils';

// Model options
export const AI_MODELS = {
  FALCON: 'OpenAssistant/falcon-7b-sft',
  DIALOGPT: 'microsoft/DialoGPT-medium',
  OPENASSISTANT: 'OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5',
  LLAMA2: 'meta-llama/Llama-2-7b-chat-hf'
};

// Enhanced system prompt for better conversational safety assistant
const DEFAULT_SYSTEM_PROMPT = `You are Paulie, an AI assistant specialized in workplace safety and compliance. 
Your expertise includes OSHA regulations, EPA guidelines, and industry best practices.

When responding:
1. Be friendly, conversational, and helpful - you're a knowledgeable colleague, not just a database.
2. Use simple, clear language while being precise about regulatory details.
3. When citing regulations, include specific sections, potential fines, and practical implementation advice.
4. If you're unsure about something, acknowledge it openly rather than guessing.
5. Consider the context of the entire conversation, not just the current question.
6. When appropriate, ask clarifying questions to better understand the user's needs.
7. Format your responses with markdown when it helps with readability.
8. Suggest relevant follow-up considerations or next steps when helpful.

Remember: You're helping real people navigate complex safety regulations to keep workers safe.`;

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
    
    // Enhance the response tone to be more conversational if needed
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
  
  return `I understand you're asking about ${topic}. While I'm having trouble accessing my full knowledge base at the moment, I can share that OSHA has specific regulations covering this area. For the most detailed and current guidance, I recommend consulting your company's safety officer or official OSHA documentation at osha.gov. Would you like me to help you with something else related to workplace safety?`;
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
