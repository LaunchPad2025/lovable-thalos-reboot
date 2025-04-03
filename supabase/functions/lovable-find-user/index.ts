
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8";

// CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse the request body
    const { token, email } = await req.json();

    // Validate inputs
    if (!token) {
      return new Response(
        JSON.stringify({ error: "Missing integration token" }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    // Validate the integration token
    // This is a simplified check - in production you would verify against a stored token
    const validTokens = [
      'lovable_integration_org_123',
      'lovable_integration_org_456',
      'lovable_integration_dev'
    ];
    
    if (!validTokens.includes(token)) {
      return new Response(
        JSON.stringify({ error: "Invalid integration token" }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401 
        }
      );
    }

    // Initialize Supabase client with ENV variables
    const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string;
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase credentials in environment variables");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // If email is provided, find user by email
    if (email) {
      // Search for user by email
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (userError || !userData) {
        return new Response(
          JSON.stringify({ error: "User not found", detail: userError?.message }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 404 
          }
        );
      }

      // If a user is found, check their subscription status
      const { data: subscriptionData, error: subError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userData.id)
        .single();

      return new Response(
        JSON.stringify({
          success: true,
          user: {
            id: userData.id,
            email: userData.email,
            created_at: userData.created_at,
            subscription: subscriptionData || null
          }
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    }

    // If no email provided, return an error
    return new Response(
      JSON.stringify({ error: "Email parameter is required" }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    );

  } catch (error) {
    console.error("Error in lovable-find-user function:", error);
    
    return new Response(
      JSON.stringify({ error: "Internal server error", detail: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
