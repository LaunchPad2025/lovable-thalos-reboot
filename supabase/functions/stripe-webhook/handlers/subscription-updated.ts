
import { getSupabaseClient } from "../utils/supabase.ts";

export async function handleSubscriptionUpdated(subscription) {
  const { supabaseUrl, supabaseServiceKey } = getSupabaseClient();
  
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
    throw new Error('Failed to find subscription in database');
  }
  
  const subscriptions = await getResponse.json();
  if (subscriptions.length === 0) {
    console.error('No matching subscription found in database');
    return;
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
}
