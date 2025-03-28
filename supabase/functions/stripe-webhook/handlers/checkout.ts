
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
  const { planName, billingCycle } = session.metadata || {};
  
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
    const planId = planName?.toLowerCase() || 'basic';
    
    // Get user's organization (if any)
    const orgResponse = await fetch(
      `${supabaseUrl}/rest/v1/organization_members?user_id=eq.${userId}&select=organization_id`,
      {
        headers: {
          'Authorization': `Bearer ${supabaseServiceKey}`,
        },
      }
    );
    
    let organizationId = null;
    if (orgResponse.ok) {
      const orgMembers = await orgResponse.json();
      if (orgMembers.length > 0) {
        organizationId = orgMembers[0].organization_id;
        console.log(`Found organization ID: ${organizationId} for user ${userId}`);
      }
    }
    
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
        organization_id: organizationId,
        stripe_customer_id: customerId,
        stripe_subscription_id: subscriptionId,
        plan_id: planId,
        status: subscription.status,
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
    
    // If this is the first subscription, update user metadata to mark as subscribed
    const userUpdateResponse = await fetch(`${supabaseUrl}/auth/v1/admin/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseServiceKey}`,
      },
      body: JSON.stringify({
        user_metadata: {
          has_subscription: true,
          subscription_plan: planId,
          subscription_status: subscription.status,
        },
      }),
    });
    
    if (!userUpdateResponse.ok) {
      console.warn('Could not update user metadata with subscription info');
    } else {
      console.log('Successfully updated user metadata with subscription info');
    }
  } catch (error) {
    console.error('Error in handleCheckoutComplete:', error);
    throw error;
  }
}
