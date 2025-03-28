
import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import OnboardingFlow from '@/components/auth/OnboardingFlow';
import { Loader2 } from 'lucide-react';

export default function Onboarding() {
  const { user, loading, session } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isReady, setIsReady] = useState(false);
  
  // Extract redirect URL from query params if present
  const searchParams = new URLSearchParams(location.search);
  const redirectUrl = searchParams.get('redirect') || '/dashboard';
  
  useEffect(() => {
    // Add a short delay to ensure auth state is properly loaded
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (isReady) {
      // If user is not logged in, redirect to auth page
      if (!loading && !user) {
        navigate(`/auth?redirect=${encodeURIComponent('/onboarding')}`);
        return;
      }
      
      // If user has already completed onboarding, redirect to dashboard or specified redirect
      if (user?.user_metadata?.onboarded) {
        navigate(redirectUrl);
        return;
      }
    }
  }, [user, loading, navigate, isReady, redirectUrl]);
  
  // If still loading or not ready, show loading spinner
  if (loading || !isReady) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0b0f14]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-400">Loading your account information...</p>
        </div>
      </div>
    );
  }
  
  // If no user, will redirect via useEffect
  if (!user) {
    return null;
  }
  
  return <OnboardingFlow redirectUrl={redirectUrl} />;
}
