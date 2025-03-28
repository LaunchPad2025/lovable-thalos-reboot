
/**
 * Process the message content to make it more conversational and friendly
 * Enhances formal responses with more natural phrases
 */
export function enhanceResponseTone(content: string): string {
  // If the response is very short, it might be an error message, so leave it as is
  if (content.length < 50) return content;
  
  // Add conversation starters if they don't exist
  if (!content.includes("Great question") && 
      !content.includes("Thanks for asking") && 
      !content.includes("That's a good point") &&
      Math.random() > 0.5) {
    const starters = [
      "Great question! ",
      "I'm glad you asked about that. ",
      "That's something many people wonder about. ",
      "Here's what I found for you. ",
      "Happy to help with that! "
    ];
    content = starters[Math.floor(Math.random() * starters.length)] + content;
  }
  
  // Replace formal phrases with more conversational ones
  const formalPhrases = [
    { formal: "According to OSHA", conversational: "OSHA guidelines state" },
    { formal: "It is required that", conversational: "You'll need to" },
    { formal: "It is necessary to", conversational: "You should" },
    { formal: "It is recommended that", conversational: "I'd recommend" },
    { formal: "The compliance requirement is", conversational: "The guideline here is" },
    { formal: "It is mandatory to", conversational: "You'll definitely need to" },
    { formal: "Section 1910", conversational: "the safety standard" },
    { formal: "This regulation requires", conversational: "You're required to" },
    { formal: "Per the standard", conversational: "Based on safety guidelines" },
    { formal: "Employers must ensure", conversational: "You'll want to make sure" }
  ];
  
  let enhancedContent = content;
  formalPhrases.forEach(phrase => {
    enhancedContent = enhancedContent.replace(
      new RegExp(phrase.formal, 'gi'), 
      phrase.conversational
    );
  });
  
  // Add a helpful closing if it doesn't already have one
  if (!enhancedContent.includes("hope that helps") && 
      !enhancedContent.includes("let me know if") && 
      !enhancedContent.includes("anything else") &&
      Math.random() > 0.6) {
    const closings = [
      " Hope that helps! Let me know if you need any clarification.",
      " Does that address what you were looking for?",
      " Is there anything specific about this you'd like me to explain further?",
      " Let me know if you need more specific information on this topic.",
      " Would you like me to elaborate on any part of this?"
    ];
    enhancedContent += closings[Math.floor(Math.random() * closings.length)];
  }
  
  return enhancedContent;
}
