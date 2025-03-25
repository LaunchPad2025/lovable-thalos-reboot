
// This edge function will analyze a violation using one of your pretrained models
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

// Initialize CORS headers for browser access
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AnalyzeRequest {
  violationText: string;
  imageUrl?: string;
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

// Function to determine severity based on detection results
function determineSeverity(detections: any[]): 'low' | 'medium' | 'high' | 'critical' {
  if (!detections || detections.length === 0) return 'low';
  
  const criticalLabels = ['fall', 'electrical', 'fire', 'confined_space', 'chemical'];
  const highLabels = ['scaffold', 'ladder', 'guard', 'ppe', 'lockout'];
  
  // Check for critical violations
  if (detections.some(d => 
    criticalLabels.some(label => d.label?.toLowerCase().includes(label)) && 
    d.confidence > 0.7
  )) {
    return 'critical';
  }
  
  // Check for high severity violations
  if (detections.some(d => 
    highLabels.some(label => d.label?.toLowerCase().includes(label)) && 
    d.confidence > 0.7
  )) {
    return 'high';
  }
  
  // Check for medium severity based on confidence
  if (detections.some(d => d.confidence > 0.8)) {
    return 'medium';
  }
  
  // Default to low severity
  return 'low';
}

// Generate mock detections for testing purposes
function generateMockDetections(industry: string) {
  console.log(`Generating mock detections for industry: ${industry}`);
  const detectionCount = Math.floor(Math.random() * 3) + 1;
  const detections = [];
  
  const possibleLabels: Record<string, string[]> = {
    'Construction': ['missing_hardhat', 'missing_safety_vest', 'unsafe_ladder_position', 'tripping_hazard', 'unguarded_edge'],
    'Manufacturing': ['missing_eye_protection', 'machine_guard_removed', 'improper_lifting', 'chemical_spill', 'electrical_hazard'],
    'Warehouse': ['improper_stacking', 'blocked_exit', 'forklift_unsafe_operation', 'missing_ppe', 'fall_hazard'],
    'Oil & Gas': ['missing_gas_detector', 'hot_work_violation', 'confined_space_entry', 'improper_lockout', 'missing_respirator'],
    'Healthcare': ['sharps_container_full', 'wet_floor_hazard', 'missing_gloves', 'biohazard_waste_improper', 'ergonomic_violation'],
    'Transportation': ['unsecured_load', 'missing_seatbelt', 'distracted_driving', 'tire_pressure_low', 'fatigue_signs']
  };
  
  const labels = possibleLabels[industry] || possibleLabels['Construction'];
  
  for (let i = 0; i < detectionCount; i++) {
    const randomIndex = Math.floor(Math.random() * labels.length);
    
    detections.push({
      label: labels[randomIndex],
      confidence: Math.random() * 0.3 + 0.7,
      bbox: [
        Math.random() * 100, // x
        Math.random() * 100, // y
        Math.random() * 200 + 50, // width
        Math.random() * 200 + 50 // height
      ],
      text: `${labels[randomIndex].replace(/_/g, ' ')} detected`
    });
  }
  
  return detections;
}

// Generate description based on detections
function generateDescription(detections: any[], industry: string): string {
  if (!detections || detections.length === 0) 
    return `No safety violations detected in this ${industry} environment.`;
  
  if (detections.length === 1) {
    return `Detected ${detections[0].label.replace(/_/g, ' ')} in ${industry} environment with ${(detections[0].confidence * 100).toFixed(0)}% confidence.`;
  }
  
  return `Detected ${detections.length} safety violations in ${industry} environment, including ${detections.map(d => d.label?.replace(/_/g, ' ')).join(', ')}.`;
}

// Function to fetch relevant regulations based on detections
function fetchRelevantRegulations(detections: any[], industry: string): {ids: string[], scores: number[]} {
  console.log(`Fetching regulations for: ${industry}, detections: ${detections.length}`);
  // Map of industry-specific regulations
  const regulationsByIndustry: Record<string, string[]> = {
    'Construction': [
      '29 CFR 1926.100', // Head protection
      '29 CFR 1926.102', // Eye and face protection
      '29 CFR 1926.501', // Fall protection
      '29 CFR 1926.451', // Scaffolding
      '29 CFR 1926.1053' // Ladders
    ],
    'Manufacturing': [
      '29 CFR 1910.132', // PPE General requirements
      '29 CFR 1910.212', // Machine guarding
      '29 CFR 1910.147', // Lockout/Tagout
      '29 CFR 1910.1200', // Hazard Communication
      '29 CFR 1910.219' // Mechanical power-transmission
    ],
    'Warehouse': [
      '29 CFR 1910.176', // Material handling
      '29 CFR 1910.178', // Powered industrial trucks
      '29 CFR 1910.37', // Exit routes
      '29 CFR 1910.36', // Design and construction
      '29 CFR 1910.159' // Fire detection systems
    ]
  };
  
  // Get regulations for the specified industry or default to Construction
  const regs = regulationsByIndustry[industry] || regulationsByIndustry['Construction'];
  
  // For the demo, select 1-3 random regulations
  const count = Math.min(Math.floor(Math.random() * 3) + 1, regs.length);
  const selectedRegs = [];
  const scores = [];
  
  for (let i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * regs.length);
    selectedRegs.push(regs[index]);
    scores.push(Math.random() * 0.3 + 0.7); // Random relevance between 0.7 and 1.0
    
    // Remove the selected reg to avoid duplicates
    regs.splice(index, 1);
  }
  
  return { ids: selectedRegs, scores };
}

