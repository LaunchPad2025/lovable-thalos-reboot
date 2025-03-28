
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
      return `Great question about documentation. Here's what safety professionals recommend:

1. Use standardized forms with consistent fields (date, equipment ID, inspector name, findings)
2. Implement both digital and physical documentation systems for redundancy
3. Organize records by type, date, and location/equipment
4. Establish minimum retention periods (typically 3-5 years, or as required by specific regulations)
5. Create a system for regular review and verification of documentation
6. Make documentation easily accessible to appropriate personnel
7. Consider using QR codes on equipment linking to digital inspection records

Would you like me to provide a specific documentation template for this topic?`;
    }
    
    // Training record questions
    if (query.toLowerCase().includes('training') && (query.toLowerCase().includes('record') || query.toLowerCase().includes('track'))) {
      return `For tracking safety training effectively, follow these industry best practices:

1. Create a master training matrix showing:
   - Required training by job role
   - Frequency of refresher training
   - Current status for each employee
   
2. For each training session, document:
   - Date, time, duration, and location
   - Instructor name and qualifications
   - Topics covered with reference to standards
   - Training materials used (keep copies)
   - Attendance with employee signatures
   - Test scores or competency verification
   
3. Set up automated notifications for expiring certifications
4. Store records securely but accessibly for the duration of employment plus 3 years
5. Conduct periodic audits of training records

Would you like me to share a sample training record template?`;
    }
    
    // Audit preparation questions
    if (query.toLowerCase().includes('audit') || 
        query.toLowerCase().includes('prepare') || 
        query.toLowerCase().includes('inspection')) {
      return `To prepare for a safety audit or OSHA inspection, follow these steps:

1. Organize your written safety programs and ensure they're current
2. Gather and organize documentation:
   - Training records
   - Inspection logs
   - Incident reports and investigations
   - Equipment maintenance records
   - Hazard assessments
   - Corrective action records
   
3. Conduct a pre-audit self-inspection using relevant OSHA checklists
4. Address any identified hazards or non-compliance issues
5. Brief employees on the inspection process and their rights
6. Prepare an inspection kit with frequently requested documents
7. Designate team members for specific roles during the inspection

Would you like a comprehensive pre-audit checklist?`;
    }
    
    // Near-miss tracking questions
    if (query.toLowerCase().includes('near miss') || query.toLowerCase().includes('incident') || query.toLowerCase().includes('track')) {
      return `For effective near-miss and incident tracking, implement these best practices:

1. Create a simple reporting system that's easily accessible to all employees
2. Collect these essential details for each report:
   - Date, time, and location
   - People involved and witnesses
   - Description of what happened
   - Contributing factors
   - Potential severity if outcome had been worse
   - Immediate actions taken
   
3. Establish a no-blame culture to encourage reporting
4. Implement a tracking system to identify trends by:
   - Type of incident
   - Location
   - Contributing factors
   - Time of day/shift
   
5. Review near-misses regularly (weekly or monthly)
6. Document corrective actions with responsible parties and due dates
7. Share learnings with all employees while protecting privacy

Would you like a template for tracking near-misses and incidents?`;
    }
  }
  
  // Handle specific common follow-up patterns
  if (query.toLowerCase().includes('how often')) {
    // Inspection frequency questions
    if (query.toLowerCase().includes('inspect')) {
      for (const topic of recentTopics) {
        if (topic.includes('fall protection')) {
          return "For fall protection equipment, OSHA requires inspection before each use by the worker, and formal inspections by a competent person at least annually. After any fall event, the equipment must be immediately removed from service and inspected. Remember to document all inspections in your safety records with dates, inspector names, equipment IDs, and findings.";
        } else if (topic.includes('ppe') || topic.includes('protective')) {
          return "PPE should be inspected before each use for signs of damage, wear, or contamination. The inspection frequency also depends on the specific equipment - respirators need inspection before and after each use, while hard hats should be checked daily for cracks or dents. Equipment should also be thoroughly examined by a qualified person according to the manufacturer's recommendations, typically quarterly or annually. Always document these inspections with standardized forms.";
        } else if (topic.includes('fire') || topic.includes('extinguisher')) {
          return "Fire extinguishers require monthly visual inspections (checking pressure gauge, condition, accessibility) and annual maintenance checks by a certified professional. Hydrostatic testing is required every 5-12 years depending on the type. Use a standardized inspection log with dates, inspector names, and specific verification points for each extinguisher. Digital tracking with QR codes can help manage large numbers of extinguishers.";
        }
      }
      // Generic inspection answer if no specific topic
      return "Most safety equipment requires inspection before each use by the worker, with formal documented inspections by a qualified person on a regular schedule - often monthly, quarterly, or annually depending on the equipment type and manufacturer specifications. High-risk or critical safety equipment typically requires more frequent inspection. Always document these inspections with the date, inspector name, equipment identifier, condition assessment, and any corrective actions.";
    }
    
    // Training frequency questions
    if (query.toLowerCase().includes('train') || query.toLowerCase().includes('refresher')) {
      for (const topic of recentTopics) {
        if (topic.includes('fall protection')) {
          return "OSHA requires fall protection refresher training whenever there are changes in the workplace that render previous training obsolete, changes in the types of fall protection systems or equipment used, or when a worker shows inadequate knowledge or use of fall protection systems. At minimum, annual refresher training is considered a best practice. Document all training with dates, content covered, trainer qualifications, and employee verification of understanding.";
        } else if (topic.includes('lockout') || topic.includes('tagout')) {
          return "For Lockout/Tagout procedures, OSHA requires retraining whenever there's a change in job assignments, machines, equipment or processes, or when a new hazard is introduced. Additionally, refresher training is required whenever an inspection reveals problems with employee knowledge. The standard practice is to conduct refresher training annually. Maintain a training matrix to track completion and schedule refreshers automatically.";
        } else if (topic.includes('hazard communication') || topic.includes('hazcom')) {
          return "Hazard Communication training refreshers should be provided whenever a new chemical hazard is introduced into the work area. While OSHA doesn't specify a refresher frequency, industry best practice is to conduct annual refresher training to ensure employees maintain their knowledge of chemical hazards, labeling systems, and safety data sheets. Create a standardized documentation system that includes training content, employee verification, and dates.";
        }
      }
      // Generic training answer if no specific topic
      return "Most safety training programs require refresher training at least annually as a best practice, though OSHA's specific requirements vary by standard. Additionally, retraining is typically required when procedures change, new equipment is introduced, or when workplace observations indicate a need for additional training. Create a comprehensive training matrix that tracks requirements by position, completion dates, and schedules upcoming refreshers. Document all training thoroughly with standardized forms.";
    }
  }
  
  // Check if query is about minimum height requirement
  if (query.toLowerCase().includes('height') || 
      (query.toLowerCase().includes('minimum') && 
       (query.toLowerCase().includes('fall') || recentTopics.includes('fall protection')))) {
    return "In construction, OSHA requires fall protection when working at heights of 6 feet or more above a lower level (29 CFR 1926.501). For general industry, the threshold is 4 feet (29 CFR 1910.28). In shipyards it's 5 feet, and for longshoring operations it's 8 feet. Remember that regardless of height, if there's a risk of falling onto dangerous equipment, fall protection is required. Document your fall protection plan with specific height thresholds for your workplace and train employees on these requirements.";
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
          ` Would you like a simple implementation checklist for this requirement?`,
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
