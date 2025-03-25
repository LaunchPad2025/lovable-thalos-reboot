
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
    
    // Create a Supabase client with the Admin key
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );
    
    console.log("Analyzing violation with params:", { 
      hasImage: !!imageUrl, 
      textLength: violationText?.length || 0, 
      industry, 
      modelId
    });
    
    // If we have an image URL, try to analyze it with the model
    if (imageUrl) {
      try {
        // Call a real model API here if available
        const modelResult = await callRealModelAPI(imageUrl, industry, modelId);
        if (modelResult) {
          return new Response(
            JSON.stringify(modelResult),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
      } catch (modelError) {
        console.error("Error calling real model API:", modelError);
        // Continue to fallback detection if model fails
      }
    }
    
    // Enhanced fallback detection mechanism specific to construction sites
    const enhancedMockDetection = async () => {
      // Simulate detection delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate mock detections based on industry with improved construction site focus
      let detections = [];
      const confidence = Math.random() * 0.15 + 0.75; // Between 0.75 and 0.9
      
      if (industry === 'Construction') {
        detections = [
          {
            label: 'safety_fence_violation',
            confidence: confidence,
            bbox: [100, 650, 250, 150]
          },
          {
            label: 'fall_protection_missing',
            confidence: confidence - 0.05,
            bbox: [300, 350, 200, 100]
          },
          {
            label: 'unsecured_access_point',
            confidence: confidence - 0.1,
            bbox: [400, 400, 180, 120]
          },
          {
            label: 'improper_waste_container_placement',
            confidence: confidence - 0.12,
            bbox: [800, 600, 150, 220]
          },
          {
            label: 'tripping_hazard',
            confidence: confidence - 0.15,
            bbox: [150, 700, 200, 100]
          }
        ];
      } else if (industry === 'Manufacturing') {
        detections = [
          {
            label: 'missing_safety_gloves',
            confidence: confidence,
            bbox: [150, 120, 100, 80]
          },
          {
            label: 'machine_guard_missing',
            confidence: confidence - 0.05,
            bbox: [250, 180, 220, 160]
          }
        ];
      } else if (industry === 'Warehouse') {
        detections = [
          {
            label: 'improper_lifting',
            confidence: confidence,
            bbox: [120, 150, 180, 200]
          },
          {
            label: 'blocked_exit',
            confidence: confidence - 0.15,
            bbox: [350, 100, 120, 250]
          }
        ];
      } else {
        detections = [
          {
            label: 'safety_violation',
            confidence: confidence,
            bbox: [150, 150, 200, 200]
          }
        ];
      }
      
      // Calculate overall severity based on detections - emphasize critical issues
      let severity: 'low' | 'medium' | 'high' | 'critical' = 'medium';
      
      // For construction, we always want to highlight fall protection issues as critical
      if (industry === 'Construction' && detections.some(d => 
        d.label.includes('fall_protection') || 
        d.label.includes('height') || 
        d.label.includes('scaffold'))) {
        severity = 'critical';
      } else if (detections.some(d => d.label.includes('fire') || d.label.includes('exit'))) {
        severity = 'critical';
      } else if (detections.some(d => d.label.includes('fall') || d.label.includes('ladder'))) {
        severity = 'high';
      } else if (detections.length === 0 || detections.every(d => d.confidence < 0.6)) {
        severity = 'low';
      }
      
      // Provide detailed location information for construction sites
      let location = 'Construction Site';
      if (industry === 'Construction') {
        location = 'Residential Construction Site - Building Exterior';
      }
      
      return {
        detections,
        severity,
        confidence: Math.max(...detections.map(d => d.confidence || 0), 0.75),
        description: `Detected ${detections.length} potential safety violations in ${industry} environment, including insufficiently secured perimeter, fall hazards, and improper materials storage.`,
        location
      };
    };
    
    // This would call a real model API in production
    async function callRealModelAPI(imageUrl: string, industry: string, modelId: string) {
      // In a real implementation, this would make an API call to a real model
      // For this version, we'll return null to use the enhanced mock implementation
      return null;
    }
    
    // Call our enhanced detection function
    const analysisResult = await enhancedMockDetection();
    
    console.log("Analysis result:", analysisResult);
    
    // Return the results
    return new Response(
      JSON.stringify(analysisResult),
      { 
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json" 
        } 
      }
    );
    
  } catch (error) {
    console.error("Error analyzing violation:", error);
    
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
