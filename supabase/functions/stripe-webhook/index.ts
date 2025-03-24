
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.4.0";

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const stripeWebhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");

if (!stripeKey) {
  throw new Error("Missing Stripe secret key");
}

const stripe = new Stripe(stripeKey, {
  httpClient: Stripe.createFetchHttpClient(),
});

serve(async (req) => {
  const signature = req.headers.get("stripe-signature");

  if (!signature || !stripeWebhookSecret) {
    console.error("Missing Stripe signature or webhook secret");
    return new Response(JSON.stringify({ error: "Missing signature or webhook secret" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // Get the raw request body
    const body = await req.text();
    
    // Verify the webhook signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        stripeWebhookSecret
      );
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return new Response(JSON.stringify({ error: `Webhook signature verification failed: ${err.message}` }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log(`Received webhook event: ${event.type}`);

    // Handle specific event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        
        // Extract the subscription data
        if (session.mode === 'subscription') {
          const subscriptionId = session.subscription;
          const customerId = session.customer;
          const userId = session.client_reference_id;
          const { planName, billingCycle } = session.metadata;
          
          if (!userId) {
            console.error('No user ID found in session metadata');
            break;
          }
          
          console.log(`Updating subscription for user ${userId}: Plan=${planName}, Cycle=${billingCycle}`);
          
          // Fetch subscription details to get the current period end
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          
          // Connect to Supabase directly using the REST API with service role
          const supabaseUrl = Deno.env.get('SUPABASE_URL');
          const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
          
          if (!supabaseUrl || !supabaseServiceKey) {
            throw new Error('Missing Supabase credentials');
          }
          
          // Determine the plan ID based on the plan name
          const planId = planName.toLowerCase();
          
          // Insert or update the subscription in the database
          const response = await fetch(`${supabaseUrl}/rest/v1/subscriptions`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${supabaseServiceKey}`,
              'Prefer': 'resolution=merge-duplicates',
            },
            body: JSON.stringify({
              user_id: userId,
              stripe_customer_id: customerId,
              stripe_subscription_id: subscriptionId,
              plan_id: planId,
              status: 'active',
              current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
              current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
              cancel_at_period_end: subscription.cancel_at_period_end,
            }),
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            console.error('Error updating subscription in database:', errorData);
            throw new Error('Failed to update subscription in database');
          }
          
          console.log('Successfully updated subscription in database');
        }
        break;
      }
      
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        const supabaseUrl = Deno.env.get('SUPABASE_URL');
        const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
        
        if (!supabaseUrl || !supabaseServiceKey) {
          throw new Error('Missing Supabase credentials');
        }
        
        // Find the subscription in the database by stripe_subscription_id
        const getResponse = await fetch(
          `${supabaseUrl}/rest/v1/subscriptions?stripe_subscription_id=eq.${subscription.id}`,
          {
            headers: {
              'Authorization': `Bearer ${supabaseServiceKey}`,
            },
          }
        );
        
        if (!getResponse.ok) {
          console.error('Error finding subscription in database');
          break;
        }
        
        const subscriptions = await getResponse.json();
        if (subscriptions.length === 0) {
          console.error('No matching subscription found in database');
          break;
        }
        
        // Update the subscription status and period end
        const updateResponse = await fetch(
          `${supabaseUrl}/rest/v1/subscriptions?stripe_subscription_id=eq.${subscription.id}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${supabaseServiceKey}`,
            },
            body: JSON.stringify({
              status: subscription.status,
              current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
              current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
              cancel_at_period_end: subscription.cancel_at_period_end,
            }),
          }
        );
        
        if (!updateResponse.ok) {
          console.error('Error updating subscription in database');
          throw new Error('Failed to update subscription in database');
        }
        
        console.log('Successfully updated subscription in database');
        break;
      }
      
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const supabaseUrl = Deno.env.get('SUPABASE_URL');
        const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
        
        if (!supabaseUrl || !supabaseServiceKey) {
          throw new Error('Missing Supabase credentials');
        }
        
        // Update the subscription status to canceled
        const updateResponse = await fetch(
          `${supabaseUrl}/rest/v1/subscriptions?stripe_subscription_id=eq.${subscription.id}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${supabaseServiceKey}`,
            },
            body: JSON.stringify({
              status: 'canceled',
            }),
          }
        );
        
        if (!updateResponse.ok) {
          console.error('Error updating subscription in database');
          throw new Error('Failed to update subscription in database');
        }
        
        console.log('Successfully marked subscription as canceled in database');
        break;
      }
      
      // Add more event types as needed (invoice.paid, etc.)
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(`Error processing webhook: ${error.message}`);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
