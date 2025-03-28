
/**
 * Provide practical best practices for common safety documentation questions
 * with improved formatting and organizational structure
 */
export const getPracticalSafetyGuidance = (topic: string): string | null => {
  const practicalGuidance: Record<string, string> = {
    'inspect': `**Equipment Inspection Documentation Best Practices:**

1. Create standardized inspection forms for each equipment type
2. Include these essential elements:
   - Date and time of inspection
   - Inspector name and qualification/certification
   - Equipment identifiers (serial number, asset tag)
   - Pass/fail for each inspection point
   - Details on any deficiencies found
   - Corrective actions taken or needed
3. Maintain records by:
   - Organizing chronologically and by equipment type
   - Keeping accessible but secure documentation
   - Retaining records for at least 5 years
4. Use digital tools to streamline documentation and reporting

Would you like a downloadable inspection checklist template that you can customize for your workplace?`,

    'training': `**Safety Training Documentation System:**

1. Maintain a master training matrix showing:
   - Required training by job position
   - Frequency of refresher requirements
   - Certification/recertification dates
   - Regulatory standards covered

2. For each training session, document:
   - Date, location, and duration
   - Instructor name and qualifications
   - Topics covered and materials used
   - Attendee names with signatures
   - Test scores or competency verification

3. Best practices for record management:
   - Track certification expiration dates
   - Set up automated reminders for refreshers
   - Store records for employment duration plus 3 years
   - Make records accessible for regulatory inspection

Would you like me to provide a downloadable training matrix template that you can adapt for your team?`,

    'audit': `**OSHA Inspection Preparation Guide:**

1. Documentation preparation:
   - Organize written safety programs and procedures
   - Compile training records with verification signatures
   - Gather equipment inspection logs
   - Collect incident reports and investigations
   - Assemble hazard assessments and corrective actions

2. Facility preparation:
   - Conduct a thorough self-inspection using OSHA checklists
   - Address all identified hazards immediately
   - Ensure required signage and labels are in place
   - Verify emergency equipment is accessible and functional

3. Staff preparation:
   - Train employees on what to expect during inspection
   - Review their rights and responsibilities
   - Designate staff for specific roles during inspection

Would you like a pre-audit checklist template that you can use to prepare your workplace for inspection?`,

    'incident': `**Incident and Near-Miss Reporting System:**

1. Program components:
   - Simple, accessible reporting forms (paper and digital)
   - Clear definitions of incidents vs. near-misses
   - Non-blame culture focused on prevention
   - Regular review process to identify trends

2. Essential information to collect:
   - Date, time, and specific location
   - People involved and witnesses
   - Detailed description of what happened
   - Contributing factors and root causes
   - Potential severity (if outcome had been worse)
   - Immediate and long-term corrective actions

3. Program management:
   - Review incidents weekly to identify patterns
   - Track corrective actions to completion
   - Share learnings (anonymized) across organization
   - Calculate metrics to measure program effectiveness

Would you like a downloadable near-miss reporting template or incident investigation form?`
  };

  // Second part of practical guidance topics
  const additionalGuidance: Record<string, string> = {
    'hazard': `**Hazard Assessment Documentation Framework:**

1. Standard assessment format:
   - Area/process being assessed
   - Assessment date and team members
   - Hazard identification with risk ratings
   - Current controls evaluation
   - Recommended additional controls
   - Action items with responsibilities and due dates

2. Assessment best practices:
   - Include photographs of hazards when possible
   - Involve employees from the area being assessed
   - Use a consistent risk ranking methodology
   - Review assessments at least annually
   - Update after process or equipment changes

3. Documentation management:
   - Maintain records of completed assessments
   - Track corrective actions to completion
   - Make assessments accessible to affected employees
   - Use findings to update training materials

Would you like a sample hazard assessment template with risk ranking guidelines?`,

    'ppe': `**Personal Protective Equipment (PPE) Management System:**

1. Assessment and selection:
   - Document hazard assessments justifying PPE selection
   - Select PPE based on specific workplace hazards
   - Consider comfort, fit, and compatibility factors
   - Maintain certification documentation from manufacturers

2. Inventory and distribution tracking:
   - Types and models of PPE available
   - Sizes and quantities in inventory
   - Assignment records with employee signatures
   - Expiration dates where applicable

3. Training program elements:
   - Selection, fitting, and adjustment procedures
   - Proper use and limitations of equipment
   - Maintenance, cleaning, and storage requirements
   - Inspection and replacement criteria
   - Documentation of training with signatures

Would you like a PPE assessment template or employee PPE assignment form?`,

    'forklift': `**Forklift Operator Certification Tracking System:**

1. Operator qualification documentation:
   - Initial training completion with date and instructor
   - Skills evaluation results with evaluator signature
   - Written test scores with passing threshold
   - Specific equipment models employee is certified on
   - Certification expiration date (3 years maximum)

2. Recertification requirements:
   - Refresher training (every 3 years minimum)
   - Evaluation after any accident or near-miss
   - Assessment when new equipment is introduced
   - Documentation of remedial training if needed

3. Daily inspection records:
   - Pre-shift inspection checklist completion
   - Identified issues and maintenance requests
   - Equipment-specific inspection points
   - Operator verification signature

Would you like a downloadable forklift certification tracking spreadsheet or operator daily checklist?`,

    'matrix': `**Comprehensive Safety Training Matrix:**

1. Matrix structure and elements:
   - Job positions/titles listed vertically
   - Required training topics listed horizontally
   - Training frequency indicated in each cell
   - Regulatory citation reference for each requirement
   - Visual status indicators (color-coding)

2. Training status tracking:
   - Completion dates for each employee
   - Expiration/renewal dates clearly marked
   - Certification levels where applicable
   - Training method used (classroom, online, etc.)
   - Instructor/vendor information

3. Matrix management:
   - Quarterly review for compliance status
   - Updates when regulations or job duties change
   - Integration with HR systems for personnel changes
   - Automated notifications for upcoming expirations

Would you like a downloadable training matrix template customized for warehouse operations that you can modify for your team?`,

    'calendar': `**Safety Training Calendar Development:**

1. Calendar structure:
   - Annual overview with monthly training focus
   - Regular recurring training sessions
   - Certification renewal deadlines
   - Compliance audit/inspection dates
   - Seasonal safety emphasis topics

2. Scheduling best practices:
   - Distribute training throughout the year
   - Coordinate with production/operations schedules
   - Plan refresher training before expiration dates
   - Allow adequate time for documentation
   - Include mix of required and optional topics

3. Calendar management:
   - Assign responsible party for each training topic
   - Track attendance and make-up sessions
   - Document changes and cancellations
   - Review quarterly for needed adjustments
   - Evaluate effectiveness annually

Would you like me to provide a sample annual safety training calendar template that you can customize?`
  };

  // Merge the guidance objects
  const allGuidance = { ...practicalGuidance, ...additionalGuidance };

  // Check for topic matches
  for (const [key, guidance] of Object.entries(allGuidance)) {
    if (topic.toLowerCase().includes(key)) {
      return guidance;
    }
  }

  // Get specialized fallbacks from the dedicated function
  const specializedFallback = getSpecializedFallbacks(topic);
  if (specializedFallback) {
    return specializedFallback;
  }

  return null;
};

/**
 * Import specialized fallbacks to avoid circular dependencies
 */
import { getSpecializedFallbacks } from './specializedFallbacks';
