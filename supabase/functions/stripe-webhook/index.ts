
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { verifySignature, stripe } from "./utils/verification.ts";
import { handleCheckoutComplete } from "./handlers/checkout.ts";

serve(async (req) => {
  // This is a public endpoint, so we need to verify the Stripe signature
  try {
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      return new Response(JSON.stringify({ error: "No signature provided" }), { status: 400 });
    }

    // Get the raw body as text
    const rawBody = await req.text();

    // Verify the signature
    const event = await verifySignature(rawBody, signature);
    console.log(`Processing ${event.type} webhook`);

    // Handle different event types
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutComplete(event.data.object);
        break;
      case "customer.subscription.updated":
        console.log("Subscription updated", event.data.object);
        // Handle subscription updates if needed
        break;
      case "customer.subscription.deleted":
        console.log("Subscription deleted", event.data.object);
        // Handle subscription deletion if needed
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
});
