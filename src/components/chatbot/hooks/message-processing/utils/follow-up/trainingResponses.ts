
/**
 * Responses for training-related follow-up questions
 */

/**
 * Generate a response for training frequency questions
 */
export const getTrainingFrequencyResponse = (topic: string): string => {
  if (topic.includes('fall protection')) {
    return "**Fall Protection Training Frequency Requirements**\n\nOSHA requires fall protection refresher training:\n\n1. **Initial comprehensive training** - Before employee exposure to fall hazards\n\n2. **Refresher training required when**:\n   - Workplace changes render previous training obsolete\n   - Fall protection equipment or systems change\n   - Employee demonstrates inadequate knowledge or use\n   - After any fall-related incident\n\n3. **Best practice** - Annual refresher training even if not specifically required\n\n4. **Documentation needed**:\n   - Training dates and content covered\n   - Trainer qualifications\n   - Employee verification of understanding\n   - Hands-on competency demonstration\n\nWould you like a downloadable fall protection training documentation template?";
  } else if (topic.includes('lockout') || topic.includes('tagout')) {
    return "**Lockout/Tagout Training Frequency Requirements**\n\nFor Lockout/Tagout procedures, OSHA requires:\n\n1. **Initial training** - Before employee performs service/maintenance\n\n2. **Retraining required when**:\n   - Job assignments change\n   - Machines, equipment or processes change\n   - New hazards are introduced\n   - Periodic inspection reveals inadequate employee knowledge\n   - After any near-miss or incident involving energy control\n\n3. **Standard practice** - Annual refresher training\n\n4. **Documentation requirements**:\n   - Training dates and specific content\n   - Employee demonstration of procedures\n   - Trainer qualifications\n   - Equipment covered in the training\n\nWould you like a downloadable lockout/tagout training program template?";
  } else if (topic.includes('hazard communication') || topic.includes('hazcom')) {
    return "**Hazard Communication Training Frequency Guidelines**\n\n1. **Initial training** - Before exposure to hazardous chemicals\n\n2. **Refresher training required when**:\n   - New chemical hazards are introduced\n   - Process or procedure changes affect exposure\n   - GHS labeling or SDS format changes\n   - Employee knowledge appears inadequate\n\n3. **Best practice** - Annual refresher training\n\n4. **Documentation requirements**:\n   - Training content covered (chemicals, hazards, protective measures)\n   - GHS labeling and SDS review\n   - Methods to detect presence of hazardous chemicals\n   - Employee verification of understanding\n\nWould you like a downloadable hazard communication training documentation template?";
  }
  
  // Generic training answer if no specific topic
  return "**Safety Training Frequency Best Practices**\n\n1. **Initial training**:\n   - Required before employee exposure to workplace hazards\n   - Must cover all applicable OSHA standards for the role\n   - Needs to be comprehensive and job-specific\n\n2. **Refresher training** typically required:\n   - Annually for most critical safety topics\n   - When processes, equipment, or materials change\n   - After incidents or near-misses\n   - When observations indicate knowledge gaps\n   - When regulations are updated\n\n3. **Documentation best practices**:\n   - Maintain a training matrix by position\n   - Track completion dates and schedule upcoming refreshers\n   - Document content, duration, and instructor qualifications\n   - Include employee verification of understanding\n\nWould you like a downloadable training frequency reference guide by topic?";
};
