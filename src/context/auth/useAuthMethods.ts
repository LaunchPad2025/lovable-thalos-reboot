
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { UseAuthMethodsProps, UserMetadata } from './types';

export function useAuthMethods({ user, setUser }: UseAuthMethodsProps) {
  const { toast: uiToast } = useToast();

  const signUp = async (email: string, password: string, name: string, additionalMetadata = {}) => {
    try {
      console.log("Attempting to sign up:", email);
      
      // Ensure we have base metadata with the name
      const metadata: UserMetadata = {
        name,
        role: 'worker', // Default role
        onboarded: false, // Flag to indicate onboarding status
        ...additionalMetadata // Include any additional metadata like selected plan
      };
      
      console.log("Sign up with metadata:", metadata);
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      });

      if (error) {
        throw error;
      }

      uiToast({
        title: "Account created!",
        description: "Please check your email to confirm your account.",
      });
      toast.success("Account created! Please check your email.");
    } catch (error: any) {
      console.error("Sign up error:", error);
      uiToast({
        title: "Error creating account",
        description: error.message,
        variant: "destructive",
      });
      toast.error("Error creating account: " + error.message);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Attempting to sign in:", email);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      uiToast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
      toast.success("Welcome back!");
    } catch (error: any) {
      console.error("Sign in error:", error);
      uiToast({
        title: "Error signing in",
        description: error.message,
        variant: "destructive",
      });
      toast.error("Error signing in: " + error.message);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      console.log("Signing out...");
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      
      // Clear state immediately to improve UX
      setUser(null);
      
    } catch (error: any) {
      console.error("Sign out error:", error);
      uiToast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
      toast.error("Error signing out: " + error.message);
    }
  };

  const updateUserProfile = async (metadata: UserMetadata) => {
    try {
      console.log("Updating user profile:", metadata);
      const { error } = await supabase.auth.updateUser({
        data: {
          ...user?.user_metadata,
          ...metadata
        }
      });

      if (error) throw error;
      
      // Update the local user state with the new metadata
      if (user) {
        setUser({
          ...user,
          user_metadata: {
            ...user.user_metadata,
            ...metadata
          }
        });
      }
      
      toast.success("Profile updated successfully");
      return;
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile: " + error.message);
      throw error;
    }
  };

  return {
    signUp,
    signIn,
    signOut,
    updateUserProfile
  };
}
