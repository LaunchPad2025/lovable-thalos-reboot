
/**
 * Utility functions for generating remediation steps based on violation type
 */

interface ViolationDetails {
  violation: string;
  severity?: string;
  [key: string]: any;
}

/**
 * Generates detailed remediation steps based on the type of violation
 * @param violation - The violation details object
 * @returns A formatted string with remediation steps tailored to the violation type
 */
export const generateRemediationSteps = (violation: ViolationDetails): string => {
  const baseText = `This task was automatically generated based on the detected violation: "${violation.violation}".

Follow these remediation steps:

1. Assess the situation - Review the violation details and understand the safety hazard involved.
2. Document the current state - Take photos and notes about the current condition.
3. Plan corrective actions - Determine what needs to be fixed and how.
4. Implement safety measures - Make the necessary changes to address the violation.
5. Verify compliance - Ensure the issue has been properly resolved.
6. Document the resolution - Take photos and notes after remediation.
7. Follow up - Schedule a follow-up inspection to ensure the issue doesn't recur.

Additional guidance:`;

  // Add specific guidance based on the type of violation
  if (violation.violation.toLowerCase().includes('ppe') || violation.violation.toLowerCase().includes('protective equipment')) {
    return `${baseText}

- Check all PPE inventory and condition
- Ensure proper PPE signage is clearly visible
- Verify all staff have been trained on proper PPE usage
- Replace any damaged or missing equipment immediately
- Document compliance with OSHA Standard 1910.132`;
  } 
  else if (violation.violation.toLowerCase().includes('fire') || violation.violation.toLowerCase().includes('evacuation')) {
    return `${baseText}

- Ensure all fire exits are clearly marked and unobstructed
- Verify fire extinguishers are properly mounted and inspected
- Check that evacuation plans are posted in visible locations
- Conduct a fire drill to test the evacuation procedure
- Document compliance with NFPA 101 Life Safety Code`;
  }
  else if (violation.violation.toLowerCase().includes('chemical') || violation.violation.toLowerCase().includes('hazardous')) {
    return `${baseText}

- Verify all chemicals are properly labeled and stored
- Ensure Safety Data Sheets (SDS) are up-to-date and accessible
- Check that proper containment measures are in place
- Verify staff are trained on chemical handling procedures
- Document compliance with OSHA Hazard Communication Standard`;
  }
  else if (violation.violation.toLowerCase().includes('electrical') || violation.violation.toLowerCase().includes('wiring')) {
    return `${baseText}

- Disconnect power to affected area before inspection
- Fix any exposed wiring with proper insulation
- Ensure all electrical panels are properly labeled
- Check that GFCI protection is installed where required
- Document compliance with NEC (National Electrical Code)`;
  }
  
  // Default guidance for other violations
  return `${baseText}

- Consult relevant safety standards and regulations
- Engage safety specialists if needed
- Document all steps taken to address the violation
- Consider additional training for staff to prevent recurrence`;
};
