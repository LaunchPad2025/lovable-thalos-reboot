
/**
 * Responses for inspection-related follow-up questions
 */

/**
 * Generate a response for inspection frequency questions
 */
export const getInspectionFrequencyResponse = (topic: string): string => {
  if (topic.includes('fall protection')) {
    return "**Fall Protection Equipment Inspection Requirements**\n\nFor fall protection equipment, OSHA requires:\n\n1. **User inspection before each use** - Workers must visually inspect all components\n\n2. **Formal inspections by a competent person** - At least annually, documented with equipment ID, inspector name, date, and findings\n\n3. **Post-event inspection** - After any fall event, equipment must be immediately removed from service and thoroughly inspected\n\n4. **Documentation requirements** - Keep inspection records with dates, inspector names, equipment IDs, and results for the life of the equipment\n\nWould you like a downloadable fall protection inspection checklist template?";
  } else if (topic.includes('ppe') || topic.includes('protective')) {
    return "**PPE Inspection Frequency Guidelines**\n\nPPE inspection frequencies vary by equipment type:\n\n1. **General rule** - All PPE should be inspected before each use\n\n2. **Respirators** - Inspect before and after each use, plus monthly when in storage\n\n3. **Hard hats** - Daily visual inspection; replace after any impact\n\n4. **Safety glasses** - Before each use; replace when scratched or damaged\n\n5. **Gloves** - Before each use; watch for tears, punctures, degradation\n\n6. **Fall protection** - Before each use and annual formal inspection\n\nAll formal inspections should be documented with standardized forms including equipment ID, inspector name, date, and findings.\n\nWould you like a downloadable PPE inspection tracking template?";
  } else if (topic.includes('fire') || topic.includes('extinguisher')) {
    return "**Fire Extinguisher Inspection Schedule**\n\n1. **Monthly visual inspections**\n   - Check pressure gauge is in operating range\n   - Verify extinguisher is in designated location\n   - Ensure access is not blocked\n   - Check for visible damage or tampering\n   - Document with inspector initials and date\n\n2. **Annual maintenance inspection**\n   - Must be performed by certified professional\n   - Includes internal examination and recharging if needed\n   - Requires detailed documentation and tagging\n\n3. **Hydrostatic testing**\n   - Required every 5-12 years depending on extinguisher type\n   - Must be performed by certified testing service\n   - Requires permanent marking of test date\n\nWould you like a downloadable fire extinguisher inspection log template?";
  }
  
  // Generic inspection answer if no specific topic
  return "**Equipment Inspection Frequency Guidelines**\n\n1. **Before each use** - Operators should visually inspect critical safety equipment\n\n2. **Formal documented inspections** - Schedule based on:\n   - Manufacturer recommendations\n   - Regulatory requirements\n   - Equipment criticality and risk\n   - Usage frequency and conditions\n\n3. **Typical inspection frequencies**:\n   - Daily: High-risk or critical safety equipment\n   - Weekly: Frequently used equipment\n   - Monthly: General facility safety equipment\n   - Quarterly/Annually: Backup or emergency equipment\n\n4. **Documentation requirements**:\n   - Date and time of inspection\n   - Inspector name and qualification\n   - Equipment identifier/serial number\n   - Pass/fail for each inspection point\n   - Corrective actions for deficiencies\n\nWould you like a downloadable equipment inspection scheduling template?";
};
