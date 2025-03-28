
/**
 * Generate a generic fallback response when no specific match is found
 */
export const getDefaultResponse = (): string => {
  const openings = [
    "Thanks for your question about workplace safety. ",
    "I appreciate you asking about safety protocols. ",
    "That's an interesting safety question. "
  ];
  
  const middles = [
    "While I don't have specific regulatory information on that exact topic in my database, ",
    "I don't have detailed guidance on that specific scenario, ",
    "That's a bit outside my current knowledge base, "
  ];
  
  const actions = [
    "I'd suggest consulting your company's safety officer or checking OSHA's website for the most current guidance.",
    "you might want to check with your safety manager or look at osha.gov for detailed information.",
    "the best resource would be to contact OSHA directly or consult your company's safety professional."
  ];
  
  const closings = [
    "\n\nIn the meantime, would you like to ask about a related topic like PPE requirements, fall protection, or hazard communication?",
    "\n\nIs there another safety topic I could help with instead, such as training requirements or emergency procedures?",
    "\n\nCould you rephrase your question? Or perhaps I can help with a different safety concern?"
  ];
  
  const opening = openings[Math.floor(Math.random() * openings.length)];
  const middle = middles[Math.floor(Math.random() * middles.length)];
  const action = actions[Math.floor(Math.random() * actions.length)];
  const closing = closings[Math.floor(Math.random() * closings.length)];
  
  return opening + middle + action + closing;
};
