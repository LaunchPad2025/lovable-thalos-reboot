
/**
 * Replace formal phrases with more conversational alternatives
 */

/**
 * Mapping of formal phrases to conversational alternatives
 */
export const formalPhrases = [
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

/**
 * Replace formal phrases with conversational alternatives
 * @param content The content to process
 * @returns Content with formal phrases replaced
 */
export function replaceFormalPhrases(content: string): string {
  let enhancedContent = content;
  
  formalPhrases.forEach(phrase => {
    enhancedContent = enhancedContent.replace(
      new RegExp(phrase.formal, 'gi'), 
      phrase.conversational
    );
  });
  
  return enhancedContent;
}
