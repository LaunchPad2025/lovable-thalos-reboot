
// Re-export the supabase client from the integrations folder
// This ensures we have a single source of truth
import { supabase } from '@/integrations/supabase/client';

// Export the supabase client for easier imports
export { supabase };
