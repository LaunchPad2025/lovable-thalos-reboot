
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { toast } from 'sonner';

type UserMetadata = {
  name?: string;
  role?: 'admin' | 'safety_officer' | 'worker';
  industries?: string[];
  preferredModules?: string[];
  onboarded?: boolean;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (metadata: UserMetadata) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast: uiToast } = useToast();

  // Debug auth state
  useEffect(() => {
    if (!loading) {
      console.log("Auth state ready:", { 
        hasUser: !!user, 
        hasSession: !!session,
        userId: user?.id
      });
    }
  }, [user, session, loading]);

  useEffect(() => {
    console.log("Auth provider initializing...");
    let mounted = true;
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log("Auth state change:", event, newSession?.user?.id);
        
        if (mounted) {
          setSession(newSession);
          setUser(newSession?.user ?? null);
          
          if (event === 'SIGNED_IN') {
            console.log("User signed in successfully");
            toast.success('Successfully signed in!');
          } else if (event === 'SIGNED_OUT') {
            console.log("User signed out");
            toast.info('You have been signed out');
            // Clear state immediately
            setUser(null);
            setSession(null);
          } else if (event === 'TOKEN_REFRESHED') {
            console.log('Auth token refreshed');
          } else if (event === 'USER_UPDATED') {
            console.log('User profile updated');
          }
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      console.log("Got existing session:", initialSession?.user?.id);
      
      if (mounted) {
        setSession(initialSession);
        setUser(initialSession?.user ?? null);
        setLoading(false);
      }
    }).catch(error => {
      console.error("Error getting session:", error);
      if (mounted) {
        toast.error("Authentication error: " + error.message);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Log auth state changes for debugging
  useEffect(() => {
    console.log("Auth state updated:", { 
      isAuthenticated: !!user, 
      hasSession: !!session, 
      isLoading: loading 
    });
  }, [user, session, loading]);

  const signUp = async (email: string, password: string, name: string) => {
    try {
      console.log("Attempting to sign up:", email);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role: 'worker', // Default role
            onboarded: false // Flag to indicate onboarding status
          }
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
      setSession(null);
      
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

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      loading, 
      signUp, 
      signIn, 
      signOut,
      updateUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
