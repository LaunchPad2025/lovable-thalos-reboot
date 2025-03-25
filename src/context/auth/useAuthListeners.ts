
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { UseAuthListenersProps } from './types';

export function useAuthListeners({ setUser, setSession, setLoading }: UseAuthListenersProps) {
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
  }, [setUser, setSession, setLoading]);
}
