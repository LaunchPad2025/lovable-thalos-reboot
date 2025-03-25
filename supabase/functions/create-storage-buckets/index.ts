
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

    // Create violations bucket if it doesn't exist
    const { data: violationsBucket, error: violationsBucketError } = await supabaseClient
      .storage
      .createBucket('violations', {
        public: true, // Set to public so we can access files without authentication
        fileSizeLimit: 5242880, // 5MB limit
      });

    if (violationsBucketError && violationsBucketError.message !== 'Bucket already exists') {
      console.error('Error creating violations bucket:', violationsBucketError);
    } else {
      console.log('Violations bucket setup complete');
      
      // Set RLS policy to allow anyone to read/write to the bucket
      // This is important for uploading violation images
      const { error: policyError } = await supabaseClient
        .storage
        .from('violations')
        .createSignedUploadUrl('policy-check');
        
      if (policyError && !policyError.message.includes('already exists')) {
        console.error('Error setting bucket policy:', policyError);
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Storage buckets created successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error creating storage buckets:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
