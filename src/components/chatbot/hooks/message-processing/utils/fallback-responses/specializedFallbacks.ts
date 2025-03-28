
/**
 * Enhanced fallbacks for specific safety topics with more detailed guidance
 */
export const getSpecializedFallbacks = (topic: string): string | null => {
  const specializedFallbacks: Record<string, string> = {
    'hazard': `**Hazard Assessment Form Structure:**

1. **Identification Section**:
   - Project/task name and location
   - Assessment date and team members
   - Work activities being assessed

2. **Hazard Analysis Components**:
   - Task breakdown with step-by-step details
   - Potential hazards for each step
   - Risk rating (severity × likelihood)
   - Existing controls in place

3. **Control Measures**:
   - Additional controls needed
   - Person responsible for implementation
   - Completion timeline and verification
   - Residual risk evaluation

Would you like a downloadable hazard assessment template with a risk scoring matrix?

Would you prefer a template for construction, manufacturing, or general workplace settings?`,

    'confined space': `**Confined Space Entry Checklist Essentials:**

1. **Pre-Entry Verification**:
   - Space identification and classification
   - Hazardous energy isolation complete
   - Atmospheric testing results (O₂, LEL, CO, H₂S)
   - Ventilation equipment verification

2. **Personnel Requirements**:
   - Entrant names and certification status
   - Attendant assignment and responsibilities
   - Rescue team availability confirmation
   - Communication system testing

3. **Equipment Verification**:
   - Required PPE inspected and available
   - Rescue equipment accessibility
   - Lighting and communication devices
   - Entry/exit equipment stability

Would you like a printable confined space permit template with completion instructions?

Are you working with permit-required spaces, non-permit spaces, or both?`,

    'ppe': `**Welding PPE Checklist Components:**

1. **Head Protection**:
   - Welding helmet with appropriate shade lens
   - Flame-resistant hood or cap
   - Protection from falling objects if applicable
   - Proper eye protection under face shield

2. **Body Protection**:
   - Flame-resistant jacket/coat/sleeves
   - Leather apron for high-heat applications
   - Clothing free from flammable contaminants
   - Proper coverage of all exposed skin

3. **Hand & Foot Protection**:
   - Insulated welding gloves appropriate for voltage
   - Leather gauntlet cuffs for splash protection
   - Safety footwear with metatarsal guards
   - Non-flammable boot covers if needed

4. **Respiratory Protection**:
   - Proper ventilation system verification
   - Appropriate respirator for contaminants
   - Fit testing documentation
   - Clean air supply monitoring

Would you like a comprehensive welding safety inspection form with specific PPE requirements?

Do you need this for MIG, TIG, stick welding, or cutting operations?`
  };

  // Check for topic matches
  for (const [key, guidance] of Object.entries(specializedFallbacks)) {
    if (topic.toLowerCase().includes(key)) {
      return guidance;
    }
  }

  return null;
};
