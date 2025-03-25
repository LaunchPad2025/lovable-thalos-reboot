
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { toast } from 'sonner';
import { Loader2 } from "lucide-react";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const [isReady, setIsReady] = useState(false);

  // For debugging
  useEffect(() => {
    console.log("Auth state in ProtectedRoute:", { user: !!user, userId: user?.id, loading, isReady });
  }, [user, loading, isReady]);

  useEffect(() => {
    // Only start the ready timer once loading is complete
    if (!loading) {
      const timer = setTimeout(() => {
        setIsReady(true);
        console.log("ProtectedRoute is now ready");
      }, 500); // Reduced to 500ms since we're now waiting for loading to complete first
      
      return () => clearTimeout(timer);
    }
  }, [loading]);

  // Show a loading indicator while checking auth state
  if (loading || !isReady) {
    console.log("Still loading authentication state...");
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#0b0f14]">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
        <div className="ml-4 text-blue-500">
          {loading ? "Checking authentication..." : "Preparing application..."}
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    console.log("User not authenticated, redirecting to login");
    toast.error("Please log in to access this page");
    return <Navigate to="/auth" replace />;
  }

  // Render the protected content
  console.log("User authenticated, rendering protected route");
  return <Outlet />;
};

export default ProtectedRoute;
