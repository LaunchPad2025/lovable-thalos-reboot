
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

    // Initialize Supabase client with ENV variables
    const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string;
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase credentials in environment variables");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if user already exists
    const { data: existingUsers, error: existingUserError } = await supabase
      .from('users')
      .select('id, email')
      .eq('email', requestData.email);

    if (existingUserError) {
      console.error("Error checking for existing user:", existingUserError);
      throw new Error("Failed to check for existing user");
    }

    let userId: string;
    
    // If user exists, use their ID
    if (existingUsers && existingUsers.length > 0) {
      userId = existingUsers[0].id;
      
      // Return error for duplicate email - as per requirements
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "An account with this email already exists" 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 409 // Conflict
        }
      );
    } else {
      // Create a new user
      const { data: { user }, error: signUpError } = await supabase.auth.admin.createUser({
        email: requestData.email,
        email_confirm: true, // Auto-confirm email
        user_metadata: {
          full_name: requestData.name,
          company: requestData.company,
          title: requestData.title,
          industry: requestData.industry,
          agreed_to_terms: requestData.agreedToTerms,
          selected_plan: requestData.plan,
          billing_interval: requestData.interval,
          source: "lovable_integration",
          onboarding_status: "payment_pending"
        }
      });

      if (signUpError || !user) {
        console.error("Error creating user:", signUpError);
        throw new Error("Failed to create user account");
      }
      
      userId = user.id;
    }

    // Generate a secure login token
    const { data: tokenData, error: tokenError } = await supabase.auth.admin.createUserToken({
      userId: userId
    });

    if (tokenError) {
      console.error("Error generating token:", tokenError);
      throw new Error("Failed to generate authentication token");
    }

    // Prepare the subscription URL with necessary parameters
    const planId = `${requestData.plan}_${requestData.interval}`;
    const baseUrl = Deno.env.get("REDIRECT_BASE_URL") || "https://thalostech.replit.app";
    
    // Generate the redirect URL for auto-login and checkout
    const redirectUrl = `${baseUrl}/api/subscribe?planId=${planId}&authToken=${tokenData.token}`;

    // Prepare the success response
    const response: SubscriptionResponse = {
      success: true,
      token: tokenData.token,
      user: {
        id: userId,
        email: requestData.email,
        name: requestData.name,
        company: requestData.company
      },
      redirectUrl
    };

    // Return the response with the token and redirect URL
    return new Response(
      JSON.stringify(response),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error("Error in lovable-simplified-direct-subscription function:", error);
    
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
