
/**
 * Responses for documentation-related follow-up questions
 */

/**
 * Generate response for documentation questions
 */
export const getDocumentationResponse = (query: string): string | null => {
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
  
  return null;
};

/**
 * Generate response for training record questions
 */
export const getTrainingRecordResponse = (query: string): string | null => {
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
  
  return null;
};

/**
 * Generate response for forklift certification questions
 */
export const getForkliftCertificationResponse = (query: string): string | null => {
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
  
  return null;
};
