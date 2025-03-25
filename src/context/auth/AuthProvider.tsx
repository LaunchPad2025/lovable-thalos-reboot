
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { AuthContextType, UserMetadata } from './types';
import { useAuthListeners } from './useAuthListeners';
import { useAuthMethods } from './useAuthMethods';

// Create the context with an undefined default value
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Set up auth state listeners and session initialization
  useAuthListeners({ setUser, setSession, setLoading });

  // Log auth state changes for debugging
  useEffect(() => {
    if (!loading) {
      console.log("Auth state ready:", { 
        hasUser: !!user, 
        hasSession: !!session,
        userId: user?.id
      });
    }
  }, [user, session, loading]);

  // Get auth methods (signUp, signIn, signOut, updateUserProfile)
  const authMethods = useAuthMethods({ user, setUser });

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      loading, 
      ...authMethods
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
