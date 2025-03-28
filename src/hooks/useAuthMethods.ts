
import { supabase } from '@/lib/supabase';

const signUp = async (email: string, password: string) => {
  try {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  } catch (error: any) {
    console.error('Sign-up error:', error.message); 
    throw error;
  }
};

const signIn = async (email: string, password: string) => {
  try {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  } catch (error: any) {
    console.error('Sign-in error:', error.message);
    throw error;
  }
};

export { signUp, signIn };
