
/**
 * Utility to extract requirements from regulation descriptions
 */

/**
 * Extract requirements from regulation description and keywords
 */
export const extractRequirements = (description: string | null, keywords: string[] | null): string[] => {
  // Default requirements if we can't extract specific ones
  const defaultRequirements = [
    "Regular inspections and documentation",
    "Employee training on hazard recognition and safe work practices",
    "Implementation of engineering and administrative controls",
    "Appropriate personal protective equipment (PPE)"
  ];
  
  // If we have specific keywords for HAZWOPER
  if (keywords && (keywords.includes('HAZWOPER') || keywords.includes('hazardous waste operations'))) {
    return [
      "HAZWOPER training (40 hours for hazardous waste workers)",
      "Site-specific health and safety plans",
      "Medical surveillance program for exposed workers",
      "Emergency response procedures",
      "Air monitoring and hazard assessment"
    ];
  }
  
  // If we have a detailed description, try to extract key requirements
  if (description && description.length > 100) {
    const requirements: string[] = [];
    const sentences = description.split(/\.\s+/);
    
    // Find sentences that likely contain requirements
    for (const sentence of sentences) {
      if (
        sentence.includes('require') ||
        sentence.includes('must') ||
        sentence.includes('shall') ||
        sentence.includes('implement') ||
        sentence.includes('establish')
      ) {
        // Clean and format the requirement
        let requirement = sentence.trim();
        if (requirement.length > 10 && requirement.length < 100) {
          // Remove starting phrases like "Employers must"
          requirement = requirement
            .replace(/^(Employers|The employer|This standard|OSHA)(s)?\s(must|shall|require|requires|mandates)\s/i, '')
            .replace(/^(It is required that|It is necessary for)\s/i, '');
          
          // Capitalize first letter
          requirement = requirement.charAt(0).toUpperCase() + requirement.slice(1);
          
          requirements.push(requirement);
          
          // Limit to 4 requirements
          if (requirements.length >= 4) break;
        }
      }
    }
    
    // If we found enough requirements, return them
    if (requirements.length >= 3) {
      return requirements;
    }
  }
  
  // Fall back to default requirements
  return defaultRequirements;
};
