
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import OnboardingFlow from '@/components/auth/OnboardingFlow';

export default function Onboarding() {
  const { user, loading, session } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check for auth token in URL (if coming from a direct login)
  const searchParams = new URLSearchParams(location.search);
  const authToken = searchParams.get('authToken');
  
  useEffect(() => {
    // If user is not logged in and no auth token, redirect to auth page
    if (!loading && !user && !authToken) {
      navigate('/auth');
      return;
    }
    
    // If user has already completed onboarding, redirect to dashboard
    if (user?.user_metadata?.onboarded) {
      navigate('/');
    }
  }, [user, loading, navigate, authToken]);
  
  // If still loading, show a loading indicator
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  // If no user but we have an auth token, allow onboarding to continue
  // as the auth token will enable account creation
  if (!user && !authToken) {
    return null;
  }
  
  return <OnboardingFlow authToken={authToken} />;
}
