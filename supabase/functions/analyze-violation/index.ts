
// This edge function will analyze a violation using one of your pretrained models
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

// Initialize HuggingFace API client
const HF_API_URL = "https://api-inference.huggingface.co/models/";
const HF_API_KEY = Deno.env.get('HUGGINGFACE_API_KEY') || '';

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

// Map model IDs to their HuggingFace repos
function getModelRepo(modelId: string): string {
  const modelRepos: Record<string, string> = {
    "yolov8": "ultralytics/yolov8m",
    "detectron2": "facebook/detectron2-coco-detection",
    "hrnet": "openmmlab/hrnet-w32-human-pose-estimation",
    "deeplabv3": "nvidia/segformer-b0-finetuned-ade-512-512",
    "blip2": "Salesforce/blip2-flan-t5-xl",
    "samvit": "facebook/sam-vit-huge",
    "owlvit": "google/owlvit-base-patch32",
    "openpose": "spaces/akhaliq/openpose",
    "i3d": "deepmind/kinetics-i3d"
  };
  
  return modelRepos[modelId] || "ultralytics/yolov8m";
}

// Function to determine severity based on detection results
function determineSeverity(detections: any[], modelType: string): 'low' | 'medium' | 'high' | 'critical' {
  if (!detections || detections.length === 0) return 'low';
  
  // Different logic for different model types
  switch(modelType) {
    case 'Object Detection': // YOLOv8 or Detectron2
      const highConfidenceDetections = detections.filter(d => d.confidence > 0.7 && 
        (d.label.includes('person') || d.label.includes('helmet') || d.label.includes('vest')));
      if (highConfidenceDetections.length > 3) return 'critical';
      if (highConfidenceDetections.length > 1) return 'high';
      if (highConfidenceDetections.length > 0) return 'medium';
      return 'low';
      
    case 'Pose Estimation': // HRNet or OpenPose
      const personDetections = detections.filter(d => d.label === 'person' && d.confidence > 0.6);
      if (personDetections.length > 2) return 'high';
      return 'medium';
      
    case 'Semantic Segmentation': // DeepLabv3+
      const hazardClasses = ['floor', 'wall', 'ceiling', 'door', 'stairs'];
      const hazardDetections = detections.filter(d => hazardClasses.some(h => d.label.includes(h)));
      if (hazardDetections.length > 2) return 'high';
      return 'medium';
      
    case 'Multimodal': // BLIP2 or OwlViT
      // Look for safety-related keywords in the description
      const text = detections[0]?.text || '';
      if (text.toLowerCase().includes('danger') || 
          text.toLowerCase().includes('immediate') || 
          text.toLowerCase().includes('severe')) return 'critical';
      if (text.toLowerCase().includes('unsafe') || 
          text.toLowerCase().includes('hazard')) return 'high';
      if (text.toLowerCase().includes('caution') || 
          text.toLowerCase().includes('warning')) return 'medium';
      return 'low';
      
    default:
      return 'medium';
  }
}

// Generate description based on detections
function generateDescription(detections: any[], modelType: string, industry: string): string {
  if (!detections || detections.length === 0) 
    return `No safety violations detected in this ${industry} environment.`;
  
  let description = '';
  
  switch(modelType) {
    case 'Object Detection':
      const items = detections.map(d => d.label).join(', ');
      description = `Detected potential safety violations: ${items} in ${industry} environment.`;
      if (items.includes('person') && !items.includes('helmet'))
        description += ' Worker may be missing required PPE (helmet).';
      if (items.includes('person') && !items.includes('vest'))
        description += ' Worker may be missing high-visibility vest.';
      break;
      
    case 'Pose Estimation':
      description = `Detected worker posture that may indicate safety risks in ${industry} environment. `;
      description += 'This may indicate ergonomic risks that could lead to musculoskeletal injuries.';
      break;
      
    case 'Semantic Segmentation':
      description = `Identified potential hazardous areas in ${industry} environment requiring attention.`;
      break;
      
    case 'Multimodal':
      // For BLIP2 or OwlViT, use the generated text directly
      description = detections[0]?.text || 
        `Analysis of the scene in ${industry} environment indicates potential safety concerns.`;
      break;
      
    default:
      description = `Potential safety violation detected in ${industry} environment.`;
  }
  
  return description;
}

