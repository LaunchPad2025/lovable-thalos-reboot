
import { supabase } from '@/lib/supabase';
import { DetectedViolation } from '@/hooks/useViolationAnalysis';

/**
 * Maps detected violations to relevant safety regulations in the database
 */
export async function mapViolationsToRegulations(detections: any[], industry: string): Promise<DetectedViolation[]> {
  try {
    console.log('Mapping violations to regulations for industry:', industry);
    
    // Map each detection to relevant regulations
    const mappedViolations = await Promise.all(detections.map(async (detection) => {
      // Clean up the label for better searching
      const searchTerm = detection.label?.replace(/_/g, ' ').toLowerCase() || '';
      console.log('Searching for regulations related to:', searchTerm);
      
      // Search for relevant regulations based on the violation type and industry
      const { data: regulations, error } = await supabase
        .from('regulations')
        .select('id, title, document_type, jurisdiction')
        .textSearch('search_text', searchTerm)
        .eq('industry', industry)
        .limit(5);
        
      if (error) {
        console.error('Error fetching regulations:', error);
        return detection;
      }

      // Calculate relevance scores based on keyword matching
      const regulationsWithScores = regulations?.map(reg => {
        const relevance = calculateRelevance(detection.label, reg.title);
        console.log(`Regulation match: ${reg.title} - Relevance: ${relevance}`);
        return {
          id: reg.id,
          title: reg.title,
          relevance: relevance
        };
      }) || [];

      // Sort by relevance score
      regulationsWithScores.sort((a, b) => b.relevance - a.relevance);

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

/**
 * Calculate relevance score between violation label and regulation title
 */
function calculateRelevance(violationLabel: string, regulationTitle: string): number {
  if (!violationLabel || !regulationTitle) return 0;
  
  const violationTerms = violationLabel.toLowerCase().replace(/_/g, ' ').split(' ');
  const titleTerms = regulationTitle.toLowerCase().split(' ');
  
  let matchCount = 0;
  let totalTerms = 0;
  
  violationTerms.forEach(term => {
    if (term.length > 2) { // Only count meaningful terms
      totalTerms++;
      if (titleTerms.some(titleTerm => titleTerm.includes(term) || term.includes(titleTerm))) {
        matchCount++;
      }
    }
  });
  
  // Also check if regulation title contains safety-related terms
  const safetyTerms = ['safety', 'hazard', 'protection', 'ppe', 'equipment', 'regulatory', 'compliance', 'violation'];
  safetyTerms.forEach(term => {
    if (regulationTitle.toLowerCase().includes(term)) {
      matchCount += 0.5;
    }
  });
  
  return totalTerms > 0 ? Math.min(matchCount / totalTerms, 1) : 0;
}

/**
 * Generate step-by-step remediation plan for a detected violation
 */
export function generateRemediationSteps(violation: DetectedViolation): string {
  const violationType = violation.label?.replace(/_/g, ' ') || 'safety violation';
  const confidence = Math.round((violation.confidence || 0) * 100);
  
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
  
  if (violationType.includes('hardhat') || violationType.includes('helmet') || violationType.includes('ppe')) {
    steps += '1. Immediately stop work in the affected area\n';
    steps += '2. Provide proper PPE to all workers\n';
    steps += '3. Conduct PPE compliance training\n';
    steps += '4. Document the violation and corrective actions\n';
    steps += '5. Implement regular PPE inspections\n';
  } else if (violationType.includes('ladder') || violationType.includes('scaffold')) {
    steps += '1. Remove unsafe ladder/scaffold from service\n';
    steps += '2. Inspect all ladders/scaffolds on site\n';
    steps += '3. Provide proper ladder/scaffold safety training\n';
    steps += '4. Implement a tagging system for equipment\n';
    steps += '5. Document and report corrective actions\n';
  } else if (violationType.includes('guardrail') || violationType.includes('fall')) {
    steps += '1. Cordon off hazardous areas immediately\n';
    steps += '2. Install proper guardrails or fall protection\n';
    steps += '3. Conduct fall protection training\n';
    steps += '4. Implement fall prevention inspection protocols\n';
    steps += '5. Document compliance with fall protection standards\n';
  } else if (violationType.includes('chemical') || violationType.includes('hazardous')) {
    steps += '1. Isolate area and prevent access\n';
    steps += '2. Review Safety Data Sheets (SDS)\n';
    steps += '3. Provide appropriate containment and storage\n';
    steps += '4. Conduct hazardous materials training\n';
    steps += '5. Implement chemical inventory management system\n';
  } else if (violationType.includes('electrical') || violationType.includes('wiring')) {
    steps += '1. De-energize affected electrical systems\n';
    steps += '2. Have qualified electrician inspect and repair\n';
    steps += '3. Implement proper lockout/tagout procedures\n';
    steps += '4. Conduct electrical safety training\n';
    steps += '5. Schedule regular electrical system inspections\n';
  } else {
    steps += '1. Stop work in the affected area\n';
    steps += '2. Assess immediate risks\n';
    steps += '3. Implement corrective measures\n';
    steps += '4. Provide appropriate worker training\n';
    steps += '5. Document and verify corrections\n';
  }
  
  steps += '\n## Follow-up Actions:\n';
  steps += '1. Schedule safety inspection within 7 days\n';
  steps += '2. Update safety procedures\n';
  steps += '3. Conduct refresher training\n';
  steps += '4. Monitor compliance for 30 days\n';
  steps += '5. Report to management with corrective action results\n';
  
  return steps;
}
