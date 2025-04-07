
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Loader2, HardHat } from "lucide-react";

export default function Auth() {
  const location = useLocation();
  
  // Immediately redirect to Replit authentication
  useEffect(() => {
    // Just redirect to Replit auth
    window.location.href = "https://thalostech.replit.app/api/auth" + location.search;
  }, [location.search]);
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0b0f14]">
      <div className="w-full max-w-md space-y-8 rounded-lg border border-gray-800 bg-[#131920] p-8 shadow-lg">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-blue-600/20 rounded-full">
            <HardHat className="h-12 w-12 text-blue-500" />
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">
            Redirecting to authentication...
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            You will be redirected to our authentication service in a moment.
          </p>
          <div className="flex justify-center mt-6">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