// Process image for object detection models
async function processImageForObjectDetection(imageUrl: string, modelRepo: string): Promise<any[]> {
  try {
    console.log(`Processing image with model: ${modelRepo}`);
    
    // Make API call to HuggingFace
    const response = await fetch(`${HF_API_URL}${modelRepo}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: imageUrl })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error from HuggingFace API: ${errorText}`);
      throw new Error(`HuggingFace API error: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json();
    console.log("HuggingFace API response:", JSON.stringify(result).substring(0, 200) + "...");
    
    // Transform results into our standard detection format
    if (Array.isArray(result)) {
      return result.map(item => ({
        label: item.label || 'unknown',
        confidence: item.score || item.confidence || 0.5,
        bbox: item.box || item.bbox || [0, 0, 100, 100]
      }));
    }
    
    return [];
  } catch (error) {
    console.error("Error in object detection:", error);
    // Return empty result on error, could be enhanced with better error handling
    return [];
  }
}

// Function to fetch regulations based on detections
async function fetchRelevantRegulations(detections: any[], industry: string): Promise<{ids: string[], scores: number[]}> {
  // In a production environment, this would query your regulation database
  // For now, we'll return some sample regulation IDs with realistic relevance scores
  const regulationIds = [
    "29CFR1926.100", // Head protection
    "29CFR1926.102", // Eye and face protection
    "29CFR1926.200"  // Accident prevention signs and tags
  ];
  
  const scores = [0.92, 0.85, 0.78];
  
  return { ids: regulationIds, scores };
}

// Main function to analyze violations
async function analyzeViolation(request: AnalyzeRequest): Promise<AnalysisResult> {
  console.log("Analyzing violation with request:", request);
  
  // Get the model ID from the request or use a default
  const modelId = request.modelId || "yolov8";
  
  // Get relevant model info based on modelId
  let modelType = "Object Detection";
  switch(modelId) {
    case "yolov8":
    case "detectron2": 
      modelType = "Object Detection"; 
      break;
    case "hrnet":
    case "openpose": 
      modelType = "Pose Estimation"; 
      break;
    case "samvit": 
      modelType = "Instance Segmentation"; 
      break;
    case "deeplabv3": 
      modelType = "Semantic Segmentation"; 
      break;
    case "blip2":
    case "owlvit": 
      modelType = "Multimodal"; 
      break;
    case "i3d": 
      modelType = "Video"; 
      break;
  }
  
  // Get the appropriate model repository
  const modelRepo = getModelRepo(modelId);
  
  // Process the image if provided
  let detections: any[] = [];
  if (request.violationImageUrl) {
    detections = await processImageForObjectDetection(request.violationImageUrl, modelRepo);
  } else if (request.violationText && modelType === "Multimodal") {
    // For text-based or multimodal analysis
    detections = [{
      text: request.violationText,
      confidence: 0.9
    }];
  }
  
  // Determine severity based on detections
  const severity = determineSeverity(detections, modelType);
  
  // Generate description
  const description = generateDescription(detections, modelType, request.industry);
  
  // Fetch relevant regulations
  const regulations = await fetchRelevantRegulations(detections, request.industry);
  
  return {
    regulationIds: regulations.ids,
    relevanceScores: regulations.scores,
    confidence: detections.length > 0 ? 
      detections.reduce((sum, d) => sum + (d.confidence || 0), 0) / detections.length : 
      0.5,
    severity: severity,
    status: 'open',
    description: description,
    detections: detections
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
    
    // Analyze the violation
    const analysisResult = await analyzeViolation(requestData);
    
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
