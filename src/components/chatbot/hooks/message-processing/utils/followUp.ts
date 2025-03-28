
/**
 * Check if the message appears to be a follow-up question
 */
export const isFollowUpQuestion = (query: string, previousUserMessages: string[]): boolean => {
  // Enhanced detection of follow-up questions with more patterns
  if (previousUserMessages.length === 0) return false;
  
  const followUpIndicators = [
    'what about', 'how about', 'and', 'but', 'so', 'then', 'what if',
    'would', 'could', 'should', 'why', 'when', 'is it', 'are they', 
    'do i need', 'is there', 'what else', 'anything else', 'how often', 
    'do we need', 'what\'s the', 'what is the', 'how much', 'how do i',
    'how should i', 'what should', 'tell me more', 'more info'
  ];
  
  const isShortQuery = query.length < 20;
  const hasFollowUpPhrase = followUpIndicators.some(indicator => 
    query.toLowerCase().includes(indicator)
  );
  const lacksContext = !query.includes('?') && query.split(' ').length < 6;
  
  return previousUserMessages.length > 0 && (isShortQuery || hasFollowUpPhrase || lacksContext);
};

/**
 * Handle follow-up questions by incorporating previous context and practical advice
 */
export const handleFollowUpQuestion = (recentTopics: string[], query: string, previousMessages: any[]): string | null => {
  if (recentTopics.length === 0) return null;
  
  // Find the most recent non-user message to reference
  const previousResponses = previousMessages
    .filter(msg => msg.role === 'assistant')
    .map(msg => msg.content)
    .slice(-2);
  
  if (previousResponses.length === 0) return null;
  
  // Get the most recent topic discussed
  const mostRecentTopic = recentTopics[0];
  
  // Handle specific practical questions about documentation, processes, etc.
  if (query.toLowerCase().includes('how do i') || 
      query.toLowerCase().includes('what should') || 
      query.toLowerCase().includes('best way')) {
    
    // Documentation-related questions
    if (query.toLowerCase().includes('document') || query.toLowerCase().includes('record')) {
      return `**Documentation Best Practices**

Great question about documentation. Here's what safety professionals recommend:

1. Create standardized forms with consistent fields:
   - Date and time
   - Equipment/location identifiers
   - Inspector/reviewer name and signature
   - Specific findings with details
   - Corrective actions needed

2. Establish a robust documentation system:
   - Implement both digital and physical record-keeping
   - Organize by type, date, and location/equipment
   - Set minimum retention periods (3-5 years minimum)
   - Create regular review schedules
   
3. Make records accessible and usable:
   - Ensure appropriate personnel can access records
   - Consider QR codes linking to digital inspection history
   - Create dashboard reports to identify trends
   - Use documentation for continuous improvement

Would you like me to provide a downloadable documentation template for this specific topic?`;
    }
    
    // Training record questions
    if (query.toLowerCase().includes('training') && (query.toLowerCase().includes('record') || query.toLowerCase().includes('track'))) {
      return `**Safety Training Documentation System**

For tracking safety training effectively, follow these industry best practices:

1. Create a master training matrix showing:
   - Required training by job role
   - Frequency of refresher training needed
   - Current status for each employee
   - Regulatory standards addressed
   
2. For each training session, document:
   - Date, time, duration, and location
   - Instructor name and qualifications
   - Topics covered with reference to standards
   - Training materials used (keep copies)
   - Attendance with employee signatures
   - Test scores or competency verification
   
3. Manage training records effectively:
   - Set up automated notifications for expiring certifications
   - Store records securely for duration of employment plus 3 years
   - Make records easily accessible for regulatory inspection
   - Conduct periodic audits of training documentation

Would you like me to share a downloadable training record template that you can customize for your workplace?`;
    }
    
    // Forklift training records question
    if (query.toLowerCase().includes('forklift') && 
        (query.toLowerCase().includes('certification') || 
         query.toLowerCase().includes('training') || 
         query.toLowerCase().includes('record'))) {
      return `**Forklift Operator Certification Tracking System**

For tracking forklift operator certifications effectively:

1. Required documentation elements:
   - Operator's name and employee ID
   - Date of training and certification
   - Expiration date (3 years from certification)
   - Specific equipment types/models qualified to operate
   - Name and signature of evaluator/trainer
   - Written test scores (with minimum passing threshold)
   - Practical evaluation checklist with performance ratings
   
2. Certification management best practices:
   - Maintain both digital and physical records
   - Set automatic reminders 30/60/90 days before expiration
   - Document refresher training and evaluations
   - Note any performance issues or incidents
   - Track specific attachments operators are certified to use
   
3. Required evaluation elements:
   - Pre-operation inspection procedure
   - Operating skills in typical workplace conditions
   - Load handling capabilities
   - Understanding of stability principles
   - Knowledge of workplace-specific hazards

Would you like a downloadable forklift certification tracking spreadsheet template that you can customize for your operators?`;
    }
    
    // Training matrix question
    if (query.toLowerCase().includes('matrix') && query.toLowerCase().includes('training')) {
      return `**Safety Training Matrix Development Guide**

To create an effective training matrix for your team:

1. Matrix structure and components:
   - List all job positions/titles down the left column
   - List all required training topics across the top row
   - In each cell, indicate:
     * Required (Yes/No)
     * Frequency (Initial, Annual, Biennial, etc.)
     * Regulatory basis (OSHA standard reference)
   
2. Essential training categories to include:
   - Required OSHA training (HazCom, PPE, etc.)
   - Equipment-specific training
   - Emergency procedures
   - Job-specific safety procedures
   - Leadership safety responsibilities (for supervisors)
   
3. Matrix management best practices:
   - Color-code by training status (current, upcoming, overdue)
   - Include employee-specific completion dates
   - Track method of training (classroom, online, OJT)
   - Note trainer/vendor for each completed session
   - Review quarterly to identify gaps and plan sessions

Would you like me to provide a downloadable training matrix template that you can customize for your warehouse operations?`;
    }
    
    // Training calendar questions
    if (query.toLowerCase().includes('calendar') && 
        (query.toLowerCase().includes('training') || query.toLowerCase().includes('schedule'))) {
      return `**Annual Safety Training Calendar Development**

To create an effective safety training calendar:

1. Strategic planning considerations:
   - Distribute training throughout the year to avoid overload
   - Schedule seasonal topics at appropriate times
   - Coordinate with production/operations schedules
   - Plan refresher training before certification expirations
   - Include mix of required and enhancement topics
   
2. Monthly planning structure:
   - Assign a primary safety focus for each month
   - Schedule specific training dates with rooms/instructors
   - Include multiple session options for shift coverage
   - Block preparation time for instructors and materials
   - Add documentation processing time after sessions
   
3. Calendar management practices:
   - Review quarterly for adjustments and additions
   - Track attendance and schedule make-up sessions
   - Document reasons for any postponed sessions
   - Evaluate training effectiveness to improve future sessions
   - Adjust based on incident trends or regulatory changes

Would you like me to provide a downloadable annual safety training calendar template that you can customize for your organization?`;
    }
    
    // Audit preparation questions
    if (query.toLowerCase().includes('audit') || 
        query.toLowerCase().includes('prepare') || 
        query.toLowerCase().includes('inspection')) {
      return `**OSHA Inspection Preparation Guide**

To prepare for a safety audit or OSHA inspection, follow these steps:

1. Documentation preparation:
   - Organize all written safety programs and ensure they're current
   - Gather and organize key documentation:
     * Training records with verification signatures
     * Equipment inspection and maintenance logs
     * Incident reports and investigations
     * Hazard assessments and corrective actions
     * Safety committee minutes
     * Safety data sheets (SDS)
   
2. Facility preparation:
   - Conduct a pre-audit self-inspection using relevant OSHA checklists
   - Address any identified hazards or non-compliance issues
   - Verify all required signage and labels are properly displayed
   - Ensure emergency equipment is accessible and functional
   - Check that PPE is available and properly maintained
   
3. Personnel preparation:
   - Brief employees on the inspection process and their rights
   - Prepare for document requests and interview questions
   - Designate team members for specific roles during the inspection
   - Review recent citations in your industry to identify focus areas
   - Establish a communication protocol during the inspection

Would you like a downloadable pre-audit checklist that you can use to systematically prepare for an inspection?`;
    }
    
    // Near-miss tracking questions
    if (query.toLowerCase().includes('near miss') || query.toLowerCase().includes('incident') || query.toLowerCase().includes('track')) {
      return `**Near-Miss and Incident Tracking System**

For effective near-miss and incident tracking, implement these best practices:

1. Reporting system design:
   - Create simple, accessible forms (paper and digital)
   - Make reporting quick (under 5 minutes to complete)
   - Ensure anonymous reporting option is available
   - Develop mobile-friendly reporting tools
   - Establish clear definitions of incidents vs. near-misses
   
2. Essential information to collect:
   - Date, time, and precise location
   - People involved and witnesses (optional for near-misses)
   - Detailed description of what happened
   - Contributing factors and potential root causes
   - Potential severity if outcome had been worse
   - Immediate actions taken after event
   
3. Program management best practices:
   - Establish a no-blame culture focused on prevention
   - Review reports weekly to identify trends and patterns
   - Track corrective actions to completion with due dates
   - Share learnings across the organization (anonymized)
   - Calculate metrics to evaluate program effectiveness
   - Recognize and reward active reporting participation

Would you like a downloadable template for tracking near-misses and incidents in your workplace?`;
    }
  }
  
  // Handle specific common follow-up patterns
  if (query.toLowerCase().includes('how often')) {
    // Inspection frequency questions
    if (query.toLowerCase().includes('inspect')) {
      for (const topic of recentTopics) {
        if (topic.includes('fall protection')) {
          return "**Fall Protection Equipment Inspection Requirements**\n\nFor fall protection equipment, OSHA requires:\n\n1. **User inspection before each use** - Workers must visually inspect all components\n\n2. **Formal inspections by a competent person** - At least annually, documented with equipment ID, inspector name, date, and findings\n\n3. **Post-event inspection** - After any fall event, equipment must be immediately removed from service and thoroughly inspected\n\n4. **Documentation requirements** - Keep inspection records with dates, inspector names, equipment IDs, and results for the life of the equipment\n\nWould you like a downloadable fall protection inspection checklist template?";
        } else if (topic.includes('ppe') || topic.includes('protective')) {
          return "**PPE Inspection Frequency Guidelines**\n\nPPE inspection frequencies vary by equipment type:\n\n1. **General rule** - All PPE should be inspected before each use\n\n2. **Respirators** - Inspect before and after each use, plus monthly when in storage\n\n3. **Hard hats** - Daily visual inspection; replace after any impact\n\n4. **Safety glasses** - Before each use; replace when scratched or damaged\n\n5. **Gloves** - Before each use; watch for tears, punctures, degradation\n\n6. **Fall protection** - Before each use and annual formal inspection\n\nAll formal inspections should be documented with standardized forms including equipment ID, inspector name, date, and findings.\n\nWould you like a downloadable PPE inspection tracking template?";
        } else if (topic.includes('fire') || topic.includes('extinguisher')) {
          return "**Fire Extinguisher Inspection Schedule**\n\n1. **Monthly visual inspections**\n   - Check pressure gauge is in operating range\n   - Verify extinguisher is in designated location\n   - Ensure access is not blocked\n   - Check for visible damage or tampering\n   - Document with inspector initials and date\n\n2. **Annual maintenance inspection**\n   - Must be performed by certified professional\n   - Includes internal examination and recharging if needed\n   - Requires detailed documentation and tagging\n\n3. **Hydrostatic testing**\n   - Required every 5-12 years depending on extinguisher type\n   - Must be performed by certified testing service\n   - Requires permanent marking of test date\n\nWould you like a downloadable fire extinguisher inspection log template?";
        }
      }
      // Generic inspection answer if no specific topic
      return "**Equipment Inspection Frequency Guidelines**\n\n1. **Before each use** - Operators should visually inspect critical safety equipment\n\n2. **Formal documented inspections** - Schedule based on:\n   - Manufacturer recommendations\n   - Regulatory requirements\n   - Equipment criticality and risk\n   - Usage frequency and conditions\n\n3. **Typical inspection frequencies**:\n   - Daily: High-risk or critical safety equipment\n   - Weekly: Frequently used equipment\n   - Monthly: General facility safety equipment\n   - Quarterly/Annually: Backup or emergency equipment\n\n4. **Documentation requirements**:\n   - Date and time of inspection\n   - Inspector name and qualification\n   - Equipment identifier/serial number\n   - Pass/fail for each inspection point\n   - Corrective actions for deficiencies\n\nWould you like a downloadable equipment inspection scheduling template?";
    }
    
    // Training frequency questions
    if (query.toLowerCase().includes('train') || query.toLowerCase().includes('refresher')) {
      for (const topic of recentTopics) {
        if (topic.includes('fall protection')) {
          return "**Fall Protection Training Frequency Requirements**\n\nOSHA requires fall protection refresher training:\n\n1. **Initial comprehensive training** - Before employee exposure to fall hazards\n\n2. **Refresher training required when**:\n   - Workplace changes render previous training obsolete\n   - Fall protection equipment or systems change\n   - Employee demonstrates inadequate knowledge or use\n   - After any fall-related incident\n\n3. **Best practice** - Annual refresher training even if not specifically required\n\n4. **Documentation needed**:\n   - Training dates and content covered\n   - Trainer qualifications\n   - Employee verification of understanding\n   - Hands-on competency demonstration\n\nWould you like a downloadable fall protection training documentation template?";
        } else if (topic.includes('lockout') || topic.includes('tagout')) {
          return "**Lockout/Tagout Training Frequency Requirements**\n\nFor Lockout/Tagout procedures, OSHA requires:\n\n1. **Initial training** - Before employee performs service/maintenance\n\n2. **Retraining required when**:\n   - Job assignments change\n   - Machines, equipment or processes change\n   - New hazards are introduced\n   - Periodic inspection reveals inadequate employee knowledge\n   - After any near-miss or incident involving energy control\n\n3. **Standard practice** - Annual refresher training\n\n4. **Documentation requirements**:\n   - Training dates and specific content\n   - Employee demonstration of procedures\n   - Trainer qualifications\n   - Equipment covered in the training\n\nWould you like a downloadable lockout/tagout training program template?";
        } else if (topic.includes('hazard communication') || topic.includes('hazcom')) {
          return "**Hazard Communication Training Frequency Guidelines**\n\n1. **Initial training** - Before exposure to hazardous chemicals\n\n2. **Refresher training required when**:\n   - New chemical hazards are introduced\n   - Process or procedure changes affect exposure\n   - GHS labeling or SDS format changes\n   - Employee knowledge appears inadequate\n\n3. **Best practice** - Annual refresher training\n\n4. **Documentation requirements**:\n   - Training content covered (chemicals, hazards, protective measures)\n   - GHS labeling and SDS review\n   - Methods to detect presence of hazardous chemicals\n   - Employee verification of understanding\n\nWould you like a downloadable hazard communication training documentation template?";
        }
      }
      // Generic training answer if no specific topic
      return "**Safety Training Frequency Best Practices**\n\n1. **Initial training**:\n   - Required before employee exposure to workplace hazards\n   - Must cover all applicable OSHA standards for the role\n   - Needs to be comprehensive and job-specific\n\n2. **Refresher training** typically required:\n   - Annually for most critical safety topics\n   - When processes, equipment, or materials change\n   - After incidents or near-misses\n   - When observations indicate knowledge gaps\n   - When regulations are updated\n\n3. **Documentation best practices**:\n   - Maintain a training matrix by position\n   - Track completion dates and schedule upcoming refreshers\n   - Document content, duration, and instructor qualifications\n   - Include employee verification of understanding\n\nWould you like a downloadable training frequency reference guide by topic?";
    }
  }
  
  // Check if query is about minimum height requirement
  if (query.toLowerCase().includes('height') || 
      (query.toLowerCase().includes('minimum') && 
       (query.toLowerCase().includes('fall') || recentTopics.includes('fall protection')))) {
    return "**Minimum Height Requirements for Fall Protection**\n\nOSHA specifies different height thresholds by industry:\n\n1. **Construction industry**: 6 feet or more above a lower level (29 CFR 1926.501)\n\n2. **General industry**: 4 feet or more above a lower level (29 CFR 1910.28)\n\n3. **Shipyards**: 5 feet or more above a lower level\n\n4. **Longshoring operations**: 8 feet or more above a lower level\n\n5. **Special case**: Any height when working above dangerous equipment\n\nWhen implementing your fall protection program, document the specific height thresholds applicable to your workplace and ensure all employees are trained on these requirements.\n\nWould you like a downloadable fall protection planning guide for your industry?";
  }
  
  // Check if any topic from the conversation matches our regulations
  for (const topic of recentTopics) {
    for (const regulation of safetyRegulationResponses) {
      if (regulation.keywords.some(keyword => topic.toLowerCase().includes(keyword.toLowerCase()))) {
        // Create a conversational response that builds on previous context and adds practical advice
        const openingPhrases = [
          `Building on what we discussed about ${topic}, `,
          `To add to our conversation about ${topic}, `,
          `Regarding ${topic} that we were discussing, `
        ];
        
        const opening = openingPhrases[Math.floor(Math.random() * openingPhrases.length)];
        
        // Create a shortened, conversational version of the regulatory response with practical advice
        let response = regulation.response
          .replace(/According to OSHA|OSHA standard|OSHA regulation/gi, 'the safety guideline')
          .replace(/\([0-9]+ CFR [^\)]+\)/g, ''); // Remove CFR references
        
        // Break into sentences and select just a few relevant ones
        const sentences = response.split(/\.\s+/);
        const simplifiedResponse = sentences.slice(0, 2).join('. ') + '.';
        
        const practicalAdvice = [
          ` In practice, most companies address this by creating standardized procedures, training employees thoroughly, and documenting compliance efforts.`,
          ` To implement this effectively, focus on clear documentation, regular training, and consistent enforcement of these requirements.`,
          ` The most successful safety programs make this practical by integrating these requirements into daily operations and regular inspections.`
        ];
        
        const advice = practicalAdvice[Math.floor(Math.random() * practicalAdvice.length)];
        
        const closingPhrases = [
          ` Would you like a downloadable implementation checklist for this requirement?`,
          ` Would you like to see a practical example of how to document compliance?`,
          ` Would you like some specific steps for implementing this in your workplace?`
        ];
        
        const closing = closingPhrases[Math.floor(Math.random() * closingPhrases.length)];
        
        return opening + simplifiedResponse + advice + closing;
      }
    }
  }
  
  return null;
};

// Import from the proper location
import { safetyRegulationResponses } from '../../../data/safetyRegulationData';
