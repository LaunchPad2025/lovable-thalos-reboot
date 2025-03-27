
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { AuthMessage } from "@/components/auth/AuthMessage";
import { useAuthForm } from "@/hooks/useAuthForm";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function Auth() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const {
    isLogin,
    authError,
    isSubmitting,
    toggleAuthMode,
    onLoginSubmit,
    onSignupSubmit
  } = useAuthForm();

  // Handle successful login and redirect to appropriate page
  useEffect(() => {
    // Only redirect if user is logged in and done loading
    if (user && !loading) {
      console.log("User authenticated, redirecting...");
      // Check if user has completed onboarding
      if (user?.user_metadata?.onboarded === false) {
        navigate("/onboarding");
      } else {
        navigate("/dashboard");
      }
    }
  }, [user, loading, navigate]);

  // Show loading state while authentication state is being determined
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b0f14]">
        <div className="flex flex-col items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
          <p className="mt-4 text-gray-400">Loading authentication...</p>
        </div>
      </div>
    );
  }

  // If user is already logged in, useEffect will handle redirect
  if (user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0b0f14]">
        <div className="flex flex-col items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
          <p className="mt-4 text-gray-400">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0b0f14]">
      <div className="w-full max-w-md space-y-8 rounded-lg border border-gray-800 bg-[#131920] p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">
            {isLogin ? "Sign in to your account" : "Create a new account"}
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            {isLogin
              ? "Enter your credentials to access your account"
              : "Fill in the details to create your account"}
          </p>
        </div>

        <AuthMessage message={authError} />

        {isLogin ? (
          <LoginForm onSubmit={onLoginSubmit} isSubmitting={isSubmitting} />
        ) : (
          <SignupForm onSubmit={onSignupSubmit} isSubmitting={isSubmitting} />
        )}

        <div className="mt-6 text-center">
          <button
            onClick={toggleAuthMode}
            className="text-sm text-blue-500 hover:text-blue-400"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-800 text-center">
          <p className="text-xs text-gray-500">
            Thalos Technologies Inc.
          </p>
        </div>
      </div>
    </div>
  );
}