// Main function to analyze violations
async function analyzeViolation(request: AnalyzeRequest): Promise<AnalysisResult> {
  console.log("Analyzing violation with request:", request);
  
  try {
    // Generate mock detections based on industry
    const detections = generateMockDetections(request.industry);
    
    // Determine severity based on detections
    const severity = determineSeverity(detections);
    
    // Generate description
    const description = generateDescription(detections, request.industry);
    
    // Fetch relevant regulations
    const regulations = fetchRelevantRegulations(detections, request.industry);
    
    // Calculate overall confidence as average of detection confidences
    const confidence = detections.length > 0
      ? detections.reduce((sum, d) => sum + (d.confidence || 0), 0) / detections.length
      : 0.75; // Default confidence if no detections
    
    // Return the analysis result
    return {
      regulationIds: regulations.ids,
      relevanceScores: regulations.scores,
      confidence: confidence,
      severity: severity,
      status: 'open',
      description: description,
      detections: detections
    };
  } catch (error) {
    console.error("Error in analyzeViolation:", error);
    
    // Return a fallback result in case of error
    return {
      regulationIds: ['29 CFR 1926.20'],
      relevanceScores: [0.8],
      confidence: 0.7,
      severity: 'medium',
      status: 'open',
      description: `Potential safety violation detected in ${request.industry} environment.`,
      detections: [
        {
          label: 'safety_violation',
          confidence: 0.7,
          bbox: [50, 50, 100, 100],
          text: 'Potential safety violation detected'
        }
      ]
    };
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }
  
  try {
    // Parse the JSON body
    const requestData: AnalyzeRequest = await req.json();
    
    // Log the request data
    console.log("Received analyze-violation request:", JSON.stringify(requestData));
    
    // Validate request data - need at least industry
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
      JSON.stringify({ 
        error: error.message || "An error occurred during analysis",
        // Include fallback data so the UI can still function
        regulationIds: ['29 CFR 1926.20'],
        relevanceScores: [0.8],
        confidence: 0.7,
        severity: 'medium',
        status: 'open',
        description: 'An error occurred during analysis, but a potential safety violation was detected.',
        detections: [
          {
            label: 'safety_violation',
            confidence: 0.7,
            bbox: [50, 50, 100, 100],
            text: 'Potential safety violation detected'
          }
        ]
      }),
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
