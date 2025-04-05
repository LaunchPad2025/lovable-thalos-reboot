
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8";
import { jwtDecode } from "https://esm.sh/jwt-decode@4.0.0";

// CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SubscriptionRequest {
  email: string;
  name: string;
  company: string;
  title: string;
  industry: "Construction" | "Oil & Gas" | "Utilities & Energy";
  plan: "basic" | "pro" | "premium" | "enterprise";
  interval: "monthly" | "annual";
  agreedToTerms: boolean;
}

interface SubscriptionResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    email: string;
    name: string;
    company: string;
  };
  redirectUrl?: string;
  error?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse the request body
    const requestData = await req.json() as SubscriptionRequest;

    // Validate required fields
    const validationErrors = validateRequest(requestData);
    if (validationErrors.length > 0) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Validation failed", 
          validationErrors 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    console.log("Test endpoint received valid request:", requestData);

    // Generate a mock user ID for testing
    const userId = `test_${Date.now()}`;
    
    // Generate a mock token (in a real implementation, this would be a JWT)
    const mockToken = `test_token_${Date.now()}`;

    // Prepare test subscription URL
    const planId = `${requestData.plan}_${requestData.interval}`;
    const baseUrl = Deno.env.get("REDIRECT_BASE_URL") || "https://thalostech.replit.app";
    
    // Generate the test redirect URL (in sandbox/test mode)
    const redirectUrl = `${baseUrl}/api/subscribe-test?planId=${planId}&authToken=${mockToken}&testMode=true`;

    // Prepare the test response
    const response: SubscriptionResponse = {
      success: true,
      token: mockToken,
      user: {
        id: userId,
        email: requestData.email,
        name: requestData.name,
        company: requestData.company
      },
      redirectUrl
    };

    console.log("Test endpoint returning success response");

    // Return the test response
    return new Response(
      JSON.stringify(response),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error("Error in lovable-simplified-direct-subscription-test function:", error);
    
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

// Validate the incoming request
function validateRequest(data: Partial<SubscriptionRequest>): string[] {
  const errors: string[] = [];
  
  if (!data.email || !isValidEmail(data.email)) {
    errors.push("Valid email is required");
  }
  
  if (!data.name || data.name.trim().length < 2) {
    errors.push("Name is required (minimum 2 characters)");
  }
  
  if (!data.company || data.company.trim().length < 1) {
    errors.push("Company name is required");
  }
  
  if (!data.title || data.title.trim().length < 1) {
    errors.push("Job title is required");
  }
  
  if (!data.industry || !["Construction", "Oil & Gas", "Utilities & Energy"].includes(data.industry)) {
    errors.push("Valid industry selection is required");
  }
  
  if (!data.plan || !["basic", "pro", "premium", "enterprise"].includes(data.plan)) {
    errors.push("Valid plan selection is required");
  }
  
  if (!data.interval || !["monthly", "annual"].includes(data.interval)) {
    errors.push("Valid billing interval is required");
  }
  
  if (!data.agreedToTerms) {
    errors.push("You must agree to the Terms and Privacy Policy");
  }
  
  return errors;
}

// Simple email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
