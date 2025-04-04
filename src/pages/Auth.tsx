
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isSignup = searchParams.get('signup') === 'true';
  const [error, setError] = useState<string | null>(null);
  const [isTimedOut, setIsTimedOut] = useState(false);
  
  // Get Lovable integration parameters
  const selectedPlan = searchParams.get('plan') || null;
  const returnUrlParam = searchParams.get('return_url') || null;
  
  useEffect(() => {
    // Get the return URL if specified, otherwise default to dashboard
    const returnUrl = returnUrlParam || searchParams.get('return_url') || window.location.origin + '/dashboard';
    
    const generateLoginLink = async () => {
      try {
        // Generate a unique identifier for the user based on timestamp and random number
        const uniqueId = Date.now() + Math.floor(Math.random() * 10000);
        
        // Prepare payload for the direct login API
        const payload = {
          userId: uniqueId,
          username: `user_${uniqueId}`,
          email: `user${uniqueId}@example.com`,
          subscriptionPlan: selectedPlan,
          returnUrl: returnUrl
        };
        
        // Call the API to get the direct login URL
        const response = await fetch(`https://thalostech.replit.app/api/auth/generate-login-link`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer lovable_integration_org_123'
          },
          body: JSON.stringify(payload),
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Authentication service error');
        }
        
        const data = await response.json();
        
        if (data.success && data.loginUrl) {
          // Redirect to the authentication URL
          window.location.href = data.loginUrl;
        } else if (data.success && data.token) {
          // We received a token but no login URL - this means we should handle direct subscription
          if (selectedPlan) {
            // If there's a selected plan, redirect to the direct subscription endpoint
            window.location.href = `https://thalostech.replit.app/api/direct-subscription?plan=${selectedPlan}&authToken=${data.token}&returnUrl=${encodeURIComponent(returnUrl)}`;
          } else {
            // If no plan, just redirect to the return URL with the auth token
            window.location.href = `${returnUrl}?authToken=${data.token}`;
          }
        } else {
          setError('Failed to generate login credentials');
          toast.error('Authentication service unavailable');
        }
      } catch (err) {
        console.error('Auth redirect error:', err);
        setError('Failed to connect to authentication service');
        toast.error('Authentication service unavailable');
      }
    };
    
    // Set a timeout to detect if the API call is taking too long
    const timeoutTimer = setTimeout(() => {
      setIsTimedOut(true);
    }, 10000);
    
    // Wait a moment to show the loading state, then redirect
    const timer = setTimeout(() => {
      generateLoginLink();
    }, 1000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(timeoutTimer);
    };
  }, [isSignup, searchParams, navigate, selectedPlan, returnUrlParam]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0b0f14]">
      <div className="w-full max-w-md space-y-8 rounded-lg border border-gray-800 bg-[#131920] p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">
            {isSignup ? "Creating your account..." : "Signing you in..."}
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            {error || "Generating secure login link..."}
          </p>
          
          {!error && !isTimedOut && (
            <div className="mt-6 flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          )}
          
          {(error || isTimedOut) && (
            <>
              {isTimedOut && !error && (
                <p className="mt-4 text-amber-400">
                  Connection is taking longer than expected. The authentication service might be temporarily unavailable.
                </p>
              )}
              <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
                <button
                  onClick={() => window.location.reload()}
                  className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Try Again
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="mt-2 sm:mt-0 rounded bg-gray-700 px-4 py-2 text-white hover:bg-gray-600"
                >
                  Return Home
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
