
import { AnalysisResult } from '@/hooks/useViolationAnalysis';

// Helper function to generate mock violation data for testing and fallback
export function useMockViolationData() {
  const generateMockViolationData = (imageUrl: string, industry: string = 'construction'): AnalysisResult => {
    console.log("Generating mock analysis data for fallback");
    
    // Ensure we have a valid industry (fallback to construction if not provided or invalid)
    const validIndustries = ['construction', 'manufacturing', 'warehouse', 'oil_and_gas', 'healthcare'];
    const safeIndustry = validIndustries.includes(industry) ? industry : 'construction';
    
    // Ensure we have a valid image URL
    const safeImageUrl = imageUrl || '/placeholder.svg';
    
    const possibleViolations = [
      { 
        label: "missing_hardhat", 
        confidence: 0.89, 
        bbox: [120, 80, 100, 120] as [number, number, number, number],
        regulations: [
          { id: "OSHA-1926.100", title: "OSHA 29 CFR 1926.100 - Head Protection", relevance: 0.95 },
          { id: "ANSI-Z89.1", title: "ANSI Z89.1 - Industrial Head Protection", relevance: 0.87 }
        ]
      },
      { 
        label: "missing_safety_vest", 
        confidence: 0.75, 
        bbox: [200, 150, 120, 200] as [number, number, number, number],
        regulations: [
          { id: "OSHA-1926.201", title: "OSHA 29 CFR 1926.201 - High-Visibility Clothing", relevance: 0.92 },
          { id: "ANSI-107", title: "ANSI 107 - High-Visibility Safety Apparel", relevance: 0.85 }
        ]
      },
      { 
        label: "unsafe_ladder_usage", 
        confidence: 0.82, 
        bbox: [280, 100, 150, 250] as [number, number, number, number],
        regulations: [
          { id: "OSHA-1926.1053", title: "OSHA 29 CFR 1926.1053 - Ladders", relevance: 0.88 },
          { id: "ANSI-A14.2", title: "ANSI A14.2 - Portable Metal Ladders", relevance: 0.79 }
        ]
      },
      { 
        label: "tripping_hazard", 
        confidence: 0.68, 
        bbox: [150, 350, 200, 80] as [number, number, number, number],
        regulations: [
          { id: "OSHA-1926.25", title: "OSHA 29 CFR 1926.25 - Housekeeping", relevance: 0.81 },
          { id: "NFPA-101", title: "NFPA 101 - Life Safety Code", relevance: 0.72 }
        ]
      },
      { 
        label: "electrical_hazard", 
        confidence: 0.79, 
        bbox: [400, 200, 120, 160] as [number, number, number, number],
        regulations: [
          { id: "OSHA-1926.405", title: "OSHA 29 CFR 1926.405 - Wiring Methods", relevance: 0.87 },
          { id: "NEC-ARTICLE-590", title: "NEC Article 590 - Temporary Wiring", relevance: 0.83 }
        ]
      }
    ];
    
    // Generate a random number of violations (1-3)
    const numViolations = Math.floor(Math.random() * 3) + 1;
    const detections = possibleViolations
      .sort(() => 0.5 - Math.random())
      .slice(0, numViolations);
    
    // Generate a description based on the detected violations
    const violationTypes = detections.map(d => d.label.replace(/_/g, ' ')).join(', ');
    const description = `Detected potential safety violations: ${violationTypes} in ${safeIndustry} environment.`;
    
    // Determine location based on industry and violation types
    let location = 'Work Area';
    if (safeIndustry === 'construction') {
      if (detections.some(d => d.label.includes('ladder'))) {
        location = 'Building A, Elevated Work Zone';
      } else if (detections.some(d => d.label.includes('electrical'))) {
        location = 'Building B, Electrical Area';
      } else {
        location = 'Main Construction Site';
      }
    } else if (safeIndustry === 'manufacturing') {
      location = 'Assembly Line Area';
    } else if (safeIndustry === 'warehouse') {
      location = 'Storage Area B5';
    }
    
    // Set severity based on the number and type of violations
    let severity: 'low' | 'medium' | 'high' | 'critical' = 'low';
    if (numViolations > 2) {
      severity = 'critical';
    } else if (numViolations > 1) {
      severity = 'high';
    } else if (detections.some(d => d.label.includes('electrical') || d.label.includes('fall'))) {
      severity = 'high';
    } else {
      severity = 'medium';
    }
    
    const result: AnalysisResult = {
      imagePreview: safeImageUrl,
      detections,
      description,
      severity,
      confidence: 0.85,
      industry: safeIndustry,
      id: `v-${Date.now().toString(36)}`,
      regulationIds: detections.flatMap(d => d.regulations?.map(r => r.id) || []),
      relevanceScores: detections.flatMap(d => d.regulations?.map(r => r.relevance) || []),
      location: location
    };
    
    return result;
  };
  
  // Function to generate fallback data in case of error
  const generateFallbackData = (): AnalysisResult => {
    console.warn("Generating fallback violation data due to error");
    return {
      imagePreview: '/placeholder.svg',
      detections: [{
        label: "missing_hardhat",
        confidence: 0.95,
        bbox: [100, 100, 100, 100],
        regulations: [
          { id: "OSHA-1926.100", title: "OSHA 29 CFR 1926.100 - Head Protection", relevance: 0.95 }
        ]
      }],
      description: "Fallback data: Detected potential safety violations",
      severity: 'medium',
      confidence: 0.85,
      industry: 'construction',
      id: `v-fallback-${Date.now().toString(36)}`,
      regulationIds: ["OSHA-1926.100"],
      relevanceScores: [0.95],
      location: 'Work Area'
    };
  };
  
  return { generateMockViolationData, generateFallbackData };
}
