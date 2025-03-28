
import { createClient } from '@supabase/supabase-js';
import { supabase as integrationClient } from '@/integrations/supabase/client';

// Use the integration client if it's already initialized
export const supabase = integrationClient;
