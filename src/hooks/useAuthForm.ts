
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth";
import { useNavigate } from "react-router-dom";
import { LoginFormValues, SignupFormValues } from "@/components/auth/schemas";

export function useAuthForm(redirectUrl: string = '/dashboard', selectedPlan: string = '', defaultIsSignup: boolean = false) {
  const [isLogin, setIsLogin] = useState(!defaultIsSignup);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  // If signup is specified and a plan is selected, default to signup form
  useEffect(() => {
    if (defaultIsSignup || selectedPlan) {
      setIsLogin(false);
    }
  }, [defaultIsSignup, selectedPlan]);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setAuthError(null);
  };

  const onLoginSubmit = async (values: LoginFormValues) => {
    try {
      setAuthError(null);
      setIsSubmitting(true);
      await signIn(values.email, values.password);
      
      // If a plan was selected, redirect to subscription page after login
      if (selectedPlan) {
        navigate(`/subscription?plan=${selectedPlan}`);
      }
      // Auth.tsx will handle other redirects based on onboarding status
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
      
      // Include selected plan in user metadata if applicable
      const metadata = {
        name: values.name
      };
      
      if (selectedPlan) {
        // Add selectedPlan to metadata
        Object.assign(metadata, { selectedPlan });
      }
      
      await signUp(values.email, values.password, metadata);
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
