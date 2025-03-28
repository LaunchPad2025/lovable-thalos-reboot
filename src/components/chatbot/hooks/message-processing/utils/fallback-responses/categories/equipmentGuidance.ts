
/**
 * Equipment-specific practical guidance for safety documentation
 */
export const getEquipmentGuidance = (): Record<string, string> => {
  return {
    'forklift': `**Forklift Operator Certification Tracking System:**

1. Operator qualification documentation:
   - Initial training completion with date and instructor
   - Skills evaluation results with evaluator signature
   - Written test scores with passing threshold
   - Specific equipment models employee is certified on
   - Certification expiration date (3 years maximum)

2. Recertification requirements:
   - Refresher training (every 3 years minimum)
   - Evaluation after any accident or near-miss
   - Assessment when new equipment is introduced
   - Documentation of remedial training if needed

3. Daily inspection records:
   - Pre-shift inspection checklist completion
   - Identified issues and maintenance requests
   - Equipment-specific inspection points
   - Operator verification signature

Would you like a downloadable forklift certification tracking spreadsheet or operator daily checklist?`,
  };
};
