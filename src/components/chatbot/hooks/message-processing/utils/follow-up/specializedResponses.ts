
/**
 * Specialized responses for specific safety topics
 */

/**
 * Generate response for audit preparation questions
 */
export const getAuditPreparationResponse = (query: string): string | null => {
  if (query.toLowerCase().includes('audit') || 
      query.toLowerCase().includes('prepare') || 
      query.toLowerCase().includes('inspection')) {
    return `**OSHA Inspection Preparation Guide**

To prepare for a safety audit or OSHA inspection, follow these steps:

1. **Documentation preparation**:
   - Organize all written safety programs and ensure they're current
   - Gather and organize key documentation:
     * Training records with verification signatures
     * Equipment inspection and maintenance logs
     * Incident reports and investigations
     * Hazard assessments and corrective actions
     * Safety committee minutes
     * Safety data sheets (SDS)
   
2. **Facility preparation**:
   - Conduct a pre-audit self-inspection using relevant OSHA checklists
   - Address any identified hazards or non-compliance issues
   - Verify all required signage and labels are properly displayed
   - Ensure emergency equipment is accessible and functional
   - Check that PPE is available and properly maintained
   
3. **Personnel preparation**:
   - Brief employees on the inspection process and their rights
   - Prepare for document requests and interview questions
   - Designate team members for specific roles during the inspection
   - Review recent citations in your industry to identify focus areas
   - Establish a communication protocol during the inspection

Would you like a downloadable pre-audit checklist that you can use to systematically prepare for an inspection?

**Related questions you might ask:**
- What are common OSHA violations in my industry?
- How should I respond if OSHA issues a citation?
- Can you provide an OSHA inspection response procedure template?`;
  }
  
  return null;
};

/**
 * Generate response for near-miss tracking questions
 */
export const getNearMissResponse = (query: string): string | null => {
  if (query.toLowerCase().includes('near miss') || query.toLowerCase().includes('incident') || query.toLowerCase().includes('track')) {
    return `**Near-Miss and Incident Tracking System**

For effective near-miss and incident tracking, implement these best practices:

1. **Reporting system design**:
   - Create simple, accessible forms (paper and digital)
   - Make reporting quick (under 5 minutes to complete)
   - Ensure anonymous reporting option is available
   - Develop mobile-friendly reporting tools
   - Establish clear definitions of incidents vs. near-misses
   
2. **Essential information to collect**:
   - Date, time, and precise location
   - People involved and witnesses (optional for near-misses)
   - Detailed description of what happened
   - Contributing factors and potential root causes
   - Potential severity if outcome had been worse
   - Immediate actions taken after event
   
3. **Program management best practices**:
   - Establish a no-blame culture focused on prevention
   - Review reports weekly to identify trends and patterns
   - Track corrective actions to completion with due dates
   - Share learnings across the organization (anonymized)
   - Calculate metrics to evaluate program effectiveness
   - Recognize and reward active reporting participation

Would you like a downloadable template for tracking near-misses and incidents in your workplace?

**Related questions you might ask:**
- How do I calculate safety metrics from incident data?
- What's the best way to communicate incident findings?
- Can you provide a root cause analysis template?`;
  }
  
  return null;
};
