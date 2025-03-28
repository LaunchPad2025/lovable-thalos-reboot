
/**
 * Process the message content to make it more conversational and friendly
 * Enhances formal responses with more natural phrases
 */
import { getConversationStarter, needsConversationStarter } from './conversationalStarters';
import { replaceFormalPhrases } from './formalPhraseReplacer';
import { getHelpfulClosing, needsHelpfulClosing } from './helpfulClosings';

export function enhanceResponseTone(content: string): string {
  // If the response is very short, it might be an error message, so leave it as is
  if (content.length < 50) return content;
  
  let enhancedContent = content;
  
  // Add conversation starters if they don't exist
  if (needsConversationStarter(enhancedContent)) {
    enhancedContent = getConversationStarter() + enhancedContent;
  }
  
  // Replace formal phrases with more conversational ones
  enhancedContent = replaceFormalPhrases(enhancedContent);
  
  // Add a helpful closing if it doesn't already have one
  if (needsHelpfulClosing(enhancedContent)) {
    enhancedContent += getHelpfulClosing();
  }
  
  return enhancedContent;
}
