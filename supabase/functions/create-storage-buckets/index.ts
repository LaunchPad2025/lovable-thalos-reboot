
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    });
  }

  try {
    // Create a Supabase client with the Admin key
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Check if the 'violations' bucket exists
    const { data: buckets, error: listError } = await supabaseClient
      .storage
      .listBuckets();
      
    if (listError) {
      throw listError;
    }

    const violationsBucketExists = buckets.some(bucket => bucket.name === 'violations');
    
    if (!violationsBucketExists) {
      // Create the violations bucket
      const { error: createError } = await supabaseClient
        .storage
        .createBucket('violations', {
          public: true, // Make the bucket public so images can be viewed
          fileSizeLimit: 5242880, // 5MB limit 
        });
        
      if (createError) {
        throw createError;
      }
      
      // Create policy to allow authenticated users to upload
      const { error: policyError } = await supabaseClient
        .storage
        .from('violations')
        .createSignedUploadUrl('test.txt');
        
      if (policyError && !policyError.message.includes('already exists')) {
        console.warn("Policy creation warning:", policyError.message);
      }
    }
    
    // Return success
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: violationsBucketExists ? "Violations bucket already exists" : "Violations bucket created" 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json" 
        } 
      }
    );
    
  } catch (error) {
    console.error("Error creating storage buckets:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Unknown error occurred"
      }),
      { 
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json" 
        },
        status: 500 
      }
    );
  }
});
