/**
 * Reformulate a response to avoid repetition while adding practical advice
 */
export const reformulateResponse = (response: string): string => {
  // Split into sentences
  const sentences = response.split(/\.\s+/);
  
  // Keep only first and last sentences, plus one random one from the middle if available
  let reformed = sentences[0] + ". ";
  
  if (sentences.length > 3) {
    const randomMiddleIdx = 1 + Math.floor(Math.random() * (sentences.length - 2));
    reformed += "In other words, " + sentences[randomMiddleIdx].toLowerCase() + ". ";
  }
  
  if (sentences.length > 1) {
    reformed += sentences[sentences.length - 1] + ".";
  }
  
  // Add practical implementation advice with better formatting
  const practicalImplementation = [
    "\n\n**How to put this into practice:**\nFocus on clear documentation, regular training, and consistent implementation. Start with a written program that outlines responsibilities and procedures.",
    "\n\n**Implementation steps:**\n1. Create standardized forms\n2. Train all affected employees\n3. Conduct regular audits to ensure compliance is maintained\n4. Document all verification activities",
    "\n\n**Practical application:**\n- Develop a step-by-step procedure\n- Assign clear responsibilities\n- Document all activities with dates and signatures\n- Perform regular effectiveness reviews"
  ];
  
  reformed += practicalImplementation[Math.floor(Math.random() * practicalImplementation.length)];
  
  return reformed;
};
