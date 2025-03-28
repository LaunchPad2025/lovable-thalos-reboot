
/**
 * Responses for training matrix and calendar questions
 */

/**
 * Generate response for training matrix questions
 */
export const getTrainingMatrixResponse = (query: string): string | null => {
  if (query.toLowerCase().includes('matrix') && query.toLowerCase().includes('training')) {
    return `**Safety Training Matrix Development Guide**

To create an effective training matrix for your team:

1. **Matrix structure and components**:
   - List all job positions/titles down the left column
   - List all required training topics across the top row
   - In each cell, indicate:
     * Required (Yes/No)
     * Frequency (Initial, Annual, Biennial, etc.)
     * Regulatory basis (OSHA standard reference)
   
2. **Essential training categories to include**:
   - Required OSHA training (HazCom, PPE, etc.)
   - Equipment-specific training
   - Emergency procedures
   - Job-specific safety procedures
   - Leadership safety responsibilities (for supervisors)
   
3. **Matrix management best practices**:
   - Color-code by training status (current, upcoming, overdue)
   - Include employee-specific completion dates
   - Track method of training (classroom, online, OJT)
   - Note trainer/vendor for each completed session
   - Review quarterly to identify gaps and plan sessions

Would you like a downloadable training matrix template that you can customize for your workplace?

**Related questions you might ask:**
- How do I determine which training topics are required for each position?
- What's the best way to track training completion status?
- Can you provide a sample training attendance form?`;
  }
  
  return null;
};

/**
 * Generate response for calendar questions
 */
export const getTrainingCalendarResponse = (query: string): string | null => {
  if (query.toLowerCase().includes('calendar') && 
      (query.toLowerCase().includes('training') || query.toLowerCase().includes('schedule'))) {
    return `**Annual Safety Training Calendar Development**

To create an effective safety training calendar:

1. **Strategic planning considerations**:
   - Distribute training throughout the year to avoid overload
   - Schedule seasonal topics at appropriate times
   - Coordinate with production/operations schedules
   - Plan refresher training before certification expirations
   - Include mix of required and enhancement topics
   
2. **Monthly planning structure**:
   - Assign a primary safety focus for each month
   - Schedule specific training dates with rooms/instructors
   - Include multiple session options for shift coverage
   - Block preparation time for instructors and materials
   - Add documentation processing time after sessions
   
3. **Calendar management practices**:
   - Review quarterly for adjustments and additions
   - Track attendance and schedule make-up sessions
   - Document reasons for any postponed sessions
   - Evaluate training effectiveness to improve future sessions
   - Adjust based on incident trends or regulatory changes

Would you like a downloadable annual safety training calendar template that you can customize for your organization?

**Related questions you might ask:**
- What safety topics should be prioritized in my training calendar?
- How do I measure training effectiveness?
- Can you provide a training needs assessment template?`;
  }
  
  return null;
};
