
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
    
    // This is a fallback detection mechanism
    const mockDetection = async () => {
      // Simulate detection delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock detections based on industry
      let detections = [];
      const confidence = Math.random() * 0.2 + 0.7; // Between 0.7 and 0.9
      
      if (industry === 'Construction') {
        detections = [
          {
            label: 'missing_hardhat',
            confidence: confidence,
            bbox: [100, 100, 150, 150]
          },
          {
            label: 'improper_ladder_use',
            confidence: confidence - 0.1,
            bbox: [300, 150, 200, 200]
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
      
      // Calculate overall severity based on detections
      let severity: 'low' | 'medium' | 'high' | 'critical' = 'medium';
      if (detections.some(d => d.label.includes('fire') || d.label.includes('exit'))) {
        severity = 'critical';
      } else if (detections.some(d => d.label.includes('fall') || d.label.includes('ladder'))) {
        severity = 'high';
      } else if (detections.length === 0 || detections.every(d => d.confidence < 0.6)) {
        severity = 'low';
      }
      
      return {
        detections,
        severity,
        confidence: Math.max(...detections.map(d => d.confidence || 0), 0.7),
        description: `Detected ${detections.length} potential safety violations in ${industry} environment.`
      };
    };
    
    // In a real implementation, this would call an AI model
    // For now, we'll use the mock implementation
    const analysisResult = await mockDetection();
    
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
