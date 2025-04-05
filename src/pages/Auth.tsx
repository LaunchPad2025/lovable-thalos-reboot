
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Auth() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  // Immediately redirect to Replit authentication
  useEffect(() => {
    // Just redirect to Replit auth
    window.location.href = "https://thalostech.replit.app/api/auth" + location.search;
  }, [location.search]);
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0b0f14]">
      <div className="w-full max-w-md space-y-8 rounded-lg border border-gray-800 bg-[#131920] p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">
            Redirecting to authentication...
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            You will be redirected to our authentication service in a moment.
          </p>
        </div>
      </div>
    </div>
  );
}
