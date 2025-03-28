
/**
 * Responses for training-related follow-up questions
 */

/**
 * Generate a response for training frequency questions
 */
export const getTrainingFrequencyResponse = (topic: string): string => {
  if (topic.includes('fall protection')) {
    return `**Fall Protection Training Frequency Requirements**

OSHA requires fall protection refresher training:

1. **Initial comprehensive training** - Before employee exposure to fall hazards

2. **Refresher training required when**:
   - Workplace changes render previous training obsolete
   - Fall protection equipment or systems change
   - Employee demonstrates inadequate knowledge or use
   - After any fall-related incident

3. **Best practice** - Annual refresher training even if not specifically required

4. **Documentation needed**:
   - Training dates and content covered
   - Trainer qualifications
   - Employee verification of understanding
   - Hands-on competency demonstration

Would you like a downloadable fall protection training documentation template?

**Related questions you might ask:**
- What topics must be covered in fall protection training?
- How do I document competency verification for fall protection?
- Can you provide a fall protection inspection checklist?`;
  } else if (topic.includes('lockout') || topic.includes('tagout')) {
    return `**Lockout/Tagout Training Frequency Requirements**

For Lockout/Tagout procedures, OSHA requires:

1. **Initial training** - Before employee performs service/maintenance

2. **Retraining required when**:
   - Job assignments change
   - Machines, equipment or processes change
   - New hazards are introduced
   - Periodic inspection reveals inadequate employee knowledge
   - After any near-miss or incident involving energy control

3. **Standard practice** - Annual refresher training

4. **Documentation requirements**:
   - Training dates and specific content
   - Employee demonstration of procedures
   - Trainer qualifications
   - Equipment covered in the training

Would you like a downloadable lockout/tagout training program template?

**Related questions you might ask:**
- What should be included in lockout/tagout procedures?
- How do I perform a periodic inspection of the lockout/tagout program?
- Can you provide a lockout/tagout audit checklist?`;
  } else if (topic.includes('hazard communication') || topic.includes('hazcom')) {
    return `**Hazard Communication Training Frequency Guidelines**

1. **Initial training** - Before exposure to hazardous chemicals

2. **Refresher training required when**:
   - New chemical hazards are introduced
   - Process or procedure changes affect exposure
   - GHS labeling or SDS format changes
   - Employee knowledge appears inadequate

3. **Best practice** - Annual refresher training

4. **Documentation requirements**:
   - Training content covered (chemicals, hazards, protective measures)
   - GHS labeling and SDS review
   - Methods to detect presence of hazardous chemicals
   - Employee verification of understanding

Would you like a downloadable hazard communication training documentation template?

**Related questions you might ask:**
- What are the elements of a compliant hazard communication program?
- How should Safety Data Sheets be organized and accessed?
- Can you provide a chemical inventory template?`;
  }
  
  // Generic training answer if no specific topic
  return `**Safety Training Frequency Best Practices**

1. **Initial training**:
   - Required before employee exposure to workplace hazards
   - Must cover all applicable OSHA standards for the role
   - Needs to be comprehensive and job-specific

2. **Refresher training** typically required:
   - Annually for most critical safety topics
   - When processes, equipment, or materials change
   - After incidents or near-misses
   - When observations indicate knowledge gaps
   - When regulations are updated

3. **Documentation best practices**:
   - Maintain a training matrix by position
   - Track completion dates and schedule upcoming refreshers
   - Document content, duration, and instructor qualifications
   - Include employee verification of understanding

Would you like a downloadable training frequency reference guide by topic?

**Related questions you might ask:**
- How do I create a comprehensive safety training program?
- What are the most critical safety topics for annual refresher training?
- Can you provide a training assessment quiz template?`;
};
