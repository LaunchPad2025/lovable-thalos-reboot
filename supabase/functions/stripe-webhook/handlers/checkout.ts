
import { stripe } from "../utils/verification.ts";
import { getSupabaseClient } from "../utils/supabase.ts";

export async function handleCheckoutComplete(session) {
  // Extract the subscription data
  if (session.mode !== 'subscription') {
    console.log('Not a subscription checkout, skipping');
    return;
  }
  
  const subscriptionId = session.subscription;
  const customerId = session.customer;
  const userId = session.client_reference_id;
  const { planName, billingCycle } = session.metadata;
  
  if (!userId) {
    console.error('No user ID found in session metadata');
    return;
  }
  
  console.log(`Updating subscription for user ${userId}: Plan=${planName}, Cycle=${billingCycle}`);
  
  try {
    // Fetch subscription details to get the current period end
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    
    // Connect to Supabase directly using the REST API with service role
    const { supabaseUrl, supabaseServiceKey } = getSupabaseClient();
    
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
    
    // Also update the user's subscription_tier in their profile
    const userUpdateResponse = await fetch(`${supabaseUrl}/rest/v1/profiles?id=eq.${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseServiceKey}`,
      },
      body: JSON.stringify({
        subscription_tier: planId,  // Update the user's subscription tier
        updated_at: new Date().toISOString(),
      }),
    });
    
    if (!userUpdateResponse.ok) {
      console.error('Error updating user profile with subscription tier');
      // We don't throw here as the subscription was successfully recorded
    }
    
    console.log('Successfully updated subscription in database and user profile');
  } catch (error) {
    console.error('Error in handleCheckoutComplete:', error);
    throw error;
  }
}
