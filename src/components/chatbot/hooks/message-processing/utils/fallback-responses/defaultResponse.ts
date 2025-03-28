/**
 * Generate a practical, helpful fallback response when no specific match is found
 */
export const getDefaultResponse = (): string => {
  // Acknowledge user intent with conversational starters
  const openings = [
    "You're right to ask about workplace safety. ",
    "That's an important safety topic to address. ",
    "Great question about safety procedures. "
  ];
  
  // Offer mini-response with clear framing
  const middles = [
    "Here's what I **can** help with: ",
    "I can provide you with these key points: ",
    "Let me share what's most important about this: "
  ];
  
  // Updated to provide practical advice instead of saying "I don't know"
  const practicalAdvice = [
    "**Safety Documentation Framework:**\n1. Clearly identify the work activity or process\n2. List potential hazards and risk levels\n3. Document required controls and PPE\n4. Include emergency response procedures\n5. Add sign-off fields for workers and supervisors",
    
    "**Implementation Checklist:**\n1. Assess the specific tasks and environment\n2. Document step-by-step safety procedures\n3. Train all personnel thoroughly\n4. Verify understanding with practical demonstrations\n5. Schedule regular reviews and updates",
    
    "**Key Safety Elements:**\n1. Written procedures using clear language\n2. Hazard identification and risk assessment\n3. Control measures with hierarchy of controls\n4. Emergency response protocols\n5. Regular evaluation and improvement process"
  ];
  
  // Offer downloadable templates
  const templateOffers = [
    "\n\nWould you like a downloadable template for this that you can customize for your workplace?",
    "\n\nI can provide a sample PDF or editable checklist for this. Would that be helpful?",
    "\n\nWould you like me to provide a downloadable template or form you can adapt?"
  ];
  
  // Offer branching options to keep user engaged
  const branchingOptions = [
    "\n\nWould you prefer guidance for construction, manufacturing, or healthcare settings?",
    "\n\nDo you need this for routine tasks, high-risk operations, or emergency response?",
    "\n\nAre you looking for something for equipment safety, chemical handling, or general workplace safety?"
  ];
  
  const opening = openings[Math.floor(Math.random() * openings.length)];
  const middle = middles[Math.floor(Math.random() * middles.length)];
  const advice = practicalAdvice[Math.floor(Math.random() * practicalAdvice.length)];
  const templateOffer = templateOffers[Math.floor(Math.random() * templateOffers.length)];
  const branchingOption = branchingOptions[Math.floor(Math.random() * branchingOptions.length)];
  
  return opening + middle + advice + templateOffer + branchingOption;
};
