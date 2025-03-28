
import { useAuth } from '@/context/auth';
import { useSubscription } from '@/hooks/useSubscription';

/**
 * Hook to determine if the user is in a demo mode, free trial, or authenticated
 * @returns Object containing authentication status
 */
export function useAuthStatus() {
  const { user, loading } = useAuth();
  const { subscription } = useSubscription();
  
  // Check if the current route is the demo page
  const isDemoMode = window.location.pathname.includes('/demo');
  
  // Determine if the user is on a free trial based on metadata or subscription status
  const isFreeTrial = 
    // Check user metadata first
    (user?.user_metadata?.onboarded && user?.user_metadata?.subscriptionStatus === 'trial') ||
    // Or check if there's an active subscription in trial period
    (subscription?.status === 'trialing');
  
  // Calculate trial days left if applicable
  let trialDaysLeft = 0;
  if (isFreeTrial) {
    if (subscription?.current_period_end) {
      // If we have subscription data, use it to calculate days left
      const trialEndDate = new Date(subscription.current_period_end);
      const today = new Date();
      trialDaysLeft = Math.max(0, Math.ceil((trialEndDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
    } else if (user?.user_metadata?.onboardedAt) {
      // Fall back to user metadata with default 14-day trial
      const onboardedDate = new Date(user.user_metadata.onboardedAt);
      const trialEndDate = new Date(onboardedDate.getTime() + 14 * 24 * 60 * 60 * 1000);
      const today = new Date();
      trialDaysLeft = Math.max(0, Math.ceil((trialEndDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
    }
  }
  
  // User is authenticated if they have a user object and are not in demo mode
  const isAuthenticated = !!user && !isDemoMode;
  
  // Determine if the user has an active subscription
  const hasActiveSubscription = subscription?.status === 'active';
  
  // Get the user's plan ID
  const planId = user?.user_metadata?.plan_id || subscription?.plan_id || 'basic';
  
  return {
    isAuthenticated,
    isDemoMode,
    isFreeTrial,
    trialDaysLeft,
    hasActiveSubscription,
    planId,
    isLoading: loading,
    user,
    subscription
  };
}
