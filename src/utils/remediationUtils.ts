
/**
 * Generates remediation steps for a safety violation
 * @param violation The violation object with severity and description
 * @returns Formatted remediation steps as string
 */
export const generateRemediationSteps = (violation: any): string => {
  const { severity, description, detections, industry, regulation } = violation;
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
        remediationSteps += `${index + 1}. ${detection.label.replace(/_/g, ' ')}\n`;
        if (detection.confidence) {
          remediationSteps += `   - Confidence: ${Math.round(detection.confidence * 100)}%\n`;
        }
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
  
  // Add industry-specific guidelines if available
  if (industry) {
    remediationSteps += `\n## Industry-specific guidelines (${industry}):\n`;
    
    if (industry.toLowerCase().includes('construction')) {
      remediationSteps += `- Review OSHA Construction Safety Standards (29 CFR 1926)\n`;
      remediationSteps += `- Confirm proper Personal Protective Equipment (PPE) usage\n`;
      remediationSteps += `- Verify Fall Protection measures if working at heights\n`;
    } else if (industry.toLowerCase().includes('manufacturing')) {
      remediationSteps += `- Review Machine Guarding requirements (29 CFR 1910.212)\n`;
      remediationSteps += `- Verify Lockout/Tagout procedures are being followed\n`;
      remediationSteps += `- Check Material Handling equipment compliance\n`;
    } else if (industry.toLowerCase().includes('healthcare')) {
      remediationSteps += `- Review Bloodborne Pathogens standard (29 CFR 1910.1030)\n`;
      remediationSteps += `- Verify Medical Waste handling procedures\n`;
      remediationSteps += `- Check Patient Handling protocols\n`;
    } else {
      remediationSteps += `- Review industry best practices and standards\n`;
      remediationSteps += `- Consult with industry safety specialists\n`;
      remediationSteps += `- Implement industry-specific corrective actions\n`;
    }
  }
  
  // Add regulatory compliance section
  if (violation.regulationIds && violation.regulationIds.length > 0) {
    remediationSteps += `\n## Regulatory compliance:\n`;
    remediationSteps += `This violation may be related to the following regulations:\n`;
    violation.regulationIds.forEach((id: string, index: number) => {
      remediationSteps += `- ${id}\n`;
    });
  } else if (regulation) {
    remediationSteps += `\n## Regulatory compliance:\n`;
    remediationSteps += `This violation may be related to the following regulations:\n`;
    remediationSteps += `- ${regulation}\n`;
    
    // Add common regulations based on severity or type
    if (severity === 'critical' || severity === 'high') {
      remediationSteps += `- OSHA General Duty Clause (Section 5(a)(1))\n`;
    }
  }
  
  // Add documentation requirements
  remediationSteps += `\n## Documentation requirements:\n`;
  remediationSteps += `1. Incident report with date, time, location details\n`;
  remediationSteps += `2. List of personnel involved or affected\n`;
  remediationSteps += `3. Photos of violation before and after remediation\n`;
  remediationSteps += `4. Description of corrective actions taken\n`;
  remediationSteps += `5. Timeline for implementation of permanent fixes\n`;
  
  return remediationSteps;
};

/**
 * Formats the violation description for display
 * @param violation The violation object
 * @returns Formatted violation description
 */
export const formatViolationDescription = (violation: any): string => {
  const { severity, description, detections, confidence } = violation;
  
  // Create a prefix based on severity
  const severityPrefix = {
    'low': 'Minor safety concern: ',
    'medium': 'Moderate safety issue: ',
    'high': 'Serious safety hazard: ',
    'critical': 'CRITICAL SAFETY RISK: '
  }[severity] || '';
  
  // Format the confidence level if available
  const confidenceText = confidence 
    ? ` (${Math.round(confidence * 100)}% confidence)` 
    : '';
  
  // Use the provided description or generate one from detections
  let finalDescription = description || '';
  
  if (!finalDescription && detections && detections.length > 0) {
    const detectionLabels = detections
      .filter((d: any) => d.label)
      .map((d: any) => d.label.replace(/_/g, ' '));
    
    if (detectionLabels.length === 1) {
      finalDescription = `${detectionLabels[0]} detected`;
    } else if (detectionLabels.length > 1) {
      const lastLabel = detectionLabels.pop();
      finalDescription = `${detectionLabels.join(', ')} and ${lastLabel} detected`;
    }
  }
  
  return `${severityPrefix}${finalDescription}${confidenceText}`;
};
