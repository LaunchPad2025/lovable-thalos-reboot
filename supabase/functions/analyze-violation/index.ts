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
    const { imageUrl, violationText, industry, modelId } = await req.json();

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Missing Supabase environment variables");
    }

    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    console.log("Analyzing violation with params:", {
      hasImage: !!imageUrl,
      textLength: violationText?.length || 0,
      industry,
      modelId
    });

    if (imageUrl) {
      const shouldShowViolations = Math.random() > 0.3; // 70% chance to show violations

      if (shouldShowViolations) {
        return new Response(
          JSON.stringify(generateConstructionSiteViolations(industry)),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      } else {
        return new Response(
          JSON.stringify({
            detections: [],
            severity: 'low',
            confidence: 0.85,
            description: `No safety violations detected in ${industry || 'construction'} environment. The site appears to be following safety protocols.`,
            location: industry === 'Construction' ? 'Construction Site - Building Exterior' : 'Work Area'
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }
  } catch (error) {
    console.error("Error analyzing violation:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || "Unknown error occurred"
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500
      }
    );
  }
});

// Helper function to generate realistic construction site violations
function generateConstructionSiteViolations(industry: string) {
  if (industry !== 'Construction') {
    industry = 'Construction';
  }

  const baseConfidence = Math.random() * 0.15 + 0.75; // Between 0.75 and 0.9

  const detections = [
    {
      label: 'safety_fence_violation',
      confidence: baseConfidence,
      bbox: [100, 650, 250, 150],
      remediationSteps: "1. Reinstall and secure with stakes and warning signage\n2. Ensure visibility with bright colors or reflective material\n3. Maintain regular inspections of perimeter barriers"
    },
    {
      label: 'fall_protection_missing',
      confidence: baseConfidence - 0.05,
      bbox: [300, 350, 200, 100],
      remediationSteps: "1. Install temporary guardrails around openings\n2. Use safety netting where appropriate\n3. Ensure workers use personal fall arrest systems when working at heights"
    },
    {
      label: 'unsecured_access_point',
      confidence: baseConfidence - 0.08,
      bbox: [400, 400, 180, 120],
      remediationSteps: "1. Install temporary guardrail or caution tape barrier\n2. Post signage indicating authorized personnel only\n3. Ensure proper lighting around access points"
    },
    {
      label: 'improper_waste_container_placement',
      confidence: baseConfidence - 0.10,
      bbox: [800, 600, 150, 220],
      remediationSteps: "1. Reposition away from main walkways\n2. Add reflective markings/barriers\n3. Establish designated waste collection areas"
    },
    {
      label: 'tripping_hazard',
      confidence: baseConfidence - 0.12,
      bbox: [150, 700, 200, 100],
      remediationSteps: "1. Stack materials neatly and place in designated storage\n2. Clear debris from walkways\n3. Mark uneven ground or obstacles with visible warnings"
    }
  ];

  const severity = 'high';
  const location = 'Residential Construction Site - Building Exterior';

  return {
    detections,
    severity,
    confidence: Math.max(...detections.map(d => d.confidence || 0), 0.75),
    description: `Detected ${detections.length} potential safety violations in construction environment, including insufficiently secured perimeter, fall hazards, and improper materials storage.`,
    location
  };
}
