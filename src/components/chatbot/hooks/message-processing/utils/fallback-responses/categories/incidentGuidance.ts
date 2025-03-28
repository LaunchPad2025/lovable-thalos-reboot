
/**
 * Incident-related practical guidance for safety documentation
 */
export const getIncidentGuidance = (): Record<string, string> => {
  return {
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

Would you like a downloadable near-miss reporting template or incident investigation form?`,
  };
};
