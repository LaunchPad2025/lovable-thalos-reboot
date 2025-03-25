
import { TestResult, Detection } from './types';

export function useMockAnalysis() {
  const generateMockAnalysis = (imageUrl: string | null, industry: string): TestResult => {
    console.log("Generating mock analysis for fallback");
    
    const possibleViolations: Detection[] = [
      { 
        label: "missing_hardhat", 
        confidence: 0.89, 
        bbox: [120, 80, 100, 120] as [number, number, number, number] 
      },
      { 
        label: "missing_safety_vest", 
        confidence: 0.75, 
        bbox: [200, 150, 120, 200] as [number, number, number, number] 
      },
      { 
        label: "unsafe_ladder_usage", 
        confidence: 0.82, 
        bbox: [280, 100, 150, 250] as [number, number, number, number]  
      },
      { 
        label: "tripping_hazard", 
        confidence: 0.68, 
        bbox: [150, 350, 200, 80] as [number, number, number, number] 
      }
    ];
    
    const numViolations = Math.floor(Math.random() * 2) + 1;
    const detections = possibleViolations
      .sort(() => 0.5 - Math.random())
      .slice(0, numViolations);
    
    const result: TestResult = {
      regulationIds: ["29CFR1926.100", "29CFR1926.102"],
      relevanceScores: [0.92, 0.78],
      confidence: 0.85,
      severity: "medium",
      status: "open",
      description: `Detected potential safety violations in ${industry} environment: ${detections.map(d => d.label?.replace('_', ' ')).join(', ')}.`,
      detections,
      imagePreview: imageUrl,
      industry,
      id: `v-${Date.now().toString(36)}`
    };
    
    return result;
  };
  
  return { generateMockAnalysis };
}
