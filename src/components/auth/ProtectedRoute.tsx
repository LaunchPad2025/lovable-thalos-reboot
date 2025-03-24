
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  // Show a loading indicator while checking auth state
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#0b0f14]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Render the protected content
  return <Outlet />;
};

export default ProtectedRoute;
