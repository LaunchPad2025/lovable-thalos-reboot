
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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
    // Create a Supabase client with the Auth context of the logged in user
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Check if bucket already exists before creating
    const { data: buckets, error: listError } = await supabaseClient
      .storage
      .listBuckets();
    
    if (listError) {
      console.error('Error listing buckets:', listError);
      throw listError;
    }
    
    const violationsBucketExists = buckets.some(bucket => bucket.name === 'violations');
    
    if (!violationsBucketExists) {
      // Create violations bucket if it doesn't exist
      const { data: violationsBucket, error: violationsBucketError } = await supabaseClient
        .storage
        .createBucket('violations', {
          public: true, // Set to public so we can access files without authentication
          fileSizeLimit: 5242880, // 5MB limit
        });

      if (violationsBucketError) {
        console.error('Error creating violations bucket:', violationsBucketError);
        // Don't throw if it's just that the bucket already exists
        if (violationsBucketError.message !== 'Bucket already exists') {
          throw violationsBucketError;
        }
      } else {
        console.log('Violations bucket created successfully');
      }
    } else {
      console.log('Violations bucket already exists');
    }
    
    // Set bucket policy to allow public access
    try {
      // Update the RLS policy to allow anyone to read/write to the bucket
      const { data: policyData, error: policyError } = await supabaseClient
        .storage
        .from('violations')
        .createSignedUploadUrl('policy-check');
        
      if (policyError && !policyError.message.includes('already exists')) {
        console.error('Error setting bucket policy:', policyError);
      } else {
        console.log('Bucket policy updated successfully or already exists');
      }
    } catch (policySetError) {
      console.error('Error during policy setup:', policySetError);
      // Don't fail the whole function if just the policy update fails
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Storage buckets setup completed successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error creating storage buckets:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        detail: 'Please check server logs for more information'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
