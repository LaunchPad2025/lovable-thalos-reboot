
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
  
  useEffect(() => {
    // Get the return URL if specified, otherwise default to dashboard
    const returnUrl = searchParams.get('return_url') || window.location.origin + '/dashboard';
    
    const redirectToAuth = async () => {
      try {
        // Call the API to get the auth URL with proper token
        const response = await fetch(`https://your-replit-app.replit.app/${isSignup ? 'signup' : 'login'}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            return_url: returnUrl,
            integration_token: 'lovable_integration_org_123'
          }),
        });
        
        const data = await response.json();
        
        if (data.auth_url) {
          // Redirect to the authentication URL
          window.location.href = data.auth_url;
        } else {
          setError('Failed to get authentication URL');
          toast.error('Authentication service unavailable');
        }
      } catch (err) {
        console.error('Auth redirect error:', err);
        setError('Failed to connect to authentication service');
        toast.error('Authentication service unavailable');
      }
    };
    
    // Wait a moment to show the loading state, then redirect
    const timer = setTimeout(() => {
      redirectToAuth();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [isSignup, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0b0f14]">
      <div className="w-full max-w-md space-y-8 rounded-lg border border-gray-800 bg-[#131920] p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">
            {isSignup ? "Creating your account..." : "Signing you in..."}
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            {error || "Redirecting to authentication page..."}
          </p>
          
          {!error && (
            <div className="mt-6 flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          )}
          
          {error && (
            <button
              onClick={() => navigate('/')}
              className="mt-6 rounded bg-gray-700 px-4 py-2 text-white hover:bg-gray-600"
            >
              Return Home
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
