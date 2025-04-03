
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.4.0";

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse the request body
    const { priceId, billingCycle, planName, userId, returnUrl } = await req.json();

    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      httpClient: Stripe.createFetchHttpClient(),
    });

    // Validate required fields
    if (!priceId || !billingCycle || !planName || !userId) {
      return new Response(
        JSON.stringify({ 
          error: "Missing required parameters: priceId, billingCycle, planName, and userId are required" 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    console.log(`Creating checkout session for user ${userId}, plan ${planName}, billing cycle ${billingCycle}`);

    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: returnUrl ? `${returnUrl}?session_id={CHECKOUT_SESSION_ID}` : `${req.headers.get("origin")}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/subscription`,
      client_reference_id: userId,
      subscription_data: {
        metadata: {
          user_id: userId,
          plan_name: planName,
          billing_cycle: billingCycle
        }
      },
      metadata: {
        user_id: userId,
        plan_name: planName,
        billing_cycle: billingCycle
      }
    });

    console.log(`Checkout session created: ${session.id}`);

    // Return the session URL
    return new Response(
      JSON.stringify({ url: session.url }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error("Error creating checkout session:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
