
/**
 * Generates remediation steps for a safety violation
 * @param violation The violation object with severity and description
 * @returns Formatted remediation steps as string
 */
export const generateRemediationSteps = (violation: any): string => {
  const { severity, description, detections } = violation;
  let remediationSteps = '';
  
  // Create a title based on the severity
  const severityText = {
    'low': 'Minor Issue',
    'medium': 'Moderate Risk',
    'high': 'Serious Hazard',
    'critical': 'Critical Safety Risk'
  }[severity] || 'Safety Issue';
  
  remediationSteps += `# ${severityText}: ${description}\n\n`;
  
  // Add detected violations if available
  if (detections && detections.length > 0) {
    remediationSteps += `## Detected violations:\n`;
    detections.forEach((detection: any, index: number) => {
      if (detection.label) {
        remediationSteps += `${index + 1}. ${detection.label.replace('_', ' ')}\n`;
      }
    });
    remediationSteps += '\n';
  }
  
  // Generate recommended actions based on severity
  remediationSteps += `## Recommended actions:\n`;
  
  // Standard steps for all severities
  remediationSteps += `1. Document the violation with photos and written description\n`;
  remediationSteps += `2. Identify all affected areas and personnel\n`;
  
  // Severity-specific steps
  if (severity === 'critical' || severity === 'high') {
    remediationSteps += `3. **URGENT**: Stop related work activities immediately\n`;
    remediationSteps += `4. Evacuate personnel if necessary\n`;
    remediationSteps += `5. Place warning signs and barriers around the area\n`;
    remediationSteps += `6. Notify safety manager and site supervisor immediately\n`;
    remediationSteps += `7. Implement corrective measures before work can resume\n`;
    remediationSteps += `8. Conduct safety review with all affected personnel\n`;
    remediationSteps += `9. Document all corrective actions with photos\n`;
    remediationSteps += `10. Conduct follow-up inspection within 24 hours\n`;
  } else if (severity === 'medium') {
    remediationSteps += `3. Notify area supervisor\n`;
    remediationSteps += `4. Place warning signs as needed\n`;
    remediationSteps += `5. Implement temporary controls\n`;
    remediationSteps += `6. Schedule permanent fix within 48 hours\n`;
    remediationSteps += `7. Document corrective actions\n`;
    remediationSteps += `8. Conduct follow-up inspection\n`;
  } else {
    remediationSteps += `3. Notify area supervisor\n`;
    remediationSteps += `4. Schedule corrective action\n`;
    remediationSteps += `5. Document when fixed\n`;
    remediationSteps += `6. Add to safety review agenda\n`;
  }
  
  // Add regulatory compliance section
  if (violation.regulationIds && violation.regulationIds.length > 0) {
    remediationSteps += `\n## Regulatory compliance:\n`;
    remediationSteps += `This violation may be related to the following regulations:\n`;
    violation.regulationIds.forEach((id: string, index: number) => {
      remediationSteps += `- ${id}\n`;
    });
  }
  
  return remediationSteps;
};
