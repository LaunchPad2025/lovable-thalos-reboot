
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { AuthMessage } from "@/components/auth/AuthMessage";
import { useAuthForm } from "@/hooks/useAuthForm";

export default function Auth() {
  const { user } = useAuth();
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
  const handleSuccessfulAuth = () => {
    // Check if user has completed onboarding
    if (user?.user_metadata?.onboarded === false) {
      navigate("/onboarding");
    } else {
      navigate("/");
    }
  };

  // Redirect if user is already logged in
  if (user) {
    handleSuccessfulAuth();
    return null;
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
            Thalos - powered by Steel Toe
          </p>
        </div>
      </div>
    </div>
  );
}
