
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const [isReady, setIsReady] = useState(false);

  // For debugging
  useEffect(() => {
    console.log("Auth state in ProtectedRoute:", { user, loading, isReady });
  }, [user, loading, isReady]);

  useEffect(() => {
    // Add a small delay to ensure auth state is properly initialized
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 800); // Increased from 500ms to 800ms
    
    return () => clearTimeout(timer);
  }, []);

  // Show a loading indicator while checking auth state
  if (loading || !isReady) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#0b0f14]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <div className="ml-4 text-blue-500">Authenticating...</div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    console.log("User not authenticated, redirecting to login");
    return <Navigate to="/auth" replace />;
  }

  // Render the protected content
  console.log("User authenticated, rendering protected route");
  return <Outlet />;
};

export default ProtectedRoute;
