
import { useState } from "react";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";
import { LoginFormValues, SignupFormValues } from "@/components/auth/schemas";

export function useAuthForm(redirectUrl: string = '/dashboard') {
  const [isLogin, setIsLogin] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setAuthError(null);
  };

  const onLoginSubmit = async (values: LoginFormValues) => {
    try {
      setAuthError(null);
      setIsSubmitting(true);
      await signIn(values.email, values.password);
      // Auth.tsx will handle redirects based on onboarding status
    } catch (error: any) {
      console.error("Login error:", error);
      setAuthError(
        error.message || 
        "Unable to sign in. Please check your credentials and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSignupSubmit = async (values: SignupFormValues) => {
    try {
      setAuthError(null);
      setIsSubmitting(true);
      await signUp(values.email, values.password, values.name);
      setAuthError("Registration successful! Please check your email to confirm your account. After logging in, you'll complete a quick onboarding process.");
      // Don't navigate yet, let them confirm their email first
    } catch (error: any) {
      console.error("Signup error:", error);
      if (error.message?.includes("already registered")) {
        setAuthError("This email is already registered. Please try signing in instead.");
      } else {
        setAuthError(
          error.message || 
          "Unable to create account. Please try again later."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isLogin,
    authError,
    isSubmitting,
    toggleAuthMode,
    onLoginSubmit,
    onSignupSubmit
  };
}
