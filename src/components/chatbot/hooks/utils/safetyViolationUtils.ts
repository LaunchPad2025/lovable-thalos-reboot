
/**
 * Generate mock safety violation detections for demo
 */
export const generateSafetyViolationDetections = (imageBase64: string) => {
  // In a real implementation, this would call a computer vision API
  // For demo purposes, we'll return mock detections 80% of the time
  const shouldDetectViolations = Math.random() > 0.2;
  
  if (!shouldDetectViolations) return [];
  
  // List of possible violations for demo
  const possibleViolations = [
    {
      label: "missing_hardhat",
      confidence: 0.89,
      regulation: "29 CFR 1926.100(a)"
    },
    {
      label: "improper_ladder_usage",
      confidence: 0.76,
      regulation: "29 CFR 1926.1053(b)"
    },
    {
      label: "trip_hazard",
      confidence: 0.82,
      regulation: "29 CFR 1926.25"
    },
    {
      label: "missing_guardrail",
      confidence: 0.91,
      regulation: "29 CFR 1926.502"
    },
    {
      label: "missing_safety_vest",
      confidence: 0.85,
      regulation: "29 CFR 1926.201"
    }
  ];
  
  // Randomly select 1-3 violations
  const numViolations = Math.floor(Math.random() * 3) + 1;
  const shuffled = [...possibleViolations].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numViolations);
};

/**
 * Format violations into a response message
 */
export const formatViolationsResponse = (violations: any[]) => {
  let response = "**Safety Analysis Results**\n\nI've analyzed the image and detected the following potential safety issues:\n\n";
  
  violations.forEach((violation, index) => {
    const label = violation.label.replace(/_/g, ' ');
    const confidence = Math.floor(violation.confidence * 100);
    response += `${index + 1}. **${label}** (${confidence}% confidence)\n`;
    response += `   *Regulation:* ${violation.regulation}\n`;
    response += `   *Remediation:* ${getRemediationForViolation(violation.label)}\n\n`;
  });
  
  response += "Please take appropriate action to address these safety concerns. Remember, this is an automated analysis and should be verified by a qualified safety professional.";
  
  return response;
};

/**
 * Get remediation steps for a violation
 */
export const getRemediationForViolation = (violationLabel: string) => {
  switch(violationLabel.toLowerCase()) {
    case 'missing_hardhat':
      return "Ensure all personnel wear properly fitted hard hats in designated areas. Post visible signage about mandatory hard hat requirements.";
    case 'improper_ladder_usage':
      return "Secure ladders on stable ground. Maintain three-point contact when climbing. Ensure proper angle placement (1:4 ratio).";
    case 'trip_hazard':
      return "Clear walkways of debris. Implement regular cleaning schedules. Create designated storage areas for materials and tools.";
    case 'missing_guardrail':
      return "Install OSHA-compliant guardrails along all open sides and edges. Include top rail, mid rail, and toe board where required.";
    case 'missing_safety_vest':
      return "Ensure high-visibility vests are worn in active work zones. Keep a supply of vests available for visitors and temporary workers.";
    default:
      return "Address the identified safety issue according to workplace safety protocols and relevant OSHA regulations.";
  }
};
