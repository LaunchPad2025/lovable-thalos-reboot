
import { TestResult } from './types';

export function useMockAnalysis() {
  const generateMockAnalysis = async (imagePreview: string | null, industry: string): Promise<TestResult> => {
    // Simulate a processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const severity: 'low' | 'medium' | 'high' | 'critical' = 
      ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as any;
    
    // Generate mock detection data based on industry
    const detections = generateMockDetections(industry);
    
    // Generate description based on detections
    const description = generateMockDescription(detections, industry);
    
    // Generate mock regulation IDs based on industry and severity
    const regulationIds = generateMockRegulationIds(industry, severity);
    
    // Generate relevance scores
    const relevanceScores = regulationIds.map(() => Math.random() * 0.3 + 0.65);
    
    // Set location based on industry
    let location = 'Work Area';
    if (industry === 'Construction') {
      location = 'Building A Construction Site';
    } else if (industry === 'Manufacturing') {
      location = 'Factory Floor, Section B';
    } else if (industry === 'Warehouse') {
      location = 'Warehouse Storage Area';
    } else if (industry === 'Oil & Gas') {
      location = 'Processing Facility, Zone 3';
    } else if (industry === 'Healthcare') {
      location = 'Hospital Wing B';
    }
    
    const mockResult: TestResult = {
      confidence: Math.random() * 0.3 + 0.7,
      severity: severity,
      status: 'open',
      description: description,
      detections: detections,
      imagePreview: imagePreview,
      industry: industry,
      id: `v-${Date.now().toString(36)}`,
      location: location,
      regulationIds: regulationIds,
      relevanceScores: relevanceScores
    };
    
    return mockResult;
  };
  
  // Helper function to generate mock detections
  const generateMockDetections = (industry: string) => {
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
        ] as [number, number, number, number],
        text: `${labels[randomIndex].replace(/_/g, ' ')} detected`,
        remediationSteps: `1. Identify the affected area\n2. Address the ${labels[randomIndex].replace(/_/g, ' ')}\n3. Document corrective actions`
      });
    }
    
    return detections;
  };
  
  // Helper function to generate a description
  const generateMockDescription = (detections: any[], industry: string) => {
    if (detections.length === 0) {
      return `No safety violations detected in this ${industry} environment.`;
    }
    
    if (detections.length === 1) {
      return `Detected ${detections[0].label.replace(/_/g, ' ')} in ${industry} environment with ${(detections[0].confidence * 100).toFixed(0)}% confidence.`;
    }
    
    return `Detected ${detections.length} safety violations in ${industry} environment, including ${detections.map(d => d.label.replace(/_/g, ' ')).join(', ')}.`;
  };
  
  // Helper function to generate regulation IDs
  const generateMockRegulationIds = (industry: string, severity: 'low' | 'medium' | 'high' | 'critical') => {
    const regulationCount = Math.floor(Math.random() * 2) + 1;
    const regulations = [];
    
    const constructionRegs = ['29 CFR 1926.100', '29 CFR 1926.200', '29 CFR 1926.501', '29 CFR 1926.451'];
    const manufacturingRegs = ['29 CFR 1910.132', '29 CFR 1910.212', '29 CFR 1910.147', '29 CFR 1910.1200'];
    const warehouseRegs = ['29 CFR 1910.176', '29 CFR 1910.178', '29 CFR 1910.37', '29 CFR 1910.159'];
    const oilGasRegs = ['29 CFR 1910.119', '29 CFR 1910.146', '30 CFR 250.107', '40 CFR 112'];
    const healthcareRegs = ['29 CFR 1910.1030', '29 CFR 1910.1096', '42 CFR 482', 'NFPA 99'];
    
    let regs: string[] = [];
    
    switch (industry) {
      case 'Construction':
        regs = constructionRegs;
        break;
      case 'Manufacturing':
        regs = manufacturingRegs;
        break;
      case 'Warehouse':
        regs = warehouseRegs;
        break;
      case 'Oil & Gas':
        regs = oilGasRegs;
        break;
      case 'Healthcare':
        regs = healthcareRegs;
        break;
      default:
        regs = constructionRegs;
    }
    
    for (let i = 0; i < regulationCount; i++) {
      regulations.push(regs[Math.floor(Math.random() * regs.length)]);
    }
    
    // Add a critical regulation for higher severity violations
    if (severity === 'high' || severity === 'critical') {
      if (industry === 'Construction') {
        regulations.push('29 CFR 1926.501(b)(1)'); // Falls
      } else if (industry === 'Manufacturing') {
        regulations.push('29 CFR 1910.147(c)(1)'); // Lockout/Tagout
      } else {
        regulations.push('29 CFR 1910.37(a)(3)'); // Exit Routes
      }
    }
    
    return [...new Set(regulations)]; // Remove duplicates
  };
  
  return {
    generateMockAnalysis
  };
}
