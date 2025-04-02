
import Stripe from "https://esm.sh/stripe@12.4.0";

// Initialize Stripe with the secret key
export const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  httpClient: Stripe.createFetchHttpClient(),
});

// Verify the Stripe signature
export async function verifySignature(payload: string, signature: string): Promise<any> {
  const endpointSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
  
  if (!endpointSecret) {
    console.warn("No webhook secret set, skipping signature verification");
    // If no secret is set (e.g., during development), parse the payload as JSON
    return JSON.parse(payload);
  }
  
  try {
    // Use Stripe's webhook construction to verify the signature
    return stripe.webhooks.constructEvent(payload, signature, endpointSecret);
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    throw new Error(`Webhook signature verification failed: ${error.message}`);
  }
}

// Get a Supabase client with the service role key
export function getSupabaseClient() {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Supabase URL or Service Role Key not set");
  }
  
  return { supabaseUrl, supabaseServiceKey };
}
