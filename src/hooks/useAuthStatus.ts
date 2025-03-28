
import { useAuth } from '@/context/auth';

/**
 * Hook to determine if the user is in a demo mode, free trial, or authenticated
 * @returns Object containing authentication status
 */
export function useAuthStatus() {
  const { user, loading } = useAuth();
  
  // Check if the current route is the demo page
  const isDemoMode = window.location.pathname.includes('/demo');
  
  // Determine if the user is on a free trial based on metadata
  const isFreeTrial = user?.user_metadata?.onboarded && 
    (!user?.user_metadata?.subscriptionStatus || user?.user_metadata?.subscriptionStatus === 'trial');
  
  // User is authenticated if they have a user object and are not in demo mode
  const isAuthenticated = !!user && !isDemoMode;
  
  return {
    isAuthenticated,
    isDemoMode,
    isFreeTrial,
    isLoading: loading,
    user
  };
}
