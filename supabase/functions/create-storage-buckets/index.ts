
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.29.0";

// Initialize Supabase client with admin privileges
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  try {
    // Create a new storage bucket for violation images
    const { data: bucket, error: createError } = await supabase
      .storage
      .createBucket('violations', {
        public: true,
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
        fileSizeLimit: 10485760 // 10MB
      });

    if (createError) {
      // If bucket already exists, this is fine
      if (createError.message.includes('already exists')) {
        return new Response(
          JSON.stringify({ message: "Violations bucket already exists" }),
          {
            status: 200,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json"
            }
          }
        );
      }
      
      throw createError;
    }

    return new Response(
      JSON.stringify({ message: "Storage bucket created successfully", data: bucket }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    console.error("Error creating storage bucket:", error);
    
    return new Response(
      JSON.stringify({ error: error.message || "An error occurred creating the storage bucket" }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      }
    );
  }
});
