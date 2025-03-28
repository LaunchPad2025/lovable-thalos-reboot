
import { supabase } from '@/lib/supabase';

// Model options
export const AI_MODELS = {
  FALCON: 'OpenAssistant/falcon-7b-sft',
  DIALOGPT: 'microsoft/DialoGPT-medium',
  OPENASSISTANT: 'OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5',
  LLAMA2: 'meta-llama/Llama-2-7b-chat-hf'
};

// Default system prompt for safety assistant
const DEFAULT_SYSTEM_PROMPT = `You are Paulie, an AI assistant specialized in workplace safety and compliance. 
Your expertise includes OSHA regulations, EPA guidelines, and industry best practices.
Be friendly, conversational, and helpful. Use simple language when possible.
If you're unsure about something, acknowledge it and suggest reliable resources.
Format your responses with markdown when it helps with readability.`;

/**
 * Process a user message using Hugging Face Inference API
 * @param message User's message
 * @param conversationHistory Previous conversation context
 * @param modelId The Hugging Face model to use
 */
export async function processWithHuggingFace(
  message: string, 
  conversationHistory: string, 
  modelId: string = AI_MODELS.DIALOGPT
): Promise<string> {
  try {
    // Call the Hugging Face processing edge function
    const { data, error } = await supabase.functions.invoke('process-with-huggingface', {
      body: {
        message,
        conversationHistory,
        modelId,
        systemPrompt: DEFAULT_SYSTEM_PROMPT
      }
    });

    if (error) {
      console.error('Error calling Hugging Face edge function:', error);
      return `I'm having trouble processing your request. Please try again later. Error: ${error.message}`;
    }

    return data.response || 'Sorry, I couldn\'t generate a response at this time.';
  } catch (error) {
    console.error('Exception in Hugging Face processing:', error);
    return 'I apologize, but I encountered an unexpected error. Please try again later.';
  }
}

/**
 * Fallback to generate a response when Hugging Face is unavailable
 * Uses a template-based approach with safety regulations data
 */
export function generateFallbackResponse(message: string): string {
  // In a real implementation, this would use your safety regulations data
  // For now, return a generic response
  return "I understand you're asking about workplace safety. While I'm having trouble accessing my full knowledge base at the moment, I recommend consulting your company's safety officer or official OSHA documentation for the most accurate guidance.";
}
