
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isSignup = searchParams.get('signup') === 'true';
  
  useEffect(() => {
    // Get the return URL if specified, otherwise default to dashboard
    const returnUrl = searchParams.get('return_url') || window.location.origin + '/dashboard';
    
    // Redirect to the appropriate Replit auth page
    if (isSignup) {
      window.location.href = `https://your-replit-app.replit.app/signup?return_url=${encodeURIComponent(returnUrl)}`;
    } else {
      window.location.href = `https://your-replit-app.replit.app/login?return_url=${encodeURIComponent(returnUrl)}`;
    }
  }, [isSignup, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0b0f14]">
      <div className="w-full max-w-md space-y-8 rounded-lg border border-gray-800 bg-[#131920] p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">
            {isSignup ? "Creating your account..." : "Signing you in..."}
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Redirecting to authentication page...
          </p>
        </div>
      </div>
    </div>
  );
}
