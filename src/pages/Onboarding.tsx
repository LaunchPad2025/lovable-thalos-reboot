
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import OnboardingFlow from '@/components/auth/OnboardingFlow';

export default function Onboarding() {
  const { user, loading, session } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If user is not logged in, redirect to auth page
    if (!loading && !user) {
      navigate('/auth');
    }
    
    // If user has already completed onboarding, redirect to dashboard
    if (user?.user_metadata?.onboarded) {
      navigate('/');
    }
  }, [user, loading, navigate]);
  
  // If still loading, show nothing (or could add a loading spinner)
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  // If no user, will redirect via useEffect
  if (!user) {
    return null;
  }
  
  return <OnboardingFlow />;
}
