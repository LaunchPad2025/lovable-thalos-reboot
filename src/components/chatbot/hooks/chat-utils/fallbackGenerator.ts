
/**
 * Generate an improved fallback response that's helpful even when API fails
 */
export const generateImprovedFallback = (topic: string, query: string): string => {
  // Acknowledgment
  const acknowledgment = `You've asked about ${topic}, which is an important safety consideration. `;
  
  // Mini-response based on topic
  let miniResponse = '';
  
  if (topic === 'chemical safety') {
    miniResponse = `**Chemical Safety Essentials:**

1. **Documentation Requirements:**
   - Maintain safety data sheets (SDS) for all chemicals
   - Create a chemical inventory with locations and quantities
   - Develop written hazard communication program

2. **Storage Best Practices:**
   - Separate incompatible chemicals
   - Ensure proper ventilation
   - Use appropriate containment for spills
   - Label all containers clearly

3. **Training Components:**
   - Hazard identification and understanding labels
   - Proper handling procedures and PPE requirements
   - Emergency response for spills or exposure`;
  } 
  else if (topic === 'hazard assessment' || topic === 'risk assessment' || query.includes('form')) {
    miniResponse = `**Hazard Assessment Form Structure:**

1. **Basic Information Section:**
   - Assessment date and location
   - Team members conducting assessment
   - Process/equipment being evaluated

2. **Hazard Identification:**
   - Task breakdown into steps
   - Potential hazards for each step
   - Risk rating (severity × probability)
   - Existing controls in place

3. **Action Planning:**
   - Additional controls needed
   - Responsible persons
   - Implementation timeline
   - Follow-up verification`;
  }
  else if (topic.includes('confined space') || topic.includes('checklist')) {
    miniResponse = `**Safety Checklist Framework:**

1. **Pre-Task Verification:**
   - Required permits and authorizations
   - Equipment inspection status
   - Environmental conditions check
   - Communication system testing

2. **Personnel Readiness:**
   - Required training verification
   - PPE inspection and availability
   - Role assignments and responsibilities
   - Emergency response preparedness

3. **Post-Completion Actions:**
   - Area restoration and cleanup
   - Equipment return and maintenance
   - Documentation completion
   - Lessons learned discussion`;
  }
  else if (topic.includes('ppe') || topic.includes('welding')) {
    miniResponse = `**PPE Selection Guide:**

1. **Hazard Evaluation:**
   - Identify potential exposures
   - Assess severity and likelihood
   - Document assessment findings
   - Review applicable regulations

2. **Equipment Selection:**
   - Match PPE to specific hazards
   - Consider comfort and usability
   - Ensure proper sizing and fit
   - Verify certification standards

3. **Implementation Program:**
   - User training requirements
   - Inspection procedures
   - Maintenance schedules
   - Replacement criteria`;
  }
  else {
    miniResponse = `**Safety Program Framework:**

1. **Documentation Components:**
   - Written safety policies and procedures
   - Hazard identification process
   - Training records and verification
   - Incident reporting system

2. **Implementation Elements:**
   - Clear roles and responsibilities
   - Regular safety meetings
   - Inspection and audit schedule
   - Continuous improvement process

3. **Performance Measurement:**
   - Leading and lagging indicators
   - Regular program evaluation
   - Employee engagement metrics
   - Corrective action tracking`;
  }
  
  // Template offer and branching options
  const templateOffer = "\n\nWould you like a downloadable template for this that you can customize for your workplace?";
  const branchingOption = `\n\nCan I help you with a specific aspect of ${topic}, such as training requirements, documentation, or implementation strategies?`;
  
  return acknowledgment + miniResponse + templateOffer + branchingOption;
};
