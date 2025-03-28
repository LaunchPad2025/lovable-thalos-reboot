
/**
 * Responses for inspection-related follow-up questions
 */

/**
 * Generate a response for inspection frequency questions
 */
export const getInspectionFrequencyResponse = (topic: string): string => {
  if (topic.includes('fall protection')) {
    return `**Fall Protection Equipment Inspection Requirements**

For fall protection equipment, OSHA requires:

1. **User inspection before each use** 
   - Workers must visually inspect all components
   - Check for wear, damage, or deterioration
   - Verify proper function of moving parts
   - Inspect all hardware for deformation or cracks

2. **Formal inspections by a competent person** 
   - At least annually, documented with equipment ID
   - Inspector name, date, and findings recorded
   - Detailed examination of all components
   - Verification against manufacturer guidelines

3. **Post-event inspection** 
   - After any fall event, immediately remove from service
   - Thorough inspection required before return to use
   - Document findings and disposition decisions
   - Replace any components showing stress or damage

4. **Documentation requirements** 
   - Keep inspection records with dates
   - Include inspector names, equipment IDs
   - Record pass/fail status and findings
   - Maintain for the life of the equipment

Would you like a downloadable fall protection inspection checklist template?

**Related questions you might ask:**
- What criteria should be used to remove fall protection from service?
- How do I properly store fall protection equipment?
- What qualifications are needed to be a "competent person"?`;
  } else if (topic.includes('ppe') || topic.includes('protective')) {
    return `**PPE Inspection Frequency Guidelines**

PPE inspection frequencies vary by equipment type:

1. **General rule** 
   - All PPE should be inspected before each use
   - Look for visible damage, wear, or deterioration
   - Check function of adjustable components
   - Verify cleanliness and sanitization if shared

2. **Respirators** 
   - Inspect before and after each use
   - Monthly inspection when in storage
   - Check straps, filters, valves, and facepiece
   - Test for proper seal and function

3. **Hard hats** 
   - Daily visual inspection
   - Replace after any impact
   - Check shell for cracks, dents, or UV damage
   - Inspect suspension system for wear

4. **Safety glasses** 
   - Before each use inspection
   - Replace when scratched or damaged
   - Check for loose frames or temples
   - Verify proper fit and coverage

5. **Gloves** 
   - Before each use inspection
   - Check for tears, punctures, degradation
   - Verify appropriate protection for hazards
   - Replace if contaminated or damaged

6. **Fall protection** 
   - Before each use and annual formal inspection
   - Document all inspections with date and results
   - Check all hardware, webbing, and stitching
   - Test function of moving parts

All formal inspections should be documented with standardized forms including equipment ID, inspector name, date, and findings.

Would you like a downloadable PPE inspection tracking template?

**Related questions you might ask:**
- How do I determine when PPE needs to be replaced?
- What should be included in PPE training for employees?
- Can you provide a PPE hazard assessment template?`;
  } else if (topic.includes('fire') || topic.includes('extinguisher')) {
    return `**Fire Extinguisher Inspection Schedule**

1. **Monthly visual inspections**
   - Check pressure gauge is in operating range
   - Verify extinguisher is in designated location
   - Ensure access is not blocked
   - Check for visible damage or tampering
   - Document with inspector initials and date

2. **Annual maintenance inspection**
   - Must be performed by certified professional
   - Includes internal examination and recharging if needed
   - Requires detailed documentation and tagging
   - Verify proper mounting and signage
   - Update inspection tag with date and technician info

3. **Hydrostatic testing**
   - Required every 5-12 years depending on extinguisher type
   - Must be performed by certified testing service
   - Requires permanent marking of test date
   - Tests pressure vessel integrity under pressure
   - Includes complete internal inspection

Would you like a downloadable fire extinguisher inspection log template?

**Related questions you might ask:**
- What are the different types of fire extinguishers and their uses?
- How should employees be trained on fire extinguisher use?
- What's required for fire extinguisher placement and mounting?`;
  }
  
  // Generic inspection answer if no specific topic
  return `**Equipment Inspection Frequency Guidelines**

1. **Before each use** 
   - Operators should visually inspect critical safety equipment
   - Look for obvious damage or defects
   - Verify guards and safety devices are in place
   - Check fluid levels and operation where applicable

2. **Formal documented inspections** 
   - Schedule based on multiple factors:
   - Manufacturer recommendations
   - Regulatory requirements
   - Equipment criticality and risk
   - Usage frequency and conditions

3. **Typical inspection frequencies**:
   - Daily: High-risk or critical safety equipment
   - Weekly: Frequently used equipment
   - Monthly: General facility safety equipment
   - Quarterly/Annually: Backup or emergency equipment

4. **Documentation requirements**:
   - Date and time of inspection
   - Inspector name and qualification
   - Equipment identifier/serial number
   - Pass/fail for each inspection point
   - Corrective actions for deficiencies

Would you like a downloadable equipment inspection scheduling template?

**Related questions you might ask:**
- How do I train employees to perform equipment inspections?
- What should be included in an equipment inspection checklist?
- How do I document and track correction of inspection findings?`;
};
