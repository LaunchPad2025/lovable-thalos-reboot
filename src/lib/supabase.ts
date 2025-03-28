
import { createClient } from '@supabase/supabase-js';

// Use hardcoded values as fallback when environment variables are not available
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://qascjdhzyipxtqbxcdhg.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhc2NqZGh6eWlweHRxYnhjZGhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0Mzg0NzksImV4cCI6MjA1ODAxNDQ3OX0.ml9UDwB4izFwjtQd-Be-c2N1p74tgqg6cEt_QN-8Tgs";

// Log status info for debugging
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.info('Using hardcoded Supabase credentials as fallback. For production, please set the environment variables.');
}

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
