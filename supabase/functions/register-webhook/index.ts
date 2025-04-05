
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8";

// CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface WebhookRegistrationRequest {
  url: string;
  secret: string;
  events: string[];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse the request body
    const requestData = await req.json() as WebhookRegistrationRequest;
    
    // Validate the webhook URL
    if (!requestData.url || !isValidUrl(requestData.url)) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid webhook URL" }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }
    
    // Validate the webhook secret
    if (!requestData.secret || requestData.secret.length < 10) {
      return new Response(
        JSON.stringify({ success: false, error: "Webhook secret must be at least 10 characters" }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }
    
    // Validate the events array
    const validEvents = ["subscription.created", "user.onboarded", "limit.approaching"];
    if (!requestData.events || !Array.isArray(requestData.events) || 
        !requestData.events.every(event => validEvents.includes(event))) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Invalid events. Must be an array containing only supported event types.",
          validEvents
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
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
    
    // Store the webhook configuration
    const { data, error } = await supabase
      .from('webhooks')
      .upsert({
        url: requestData.url,
        secret: requestData.secret,
        events: requestData.events,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_active: true
      }, { onConflict: 'url' });
      
    if (error) {
      console.error("Error storing webhook configuration:", error);
      throw new Error("Failed to register webhook");
    }
    
    console.log("Webhook registered successfully:", requestData.url);
    
    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Webhook registered successfully",
        events: requestData.events
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error("Error in register-webhook function:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Internal server error", 
        detail: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});

// Validate URL format
function isValidUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
  } catch {
    return false;
  }
}
