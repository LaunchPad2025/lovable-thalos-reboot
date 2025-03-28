
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

const HUGGINGFACE_API_KEY = Deno.env.get("HUGGINGFACE_API_KEY");
const DEFAULT_MODEL = "microsoft/DialoGPT-medium";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory, modelId, systemPrompt } = await req.json();
    
    // Verify required inputs
    if (!message) {
      throw new Error("Message is required");
    }

    // Use default model if none specified
    const model = modelId || DEFAULT_MODEL;
    console.log(`Processing message with model: ${model}`);

    // Prepare the prompt with system instruction and conversation history
    let prompt = "";
    if (systemPrompt) {
      prompt += `${systemPrompt}\n\n`;
    }
    
    if (conversationHistory) {
      prompt += `${conversationHistory}\n\n`;
    }
    
    prompt += `Human: ${message}\nAssistant:`;

    // Call the Hugging Face Inference API
    const response = await fetch("https://api-inference.huggingface.co/models/" + model, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
        ...corsHeaders
      },
      body: JSON.stringify({ 
        inputs: prompt,
        parameters: {
          temperature: 0.7,
          max_new_tokens: 500,
          return_full_text: false
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Hugging Face API error: ${response.status} - ${errorText}`);
      throw new Error(`Hugging Face API returned ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    const generatedText = result[0]?.generated_text || "I couldn't generate a response at this time.";

    return new Response(
      JSON.stringify({ response: generatedText }),
      { headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error) {
    console.error(`Error in process-with-huggingface function: ${error.message}`);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        fallback: true
      }),
      { 
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders } 
      }
    );
  }
});
