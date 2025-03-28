
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { AuthMessage } from "@/components/auth/AuthMessage";
import { useAuthForm } from "@/hooks/useAuthForm";

export default function Auth() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract redirect URL and plan from query params if present
  const searchParams = new URLSearchParams(location.search);
  const redirectUrl = searchParams.get('redirect') || '/dashboard';
  const selectedPlan = searchParams.get('plan') || '';
  const isSignup = searchParams.get('signup') === 'true';
  
  const {
    isLogin,
    authError,
    isSubmitting,
    toggleAuthMode,
    onLoginSubmit,
    onSignupSubmit
  } = useAuthForm(redirectUrl, selectedPlan, isSignup);

  // Redirect if user is already logged in
  if (user) {
    // Check if user has completed onboarding
    if (user?.user_metadata?.onboarded === false) {
      // Pass the selected plan to onboarding if it exists
      const onboardingUrl = `/onboarding?redirect=${encodeURIComponent(redirectUrl)}`;
      const finalUrl = selectedPlan ? `${onboardingUrl}&plan=${selectedPlan}` : onboardingUrl;
      return <Navigate to={finalUrl} replace />;
    } else if (selectedPlan) {
      // If user is logged in and has a plan selected, redirect to subscription page
      return <Navigate to={`/subscription?plan=${selectedPlan}`} replace />;
    } else {
      return <Navigate to={redirectUrl} replace />;
    }
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
