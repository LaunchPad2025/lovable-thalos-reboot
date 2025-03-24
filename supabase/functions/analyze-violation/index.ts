
// This edge function will analyze a violation using one of your pretrained models
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.29.0";

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface AnalyzeRequest {
  violationText: string;
  violationImageUrl?: string;
  industry: string;
  modelId?: string;
}

interface AnalysisResult {
  regulationIds: string[];
  relevanceScores: number[];
  confidence: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'open' | 'in-progress' | 'resolved';
  description: string;
  detections?: any[];
}

// This function maps model IDs to their HuggingFace repos
function getModelRepo(modelId: string): string | null {
  const modelRepos: Record<string, string> = {
    "yolov8": "ultralytics/yolov8m",
    "detectron2": "facebook/detectron2",
    "hrnet": "openmmlab/hrnet-w32-human-pose-estimation",
    "deeplabv3": "nvidia/segformer-b0-finetuned-ade-512-512",
    "blip2": "Salesforce/blip2-flan-t5-xl"
  };
  
  return modelRepos[modelId] || null;
}

// Function to determine severity based on detection results
function determineSeverity(detections: any[], modelType: string): 'low' | 'medium' | 'high' | 'critical' {
  if (!detections || detections.length === 0) return 'low';
  
  // Different logic for different model types
  switch(modelType) {
    case 'Object Detection': // YOLOv8 or Detectron2
      // Count high confidence detections (e.g., missing PPE)
      const highConfidenceDetections = detections.filter(d => d.confidence > 0.7);
      if (highConfidenceDetections.length > 3) return 'critical';
      if (highConfidenceDetections.length > 1) return 'high';
      if (highConfidenceDetections.length > 0) return 'medium';
      return 'low';
      
    case 'Pose Estimation': // HRNet
      // Check if any harmful poses are detected with high confidence
      const unsafePoses = detections.filter(d => 
        d.label.includes('unsafe') && d.confidence > 0.6
      );
      if (unsafePoses.length > 0) return 'high';
      return 'medium';
      
    case 'Semantic Segmentation': // DeepLabv3+
      // Check size of hazardous areas
      const hazardousAreaSize = detections.reduce((sum, d) => 
        d.label.includes('hazard') ? sum + d.area : sum, 0
      );
      if (hazardousAreaSize > 0.3) return 'critical'; // 30% of image is hazardous
      if (hazardousAreaSize > 0.1) return 'high';
      if (hazardousAreaSize > 0) return 'medium';
      return 'low';
      
    case 'Multimodal': // BLIP2
      // Check for keywords in text analysis
      const text = detections[0]?.text || '';
      if (text.includes('danger') || text.includes('immediate') || text.includes('severe')) 
        return 'critical';
      if (text.includes('unsafe') || text.includes('hazard')) 
        return 'high';
      if (text.includes('caution') || text.includes('warning')) 
        return 'medium';
      return 'low';
      
    default:
      return 'medium';
  }
}

// Function to generate description based on detections and model type
function generateDescription(detections: any[], modelType: string, industry: string): string {
  if (!detections || detections.length === 0) 
    return `No safety violations detected in this ${industry} environment.`;
  
  let description = '';
  
  switch(modelType) {
    case 'Object Detection':
      const items = detections.map(d => d.label).join(', ');
      description = `Detected potential safety violations: ${items} in ${industry} environment.`;
      if (items.includes('helmet') || items.includes('vest') || items.includes('glove'))
        description += ' Missing or improper PPE detected.';
      break;
      
    case 'Pose Estimation':
      description = `Detected unsafe worker posture in ${industry} environment. `;
      description += 'This may indicate ergonomic risks that could lead to musculoskeletal injuries.';
      break;
      
    case 'Semantic Segmentation':
      description = `Identified hazardous areas in ${industry} environment including `;
      if (detections.some(d => d.label.includes('trench')))
        description += 'open trenches, ';
      if (detections.some(d => d.label.includes('exit')))
        description += 'blocked exits, ';
      if (detections.some(d => d.label.includes('spill')))
        description += 'spill zones, ';
      description += 'which require immediate attention.';
      break;
      
    case 'Multimodal':
      // For BLIP2, use the generated text directly
      description = detections[0]?.text || 
        `Analysis of the scene in ${industry} environment indicates potential safety concerns.`;
      break;
      
    default:
      description = `Potential safety violation detected in ${industry} environment.`;
  }
  
  return description;
}

