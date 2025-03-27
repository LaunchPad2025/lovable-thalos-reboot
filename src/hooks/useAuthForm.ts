
import { useState } from "react";
import { useAuth } from "@/context/auth";
import { LoginFormValues, SignupFormValues } from "@/components/auth/schemas";
import { toast } from "sonner";

export function useAuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn, signUp } = useAuth();

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setAuthError(null);
  };

  const onLoginSubmit = async (values: LoginFormValues) => {
    try {
      setAuthError(null);
      setIsSubmitting(true);
      console.log("Attempting to sign in with:", values.email);
      
      await signIn(values.email, values.password);
      console.log("Sign in completed");
      
      // Auth component will handle redirect after successful login
    } catch (error: any) {
      console.error("Login error:", error);
      setAuthError(
        error.message || 
        "Unable to sign in. Please check your credentials and try again."
      );
      toast.error("Login failed: " + (error.message || "Authentication error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSignupSubmit = async (values: SignupFormValues) => {
    try {
      setAuthError(null);
      setIsSubmitting(true);
      console.log("Attempting to sign up with:", values.email);
      
      await signUp(values.email, values.password, values.name);
      console.log("Sign up completed");
      
      setIsLogin(true); // Switch to login form after successful signup
      setAuthError("Registration successful! Please check your email to confirm your account. After logging in, you'll complete a quick onboarding process.");
      toast.success("Account created! Please check your email.");
    } catch (error: any) {
      console.error("Signup error:", error);
      if (error.message?.includes("already registered")) {
        setAuthError("This email is already registered. Please try signing in instead.");
        toast.error("This email is already registered");
      } else {
        setAuthError(
          error.message || 
          "Unable to create account. Please try again later."
        );
        toast.error("Signup failed: " + (error.message || "Registration error"));
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
