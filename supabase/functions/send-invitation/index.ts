
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import { Resend } from "https://esm.sh/resend@1.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface InvitationRequest {
  email: string;
  role: string;
  department?: string;
  organization_id?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );
    
    // Initialize the Resend client
    const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

    // Get the authorization header from the request
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "No authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get the JWT token from the authorization header
    const token = authHeader.replace("Bearer ", "");
    
    // Get the user from the token
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Invalid token" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if user is an admin
    const { data: profile, error: profileError } = await supabaseClient
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError || !profile || profile.role !== "admin") {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get the invitation data from the request
    const invitationData: InvitationRequest = await req.json();
    const { email, role, department, organization_id } = invitationData;

    if (!email || !role) {
      return new Response(
        JSON.stringify({ error: "Email and role are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate a unique token for the invitation
    const inviteToken = crypto.randomUUID();

    // Create the invitation in the database
    const { data: invitation, error: invitationError } = await supabaseClient
      .from("user_invitations")
      .insert({
        email,
        role,
        department,
        organization_id,
        invited_by: user.id,
        token: inviteToken,
        status: "pending",
      })
      .select()
      .single();

    if (invitationError) {
      console.error("Error creating invitation:", invitationError);
      return new Response(
        JSON.stringify({ error: "Failed to create invitation" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get the admin's profile info to include in the email
    const { data: adminProfile } = await supabaseClient
      .from("profiles")
      .select("name, company")
      .eq("id", user.id)
      .single();

    const companyName = adminProfile?.company || "Thalos";
    const inviterName = adminProfile?.name || "An administrator";

    // Create the invitation link
    const origin = req.headers.get("origin") || "https://app.thalos.tech";
    const invitationLink = `${origin}/auth?invitation=${inviteToken}`;

    // Send the invitation email
    try {
      const { data: emailData, error: emailError } = await resend.emails.send({
        from: "Thalos <no-reply@thalos.tech>",
        to: [email],
        subject: `Invitation to join ${companyName} on Thalos`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>You've been invited to join ${companyName}</h2>
            <p>${inviterName} has invited you to join their organization on Thalos as a ${getRoleName(role)}.</p>
            
            ${department ? `<p>Department: ${department}</p>` : ''}
            
            <p>Thalos is a compliance management platform that helps organizations maintain safety standards and track regulatory compliance.</p>
            
            <div style="margin: 25px 0;">
              <a href="${invitationLink}" style="background-color: #0091FF; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">
                Accept Invitation
              </a>
            </div>
            
            <p>Or copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #5a5a5a;">${invitationLink}</p>
            
            <p style="margin-top: 25px; font-size: 12px; color: #666;">
              If you weren't expecting this invitation, you can ignore this email.
            </p>
          </div>
        `,
      });

      if (emailError) {
        console.error("Error sending invitation email:", emailError);
        // Even if the email fails, we've created the invitation in the database
        // so we'll still return success but log the error
      } else {
        console.log("Invitation email sent successfully to", email);
      }
    } catch (emailSendError) {
      console.error("Exception sending invitation email:", emailSendError);
      // We'll still return success as the invitation was created
    }

    return new Response(
      JSON.stringify({ success: true, data: invitation }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in send-invitation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

// Helper function to get a human-readable role name
function getRoleName(role: string): string {
  switch (role) {
    case 'admin':
      return 'Administrator';
    case 'safety_officer':
      return 'Safety Officer';
    case 'worker':
      return 'Team Member';
    default:
      return role.charAt(0).toUpperCase() + role.slice(1);
  }
}
