
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
    steps += '1. **Stop Work**: Halt operations in the affected area immediately\n';
    steps += '2. **Remove Personnel**: Remove all personnel without proper PPE from the work zone\n';
    steps += '3. **Provide Equipment**: Issue proper head protection to all affected workers\n';
    steps += '4. **Inspect**: Inspect all helmets to ensure they meet ANSI Z89.1 standards\n';
    steps += '5. **Document**: Record the violation with photos and incident report\n';
    steps += '6. **Train**: Conduct emergency PPE compliance training session before resuming work\n';
    steps += '7. **Implement Checks**: Establish mandatory PPE checkpoints at all work zone entrances\n';
  } else if (violationLower.includes('ladder') || violationLower.includes('scaffold')) {
    steps += '1. **Immediate Action**: Evacuate and cordon off the area containing unsafe equipment\n';
    steps += '2. **Removal**: Remove unsafe ladders/scaffolding and tag as "Do Not Use"\n';
    steps += '3. **Inspection**: Have qualified personnel conduct thorough inspection of all similar equipment\n';
    steps += '4. **Replacement**: Source properly rated and inspected equipment according to OSHA standards\n';
    steps += '5. **Installation**: Have qualified personnel install and secure replacement equipment\n';
    steps += '6. **Training**: Provide ladder/scaffold safety training to all affected workers\n';
    steps += '7. **Documentation**: Update equipment registry and inspection logs\n';
  } else if (violationLower.includes('electrical') || violationLower.includes('wiring')) {
    steps += '1. **De-energize**: Shut off power to affected systems immediately\n';
    steps += '2. **Lockout/Tagout**: Implement lockout/tagout procedures to prevent re-energizing\n';
    steps += '3. **Assessment**: Have certified electrician inspect all affected systems\n';
    steps += '4. **Repair**: Conduct repairs according to NEC and OSHA electrical safety standards\n';
    steps += '5. **Testing**: Conduct thorough testing before restoring power\n';
    steps += '6. **Training**: Provide electrical safety training to all relevant personnel\n';
    steps += '7. **Documentation**: Update electrical safety plan and inspection schedules\n';
  } else if (violationLower.includes('fire') || violationLower.includes('exit')) {
    steps += '1. **Clear Obstructions**: Immediately remove all blockages from exits and fire equipment\n';
    steps += '2. **Inspection**: Verify all exits are properly marked and accessible\n';
    steps += '3. **Fire Equipment**: Check all fire extinguishers and suppression systems\n';
    steps += '4. **Emergency Plan**: Review and update the emergency action plan\n';
    steps += '5. **Training**: Conduct emergency evacuation drills\n';
    steps += '6. **Monitoring**: Implement daily walkthrough to ensure exits remain clear\n';
    steps += '7. **Documentation**: Update fire safety plan and inspection logs\n';
  } else if (violationLower.includes('fall') || violationLower.includes('guardrail')) {
    steps += '1. **Secure Area**: Immediately block access to areas with fall hazards\n';
    steps += '2. **Install Protection**: Install temporary guardrails or fall protection systems\n';
    steps += '3. **Assess**: Conduct comprehensive fall hazard assessment\n';
    steps += '4. **Permanent Solution**: Design and implement permanent fall protection systems\n';
    steps += '5. **Training**: Provide fall protection training to all affected personnel\n';
    steps += '6. **Equipment**: Issue appropriate fall arrest equipment if guardrails not feasible\n';
    steps += '7. **Inspection**: Schedule regular inspections of all fall protection measures\n';
  } else if (violationLower.includes('housekeep') || violationLower.includes('trip') || violationLower.includes('debris')) {
    steps += '1. **Secure Area**: Block access to areas with significant trip hazards\n';
    steps += '2. **Cleanup**: Organize immediate cleanup of debris and materials\n';
    steps += '3. **Storage**: Establish proper storage locations for all materials\n';
    steps += '4. **Walking Paths**: Clearly mark and maintain clear walkways\n';
    steps += '5. **Schedule**: Implement regular cleanup schedule for all work areas\n';
    steps += '6. **Training**: Provide housekeeping training to all personnel\n';
    steps += '7. **Inspection**: Conduct regular housekeeping audits\n';
  } else {
    steps += '1. **Assessment**: Thoroughly assess the violation and associated risks\n';
    steps += '2. **Secure Area**: Restrict access to affected areas\n';
    steps += '3. **Mitigation**: Implement immediate corrective measures\n';
    steps += '4. **Root Cause**: Identify and address the root causes of the violation\n';
    steps += '5. **Training**: Provide training on relevant safety procedures\n';
    steps += '6. **Documentation**: Document all corrective actions taken\n';
    steps += '7. **Follow-up**: Schedule inspection to verify compliance\n';
  }
  
  // Add verification and reporting steps
  steps += '\n## Verification & Reporting:\n';
  steps += '1. Document all remediation actions with before/after photos\n';
  steps += '2. Verify corrections with safety supervisor sign-off\n';
  steps += '3. Report completion status to management within 24 hours\n';
  steps += '4. Implement preventive measures to avoid recurrence\n';
  steps += '5. Schedule follow-up inspection in 7, 30, and 90 days\n';
  steps += '6. Update safety management system with lessons learned\n';
  steps += '7. Review effectiveness of controls at next safety committee meeting\n';
  
  return steps;
}
