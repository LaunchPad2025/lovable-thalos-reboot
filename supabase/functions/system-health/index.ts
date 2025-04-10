
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );
  
  // Initialize system status object
  const status = {
    supabase: "operational",
    auth: "operational",
    storage: "operational",
    functions: "operational",
    database: "operational",
    timestamp: new Date().toISOString(),
    message: "All systems operational",
    version: "1.0.0"
  };
  
  try {
    // Check database connection
    const { error: dbError } = await supabaseClient
      .from("system_status")
      .select("id")
      .limit(1)
      .maybeSingle();
    
    if (dbError) {
      status.database = "degraded";
      status.message = "Database issues detected";
    }
    
    // Check if auth service is working
    const { error: authError } = await supabaseClient.auth.getSession();
    if (authError) {
      status.auth = "degraded";
      status.message = "Authentication issues detected";
    }
    
  } catch (error) {
    console.error("Health check error:", error);
    status.message = "System health check encountered errors";
    return new Response(
      JSON.stringify({ status, error: error.message }),
      { 
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders }
      }
    );
  }
  
  return new Response(
    JSON.stringify(status),
    { 
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders }
    }
  );
});
