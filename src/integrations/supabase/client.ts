// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://qascjdhzyipxtqbxcdhg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhc2NqZGh6eWlweHRxYnhjZGhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0Mzg0NzksImV4cCI6MjA1ODAxNDQ3OX0.ml9UDwB4izFwjtQd-Be-c2N1p74tgqg6cEt_QN-8Tgs";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);