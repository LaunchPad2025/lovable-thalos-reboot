
/**
 * Construct a mini-response that acknowledges the user's request
 * and provides helpful information even when full content is unavailable
 */
export const constructMiniResponse = (topic: string, originalResponse: string, localResponse: string): string => {
  // Acknowledgment
  const acknowledgments = [
    `You're right to ask about ${topic}. `,
    `That's an important question about ${topic}. `,
    `I appreciate your interest in ${topic} procedures. `
  ];
  
  // Offer what can be provided
  const offerings = [
    "Here's what I **can** help with: ",
    "Let me share these key points about this topic: ",
    "While I don't have the complete information, here are the essential elements: "
  ];
  
  // Mini content snippets by topic
  const miniContentByTopic: Record<string, string> = getMiniContentByTopic();
  
  // Select components
  const acknowledgment = acknowledgments[Math.floor(Math.random() * acknowledgments.length)];
  const offering = offerings[Math.floor(Math.random() * offerings.length)];
  
  // Find most relevant mini content
  let miniContent = miniContentByTopic['safety']; // Default
  for (const [key, content] of Object.entries(miniContentByTopic)) {
    if (topic.includes(key)) {
      miniContent = content;
      break;
    }
  }
  
  // Template offers and branching options
  const templateOffers = [
    "\n\nWould you like a downloadable template for this that you can customize?",
    "\n\nI can provide a sample document or checklist for this. Would that be helpful?",
    "\n\nWould you like me to share a template you can adapt for your specific needs?"
  ];
  
  const branchingOptions = [
    "\n\nWould you like me to focus on a specific aspect of this topic?",
    "\n\nAre you interested in industry-specific guidance for this?",
    "\n\nDo you need this information for training, compliance, or implementation purposes?"
  ];
  
  const templateOffer = templateOffers[Math.floor(Math.random() * templateOffers.length)];
  const branchingOption = branchingOptions[Math.floor(Math.random() * branchingOptions.length)];
  
  // Construct the response
  return acknowledgment + offering + miniContent + templateOffer + branchingOption;
};

/**
 * Get mini content snippets by topic
 */
function getMiniContentByTopic(): Record<string, string> {
  return {
    'hazard': '**Hazard Assessment Basics:**\n1. Identify potential hazards\n2. Evaluate risk levels\n3. Implement control measures\n4. Document and communicate\n5. Review regularly',
    
    'training': '**Training Documentation Essentials:**\n1. Training content and materials\n2. Attendance records with signatures\n3. Comprehension verification\n4. Certification documentation\n5. Refresher scheduling',
    
    'ppe': '**PPE Selection Process:**\n1. Hazard identification\n2. PPE specifications\n3. Proper fit and testing\n4. User training requirements\n5. Inspection and maintenance',
    
    'confined space': '**Confined Space Safety:**\n1. Space identification and evaluation\n2. Hazard controls\n3. Entry procedures\n4. Attendant responsibilities\n5. Emergency rescue planning',
    
    'jsa': '**Job Safety Analysis Components:**\n1. Task breakdown\n2. Hazard identification\n3. Risk evaluation\n4. Control measures\n5. Safe work procedures',
    
    'safety': '**Safety Program Essentials:**\n1. Written safety policies\n2. Hazard identification procedures\n3. Training requirements\n4. Incident reporting system\n5. Program evaluation methods'
  };
}
