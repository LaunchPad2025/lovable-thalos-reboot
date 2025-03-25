
import { useState } from 'react';
import { TestResult } from './types';

export function useMockAnalysis() {
  const [isGenerating, setIsGenerating] = useState(false);
  
  const generateMockAnalysis = async (imageUrl: string | null, industry: string): Promise<TestResult> => {
    setIsGenerating(true);
    console.log("Generating mock analysis data for fallback");
    
    try {
      // Simple delay to simulate processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create random mock detections based on industry
      const detections = generateMockDetections(industry);
      
      // Calculate severity
      const severity = determineSeverity(detections);
      
      // Generate random location based on industry
      const location = generateLocation(industry);
      
      // Get relevant regulations
      const { regulationIds, relevanceScores } = getRelevantRegulations(industry, detections);
      
      // Generate description
      const description = generateDescription(detections, industry);
      
      const result: TestResult = {
        id: `mock-${Date.now()}`,
        confidence: detections.length > 0 
          ? detections.reduce((sum, d) => sum + (d.confidence || 0), 0) / detections.length 
          : 0.75,
        severity: severity,
        status: 'open',
        imagePreview: imageUrl,
        industry: industry,
        location: location,
        description: description,
        detections: detections,
        regulationIds: regulationIds,
        relevanceScores: relevanceScores
      };
      
      console.log("Generated mock result:", result);
      return result;
    } catch (error) {
      console.error("Error generating mock analysis:", error);
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };
  
  return { isGenerating, generateMockAnalysis };
}

// Helper functions

function generateMockDetections(industry: string) {
  const detectionCount = Math.floor(Math.random() * 3) + 1;
  const detections = [];
  
  // Define possible violations by industry
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
      confidence: Math.random() * 0.3 + 0.7, // Random confidence between 0.7 and 1.0
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

function generateLocation(industry: string): string {
  const locationsByIndustry: Record<string, string[]> = {
    'Construction': ['Building A Construction Site', 'North Tower Foundation', 'South Wing Scaffold Area', 'Main Excavation Zone'],
    'Manufacturing': ['Assembly Line Section B', 'Processing Plant Floor 3', 'Packaging Department', 'Chemical Storage Area'],
    'Warehouse': ['Aisle 12 Storage Racks', 'Loading Dock B', 'Pallet Stacking Area', 'High-Bay Storage Zone'],
    'Oil & Gas': ['Processing Platform Alpha', 'Pump Station 3', 'Offshore Rig Section 2', 'Pipeline Junction 12'],
    'Healthcare': ['Emergency Department', 'Laboratory Area 3', 'Patient Ward B', 'Sterilization Room'],
    'Transportation': ['Loading Terminal 5', 'Fleet Garage Bay 2', 'Shipping Dock C', 'Vehicle Maintenance Area']
  };
  
  const locations = locationsByIndustry[industry] || locationsByIndustry['Construction'];
  return locations[Math.floor(Math.random() * locations.length)];
}

function getRelevantRegulations(industry: string, detections: any[]) {
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
    ],
    'Oil & Gas': [
      '29 CFR 1910.119', // Process safety management
      '29 CFR 1910.146', // Confined spaces
      '29 CFR 1910.252', // Hot work
      '29 CFR 1910.1200', // Hazard Communication
      '29 CFR 1910.134' // Respiratory protection
    ],
    'Healthcare': [
      '29 CFR 1910.1030', // Bloodborne pathogens
      '29 CFR 1910.134', // Respiratory protection
      '29 CFR 1910.1047', // Ethylene oxide
      '29 CFR 1910.1048', // Formaldehyde
      '29 CFR 1910.1096' // Ionizing radiation
    ],
    'Transportation': [
      '49 CFR 391', // Driver qualifications
      '49 CFR 392', // Driving of vehicles
      '49 CFR 393', // Parts and accessories
      '49 CFR 396', // Inspection, repair, and maintenance
      '49 CFR 177' // Hazardous materials
    ]
  };
  
  // Get regulations for the specified industry or default to Construction
  const regs = regulationsByIndustry[industry] || regulationsByIndustry['Construction'];
  
  // Select 1-3 random regulations
  const count = Math.min(Math.floor(Math.random() * 3) + 1, regs.length);
  const regulationIds = [];
  const relevanceScores = [];
  
  const availableRegs = [...regs];
  
  for (let i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * availableRegs.length);
    regulationIds.push(availableRegs[index]);
    relevanceScores.push(Math.random() * 0.3 + 0.7); // Random relevance between 0.7 and 1.0
    
    // Remove the selected reg to avoid duplicates
    availableRegs.splice(index, 1);
    if (availableRegs.length === 0) break;
  }
  
  return { regulationIds, relevanceScores };
}

function generateDescription(detections: any[], industry: string): string {
  if (!detections || detections.length === 0) 
    return `No safety violations detected in this ${industry} environment.`;
  
  if (detections.length === 1) {
    return `Detected ${detections[0].label.replace(/_/g, ' ')} in ${industry} environment with ${(detections[0].confidence * 100).toFixed(0)}% confidence.`;
  }
  
  return `Detected ${detections.length} safety violations in ${industry} environment, including ${detections.map(d => d.label?.replace(/_/g, ' ')).slice(0, 2).join(', ')}${detections.length > 2 ? ', and more' : ''}.`;
}
