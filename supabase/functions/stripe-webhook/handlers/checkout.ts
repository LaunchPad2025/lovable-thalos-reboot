
import { stripe } from "../utils/verification.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8";

export async function handleCheckoutComplete(session: any) {
  console.log("Processing checkout.session.completed event...");
  
  try {
    // Extract metadata from the session
    const userId = session.metadata?.user_id || session.client_reference_id;
    const planName = session.metadata?.plan_name;
    const billingCycle = session.metadata?.billing_cycle;
    
    if (!userId) {
      throw new Error("User ID not found in session metadata");
    }
    
    console.log(`Checkout completed for user ${userId}, plan ${planName}, billing cycle ${billingCycle}`);
    
    // Get the subscription details
    const subscriptionId = session.subscription;
    if (!subscriptionId) {
      throw new Error("Subscription ID not found in session");
    }
    
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    if (!subscription) {
      throw new Error("Failed to retrieve subscription details");
    }
    
    // Initialize Supabase client
    const { supabaseUrl, supabaseServiceKey } = getSupabaseClient();
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Update or create the subscription record in the database
    const { error: upsertError } = await supabase
      .from('subscriptions')
      .upsert({
        user_id: userId,
        stripe_customer_id: subscription.customer as string,
        stripe_subscription_id: subscription.id,
        plan_id: planName || "pro", // Default to pro if not specified
        status: subscription.status,
        price_id: subscription.items.data[0].price.id,
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        cancel_at_period_end: subscription.cancel_at_period_end,
        created_at: new Date().toISOString(),
        analyses_total: getAnalysesTotal(planName || "pro"),
        analyses_remaining: getAnalysesTotal(planName || "pro")
      });
    
    if (upsertError) {
      throw new Error(`Failed to update subscription record: ${upsertError.message}`);
    }
    
    console.log(`Subscription record updated successfully for user ${userId}`);
    
    // Check if the user is coming from Lovable integration (return URL in metadata)
    const returnUrl = session.metadata?.return_url;
    if (returnUrl && returnUrl.includes('lovable')) {
      // Generate auth token for Lovable
      const { data: tokenData, error: tokenError } = await supabase.auth.admin.createUserToken({
        userId: userId
      });
      
      if (tokenError) {
        throw new Error(`Failed to generate auth token: ${tokenError.message}`);
      }
      
      // Call Lovable webhook to notify subscription success
      const lovableUrl = returnUrl.includes('?') 
        ? `${returnUrl}&auth_token=${tokenData.token}` 
        : `${returnUrl}?auth_token=${tokenData.token}`;
      
      // Not awaiting this call as it's a notification, not critical for our flow
      fetch(lovableUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userId,
          plan: planName,
          status: 'active',
          auth_token: tokenData.token
        })
      }).catch(err => {
        console.error(`Failed to notify Lovable: ${err.message}`);
      });
      
      console.log(`Redirecting to Lovable: ${lovableUrl}`);
    }
  } catch (error) {
    console.error(`Error handling checkout completion: ${error.message}`);
    throw error;
  }
}

// Helper function to get the Supabase client details
function getSupabaseClient() {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Supabase URL or Service Role Key not set");
  }
  
  return { supabaseUrl, supabaseServiceKey };
}

// Helper function to determine the number of analyses for a plan
function getAnalysesTotal(planName: string): number {
  switch (planName) {
    case "basic":
      return 10;
    case "pro":
      return 50;
    case "premium":
      return 250;
    case "enterprise":
      return 9999; // "Unlimited"
    default:
      return 50; // Default to pro
  }
}
