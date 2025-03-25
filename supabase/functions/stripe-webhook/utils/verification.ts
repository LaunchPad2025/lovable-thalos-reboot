
import Stripe from "https://esm.sh/stripe@12.4.0";

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const stripeWebhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");

if (!stripeKey) {
  throw new Error("Missing Stripe secret key");
}

export const stripe = new Stripe(stripeKey, {
  httpClient: Stripe.createFetchHttpClient(),
});

export async function verifyRequest(req) {
  const signature = req.headers.get("stripe-signature");

  if (!signature || !stripeWebhookSecret) {
    console.error("Missing Stripe signature or webhook secret");
    throw new Error("Missing signature or webhook secret");
  }

  // Get the raw request body
  const body = await req.text();
  
  try {
    // Verify the webhook signature
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      stripeWebhookSecret
    );
    
    return event;
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    throw new Error(`Webhook signature verification failed: ${err.message}`);
  }
}