// Mock function to simulate model prediction
// In a real implementation, this would call the actual HuggingFace models
function mockModelPrediction(request: AnalyzeRequest): AnalysisResult {
  console.log("Analyzing violation with request:", request);
  
  // Get the model ID from the request or use a default
  const modelId = request.modelId || "yolov8";
  
  // Get relevant model info from the database (mock for now)
  const modelType = modelId === "yolov8" || modelId === "detectron2" ? "Object Detection" :
                    modelId === "hrnet" ? "Pose Estimation" :
                    modelId === "deeplabv3" ? "Semantic Segmentation" : "Multimodal";
  
  // Create mock detections based on model type
  let mockDetections = [];
  
  switch(modelType) {
    case "Object Detection":
      mockDetections = [
        { label: "person", confidence: 0.95, bbox: [50, 50, 200, 350] },
        { label: "missing_helmet", confidence: 0.87, bbox: [60, 40, 180, 100] },
        { label: "missing_vest", confidence: 0.76, bbox: [60, 100, 180, 300] }
      ];
      break;
      
    case "Pose Estimation":
      mockDetections = [
        { 
          label: "unsafe_bending", 
          confidence: 0.82,
          keypoints: [
            { x: 100, y: 50, name: "head", confidence: 0.9 },
            { x: 100, y: 100, name: "shoulder", confidence: 0.85 },
            { x: 120, y: 180, name: "hip", confidence: 0.8 },
            { x: 140, y: 250, name: "knee", confidence: 0.75 }
          ]
        }
      ];
      break;
      
    case "Semantic Segmentation":
      mockDetections = [
        { label: "trench_hazard", confidence: 0.91, area: 0.15, mask: "base64_encoded_mask_here" },
        { label: "blocked_exit", confidence: 0.88, area: 0.08, mask: "base64_encoded_mask_here" }
      ];
      break;
      
    case "Multimodal":
      mockDetections = [
        { 
          text: `Worker is near exposed wiring in ${request.industry} area. This represents a significant electrical hazard that requires immediate attention. The exposed wiring should be properly insulated and secured according to safety regulations.`,
          confidence: 0.93
        }
      ];
      break;
  }
  
  // Determine severity based on detections
  const severity = determineSeverity(mockDetections, modelType);
  
  // Generate description
  const description = generateDescription(mockDetections, modelType, request.industry);
  
  return {
    regulationIds: ["some-uuid-1", "some-uuid-2"], // These would be actual regulation IDs from your database
    relevanceScores: [0.92, 0.78],
    confidence: 0.89,
    severity: severity,
    status: 'open',
    description: description,
    detections: mockDetections
  };
}

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }
  
  try {
    // Parse the JSON body
    const requestData: AnalyzeRequest = await req.json();
    
    // Validate request data
    if (!requestData.violationText && !requestData.violationImageUrl) {
      return new Response(
        JSON.stringify({ error: "Either violationText or violationImageUrl must be provided" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json"
          }
        }
      );
    }
    
    if (!requestData.industry) {
      return new Response(
        JSON.stringify({ error: "Industry field is required" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json"
          }
        }
      );
    }
    
    // In a real implementation, this would call the relevant HuggingFace model via their API
    // For now, we'll use a mock function
    const analysisResult = mockModelPrediction(requestData);
    
    // Return the analysis result
    return new Response(
      JSON.stringify(analysisResult),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      }
    );
    
  } catch (error) {
    console.error("Error processing violation analysis:", error);
    
    return new Response(
      JSON.stringify({ error: error.message || "An error occurred during analysis" }),
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
