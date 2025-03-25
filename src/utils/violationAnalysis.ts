
import { supabase } from '@/lib/supabase';

export interface DetectedViolation {
  label: string;
  confidence: number;
  bbox?: [number, number, number, number];
  regulations?: {
    id: string;
    title: string;
    relevance: number;
  }[];
}

export async function mapViolationsToRegulations(detections: any[], industry: string): Promise<DetectedViolation[]> {
  try {
    // Map each detection to relevant regulations
    const mappedViolations = await Promise.all(detections.map(async (detection) => {
      // Search for relevant regulations based on the violation type and industry
      const { data: regulations, error } = await supabase
        .from('regulations')
        .select('id, title, document_type, jurisdiction')
        .textSearch('search_text', detection.label?.replace(/_/g, ' '))
        .eq('industry', industry)
        .limit(5);
        
      if (error) {
        console.error('Error fetching regulations:', error);
        return detection;
      }

      // Calculate relevance scores based on keyword matching
      const regulationsWithScores = regulations?.map(reg => ({
        id: reg.id,
        title: reg.title,
        relevance: calculateRelevance(detection.label, reg.title)
      })) || [];

      return {
        ...detection,
        regulations: regulationsWithScores
      };
    }));

    return mappedViolations;
  } catch (error) {
    console.error('Error in mapViolationsToRegulations:', error);
    return detections;
  }
}

function calculateRelevance(violationLabel: string, regulationTitle: string): number {
  const violationTerms = violationLabel.toLowerCase().split('_');
  const titleTerms = regulationTitle.toLowerCase().split(' ');
  
  let matchCount = 0;
  violationTerms.forEach(term => {
    if (titleTerms.some(titleTerm => titleTerm.includes(term))) {
      matchCount++;
    }
  });
  
  return matchCount / violationTerms.length;
}

export function generateRemediationSteps(violation: DetectedViolation): string {
  const violationType = violation.label?.replace(/_/g, ' ') || 'safety violation';
  const confidence = Math.round(violation.confidence * 100);
  
  let steps = `# Remediation Plan for ${violationType}\n\n`;
  steps += `Confidence Level: ${confidence}%\n\n`;
  
  // Add relevant regulations if available
  if (violation.regulations && violation.regulations.length > 0) {
    steps += '## Applicable Regulations:\n';
    violation.regulations.forEach(reg => {
      steps += `- ${reg.title} (Relevance: ${Math.round(reg.relevance * 100)}%)\n`;
    });
    steps += '\n';
  }
  
  // Generate steps based on violation type
  steps += '## Required Actions:\n\n';
  
  if (violationType.includes('hardhat') || violationType.includes('ppe')) {
    steps += '1. Immediately stop work in the affected area\n';
    steps += '2. Provide proper PPE to all workers\n';
    steps += '3. Conduct PPE compliance training\n';
    steps += '4. Document the violation and corrective actions\n';
  } else if (violationType.includes('ladder')) {
    steps += '1. Remove unsafe ladder from service\n';
    steps += '2. Inspect all ladders on site\n';
    steps += '3. Provide proper ladder safety training\n';
    steps += '4. Document and report corrective actions\n';
  } else {
    steps += '1. Stop work in the affected area\n';
    steps += '2. Assess immediate risks\n';
    steps += '3. Implement corrective measures\n';
    steps += '4. Document and verify corrections\n';
  }
  
  steps += '\n## Follow-up Actions:\n';
  steps += '1. Schedule safety inspection\n';
  steps += '2. Update safety procedures\n';
  steps += '3. Conduct refresher training\n';
  steps += '4. Monitor compliance\n';
  
  return steps;
}
