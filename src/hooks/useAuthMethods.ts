import { supabase } from '../supabaseClient';

const signUp = async (email: string, password: string) => {
  try {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  } catch (error) {
    console.error('Sign-up error:', error.message); // Avoid logging sensitive data
    throw error;
  }
};

const signIn = async (email: string, password: string) => {
  try {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  } catch (error) {
    console.error('Sign-in error:', error.message); // Avoid logging sensitive data
    throw error;
  }
};

export { signUp, signIn };