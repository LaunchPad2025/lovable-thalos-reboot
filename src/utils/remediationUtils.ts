
import { DetectedViolation } from '@/hooks/useViolationAnalysis';

/**
 * Generate detailed remediation steps for a violation
 */
export function generateRemediationSteps(violation: any): string {
  const violationType = typeof violation.label === 'string' 
    ? violation.label.replace(/_/g, ' ') 
    : (violation.violation || 'safety violation');
    
  const severity = violation.severity || 'medium';
  const confidence = Math.round((violation.confidence || 0.7) * 100);
  
  let steps = `# Remediation Plan for ${violationType}\n\n`;
  steps += `Severity: ${severity.toUpperCase()}\n`;
  steps += `Confidence Level: ${confidence}%\n\n`;
  
  // Add regulations if available
  if (violation.regulations && violation.regulations.length > 0) {
    steps += '## Applicable Regulations:\n';
    violation.regulations.forEach((reg: any) => {
      steps += `- ${reg.title || reg.id} (Relevance: ${Math.round((reg.relevance || 0.5) * 100)}%)\n`;
    });
    steps += '\n';
  }
  
  // Add required actions based on violation type
  steps += '## Required Actions:\n\n';
  
  const violationLower = violationType.toLowerCase();
  
  // Generate specific steps based on violation type
  if (violationLower.includes('hardhat') || violationLower.includes('helmet') || violationLower.includes('ppe')) {
    steps += '1. **Immediate Action**: Stop work in the affected area and provide proper PPE to all workers\n';
    steps += '2. **Documentation**: Document the violation with photos and incident report\n';
    steps += '3. **Training**: Conduct PPE compliance training session\n';
    steps += '4. **Inspection**: Implement daily PPE inspections before shift start\n';
    steps += '5. **Follow-up**: Ensure regular compliance audits are scheduled\n';
  } else if (violationLower.includes('ladder') || violationLower.includes('scaffold')) {
    steps += '1. **Immediate Action**: Remove unsafe equipment and replace with properly rated equipment\n';
    steps += '2. **Inspection**: Conduct thorough inspection of all similar equipment\n';
    steps += '3. **Training**: Provide ladder/scaffold safety training to all affected workers\n';
    steps += '4. **Procedures**: Implement equipment tagging and inspection procedures\n';
    steps += '5. **Documentation**: Maintain inspection logs for all equipment\n';
  } else if (violationLower.includes('electrical') || violationLower.includes('wiring')) {
    steps += '1. **Immediate Action**: De-energize affected systems and secure area\n';
    steps += '2. **Assessment**: Have qualified electrician inspect and repair\n';
    steps += '3. **Procedures**: Implement lockout/tagout protocols\n';
    steps += '4. **Training**: Conduct electrical safety training\n';
    steps += '5. **Documentation**: Update electrical safety plan and inspection schedule\n';
  } else if (violationLower.includes('fire') || violationLower.includes('exit')) {
    steps += '1. **Immediate Action**: Clear all obstructions from exits and fire equipment\n';
    steps += '2. **Inspection**: Verify all exits are properly marked and accessible\n';
    steps += '3. **Training**: Conduct emergency evacuation drills\n';
    steps += '4. **Procedures**: Implement daily walkthrough to ensure exits remain clear\n';
    steps += '5. **Documentation**: Update fire safety plan and inspection schedule\n';
  } else {
    steps += '1. **Assessment**: Thoroughly assess the violation and associated risks\n';
    steps += '2. **Mitigation**: Implement immediate corrective measures\n';
    steps += '3. **Training**: Provide training on relevant safety procedures\n';
    steps += '4. **Documentation**: Document all corrective actions taken\n';
    steps += '5. **Follow-up**: Schedule inspection to verify compliance\n';
  }
  
  // Add verification and reporting steps
  steps += '\n## Verification & Reporting:\n';
  steps += '1. Document all remediation actions with photos and reports\n';
  steps += '2. Verify corrections with safety supervisor sign-off\n';
  steps += '3. Report completion status to management\n';
  steps += '4. Implement preventive measures to avoid recurrence\n';
  steps += '5. Schedule follow-up inspection in 30 days\n';
  
  return steps;
}
