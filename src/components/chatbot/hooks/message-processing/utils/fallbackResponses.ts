
/**
 * Generate a practical, helpful fallback response when no specific match is found
 */
export const getDefaultResponse = (): string => {
  const openings = [
    "Thanks for your question about workplace safety. ",
    "That's a great safety question. ",
    "I appreciate you asking about workplace safety. "
  ];
  
  const middles = [
    "While I don't have the full regulation text on that, here's what most OSHA-compliant organizations do: ",
    "I don't have the specific regulatory citation, but here's what safety professionals typically recommend: ",
    "Based on general OSHA compliance practices, here's what I'd suggest: "
  ];
  
  // Updated to provide practical advice instead of redirecting
  const practicalAdvice = [
    "Document everything thoroughly with dates, names, and specifics. Create standardized forms for consistency and maintain records for at least 5 years. Regular audits of your documentation can help identify gaps before an inspection occurs.",
    "Implement a systematic approach with clear responsibilities, regular training, and thorough documentation. Digital safety management systems can help streamline these processes and ensure nothing falls through the cracks.",
    "Develop written procedures that are easy to understand, train employees thoroughly, and audit your processes regularly. Consistency is key to maintaining a strong safety culture and compliance program."
  ];
  
  const closings = [
    "\n\nWould you like me to suggest some specific steps for your situation?",
    "\n\nCan I help you develop a specific plan for implementing this?",
    "\n\nIs there a particular aspect of this you'd like more detailed guidance on?"
  ];
  
  const opening = openings[Math.floor(Math.random() * openings.length)];
  const middle = middles[Math.floor(Math.random() * middles.length)];
  const advice = practicalAdvice[Math.floor(Math.random() * practicalAdvice.length)];
  const closing = closings[Math.floor(Math.random() * closings.length)];
  
  return opening + middle + advice + closing;
};

/**
 * Provide practical best practices for common safety documentation questions
 */
export const getPracticalSafetyGuidance = (topic: string): string | null => {
  const practicalGuidance: Record<string, string> = {
    'inspect': `Based on OSHA best practices, here's how to document inspections effectively:

1. Create standardized inspection forms for each equipment type
2. Include date, time, inspector name, and equipment identifiers
3. Document pass/fail for each inspection point with details on deficiencies
4. Note any corrective actions taken or needed
5. Maintain records chronologically and by equipment 
6. Keep inspection records for at least 5 years (or as specified by your industry)
7. Use digital tools to streamline documentation and reporting

Would you like a sample inspection checklist format?`,

    'training': `Here's how safety professionals typically handle training documentation:

1. Maintain a master training matrix showing requirements by position
2. For each training session, document:
   - Date, location, and duration
   - Topics covered and materials used
   - Instructor name and qualifications
   - Attendee names and signatures
   - Test scores or competency verification
3. Keep records of certifications with expiration dates
4. Set up automated reminders for refresher training
5. Store records for length of employment plus 3 years

Would you like help creating a training documentation system?`,

    'audit': `Here's how to prepare for an OSHA inspection or safety audit:

1. Conduct regular self-inspections using OSHA checklists
2. Maintain organized documentation of:
   - Written safety programs and procedures
   - Training records with verification of understanding
   - Equipment inspection logs
   - Incident reports and investigations
   - Hazard assessments and corrective actions
3. Address all known hazards promptly
4. Train employees on what to expect during an inspection
5. Prepare an inspection kit with key documents

Would you like a pre-audit checklist for your workplace?`,

    'incident': `For effective incident and near-miss reporting, safety professionals recommend:

1. Create a simple, accessible reporting system (paper and digital)
2. Collect key details:
   - Date, time, and location
   - People involved or witnesses
   - Description of what happened
   - Contributing factors
   - Potential outcomes (if it were worse)
3. Establish a no-blame culture to encourage reporting
4. Review incidents weekly to identify trends
5. Document corrective actions and follow up
6. Share learnings (anonymized) with all employees

Would you like a template for near-miss reporting?`,

    'hazard': `For effective hazard assessment documentation, follow these best practices:

1. Use a standardized form that includes:
   - Area/process being assessed
   - Date and assessor names
   - Hazards identified with risk ratings
   - Current controls in place
   - Recommended additional controls
   - Action items with responsible persons and due dates
2. Include photos when possible
3. Review assessments at least annually
4. Involve employees from the area being assessed
5. Maintain records of completed corrective actions

Would you like a sample hazard assessment format?`,

    'ppe': `For proper PPE management and documentation, safety professionals recommend:

1. Document your hazard assessment justifying PPE selection
2. Maintain inventory records with:
   - Types and models of PPE available
   - Sizes and quantities
   - Expiration dates where applicable
3. Create a PPE training program covering:
   - Selection, fitting, and adjustment
   - Proper use and limitations
   - Maintenance and replacement criteria
4. Document employee PPE assignments with signatures
5. Establish inspection schedules for critical PPE

Would you like a PPE assessment template?`
  };

  // Check for topic matches
  for (const [key, guidance] of Object.entries(practicalGuidance)) {
    if (topic.toLowerCase().includes(key)) {
      return guidance;
    }
  }

  return null;
};

