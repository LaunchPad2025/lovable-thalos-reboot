
import { Detection } from '@/hooks/model-testing/types';

export const getSeverityBadgeClass = (severity: string) => {
  switch (severity) {
    case 'low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
    case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  }
};

export const generateRemediationSteps = (violationLabel: string | Detection): string => {
  const label = typeof violationLabel === 'string' 
    ? violationLabel.toLowerCase() 
    : (violationLabel.label || '').toLowerCase();

  if (label.includes('hardhat') || label.includes('helmet')) {
    return "1. Require all personnel to wear properly fitted hardhats in the designated area\n2. Post visible signage about mandatory hardhat requirements\n3. Provide training on proper hardhat use and importance";
  } 
  else if (label.includes('vest') || label.includes('visibility')) {
    return "1. Ensure high-visibility vests are worn by all workers in active work zones\n2. Keep a supply of vests available for visitors and temporary workers\n3. Replace worn or damaged vests immediately";
  }
  else if (label.includes('guardrail') || label.includes('railing')) {
    return "1. Install OSHA-compliant guardrails along all open sides and edges\n2. Ensure guardrails have top rail, mid rail and toe board where required\n3. Inspect guardrails regularly for stability and proper attachment";
  }
  else if (label.includes('ladder')) {
    return "1. Ensure ladders are properly secured and on stable ground\n2. Train workers on proper ladder usage (3-point contact rule)\n3. Replace damaged ladders and perform regular inspections";
  }
  else if (label.includes('scaffold')) {
    return "1. Have qualified person inspect scaffolding before each work shift\n2. Ensure proper guardrails, access points and stable foundation\n3. Keep platforms clear of debris and unnecessary materials";
  }
  else if (label.includes('falling') || label.includes('height')) {
    return "1. Implement appropriate fall protection systems (guardrails, safety nets, personal fall arrest)\n2. Train workers on fall prevention and protection equipment\n3. Conduct regular inspections of fall protection equipment";
  }
  else if (label.includes('fire') || label.includes('extinguisher')) {
    return "1. Ensure fire extinguishers are properly mounted and accessible\n2. Schedule regular inspections and maintenance of fire extinguishers\n3. Train personnel on fire extinguisher usage and emergency procedures";
  }
  else if (label.includes('electrical') || label.includes('wiring')) {
    return "1. Have qualified electrician inspect and repair exposed/improper wiring\n2. Install proper covers on all junction boxes and outlets\n3. Implement lockout/tagout procedures for electrical work";
  }
  else if (label.includes('tripping') || label.includes('housekeeping')) {
    return "1. Implement regular cleaning schedules to remove debris\n2. Designate proper storage areas for materials and tools\n3. Create clear walkways and mark them visibly";
  }
  else {
    return "1. Conduct a thorough inspection of the identified safety violation\n2. Implement immediate corrective actions to address the hazard\n3. Provide appropriate training to workers on safe practices related to this issue";
  }
};
