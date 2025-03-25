
/**
 * Returns the appropriate CSS class for a violation severity
 */
export const getSeverityClass = (severity: string): string => {
  switch (severity) {
    case 'low': return 'bg-blue-100 text-blue-800';
    case 'medium': return 'bg-blue-500 text-white';
    case 'high': return 'bg-orange-500 text-white';
    case 'critical': return 'bg-red-500 text-white';
    default: return 'bg-gray-100 text-gray-800';
  }
};

// Added for TestResult type to support location property
export interface TestResult {
  id: string;
  violation: string;
  confidence: number;
  location: string;
  severity: string;
  description?: string;
  regulation?: string;
}

// Helper function to get the severity class for badges
export const getSeverityBadgeClass = (severity: string): string => {
  switch (severity) {
    case 'low': return 'bg-blue-900/50 text-blue-300 border border-blue-800';
    case 'medium': return 'bg-yellow-900/50 text-yellow-300 border border-yellow-800';
    case 'high': return 'bg-orange-900/50 text-orange-300 border border-orange-800';
    case 'critical': return 'bg-red-900/50 text-red-300 border border-red-800';
    default: return 'bg-gray-900/50 text-gray-300 border border-gray-800';
  }
};

// Generate remediation steps based on violation type
export const generateRemediationSteps = (violation: string): string => {
  const label = violation.toLowerCase();
  
  if (label.includes('hardhat') || label.includes('helmet')) {
    return 'Ensure all workers wear appropriate head protection in designated areas. Provide PPE training and regular compliance checks.';
  } else if (label.includes('vest') || label.includes('visibility')) {
    return 'Require high-visibility clothing for all workers in operational areas. Implement a color-coding system for different roles if needed.';
  } else if (label.includes('ladder')) {
    return 'Inspect all ladders for damage, ensure proper positioning (4:1 ratio), and train workers on three-point contact rule.';
  } else if (label.includes('tripping') || label.includes('housekeeping')) {
    return 'Clear walkways of debris, implement regular cleanup schedules, and designate storage areas away from pathways.';
  } else if (label.includes('electrical')) {
    return 'Ensure proper insulation of wires, use appropriate lockout/tagout procedures, and keep electrical panels accessible.';
  } else if (label.includes('scaffold') || label.includes('platform')) {
    return 'Verify scaffold stability before use, ensure proper guardrails are installed, and provide fall protection training.';
  } else if (label.includes('fire') || label.includes('exit')) {
    return 'Keep emergency exits clear at all times, ensure proper signage, and conduct regular evacuation drills.';
  } else if (label.includes('fall') || label.includes('railing')) {
    return 'Install proper guardrails on elevated surfaces, require fall arrest systems when working at heights, and inspect anchor points regularly.';
  }
  
  return 'Address the safety violation immediately. Conduct a safety briefing with all workers and document corrective actions taken.';
};
