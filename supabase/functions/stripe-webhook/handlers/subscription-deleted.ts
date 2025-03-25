
import { getSupabaseClient } from "../utils/supabase.ts";

export async function handleSubscriptionDeleted(subscription) {
  const { supabaseUrl, supabaseServiceKey } = getSupabaseClient();
  
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
}
