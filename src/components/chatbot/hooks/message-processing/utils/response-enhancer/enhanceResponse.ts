
/**
 * Enhance AI response with additional context and practical advice if needed
 */
import { addConversationalElements } from './conversationalElements';
import { constructMiniResponse } from './miniResponse';
import { extractTopicFromQuery } from './topicExtraction';
import { reformulateResponse } from './responseDiversifier';
import { similarityCheck } from './similarityCheck';

export const enhanceResponse = (
  originalResponse: string,
  localResponse: string,
  previousMessages: any[] = []
): string => {
  // Get previous assistant response for comparison (to avoid repetition)
  const previousAssistantMessages = previousMessages
    .filter(msg => msg.role === 'assistant')
    .map(msg => msg.content)
    .slice(-2);
  
  // Check if current response is too similar to previous one
  const isTooSimilar = previousAssistantMessages.length > 0 && 
    similarityCheck(originalResponse, previousAssistantMessages[0]);
  
  // If explicitly asked to repeat information
  const lastUserMessage = previousMessages
    .filter(msg => msg.role === 'user')
    .map(msg => msg.content)
    .pop() || '';
  
  const isAskingToRepeat = lastUserMessage.toLowerCase().includes('repeat that') || 
    lastUserMessage.toLowerCase().includes('say that again') ||
    lastUserMessage.toLowerCase().includes('full text') ||
    lastUserMessage.toLowerCase().includes('show me again');
  
  // If the user specifically asks for repetition, we should allow it
  if (isAskingToRepeat) {
    return addConversationalElements(originalResponse);
  }
  
  // If the response is too repetitive, we should enhance with local knowledge
  if (isTooSimilar) {
    console.log("Response too similar to previous, using alternative wording");
    // Choose between reformulating the original or using local knowledge
    if (localResponse.length > 100) {
      return addConversationalElements(localResponse);
    } else {
      return reformulateResponse(originalResponse);
    }
  }
  
  // If the response indicates a knowledge gap, use improved fallback approach
  if (originalResponse.length < 50 || 
      originalResponse.includes("I don't have specific information") ||
      originalResponse.includes("I don't know") ||
      originalResponse.includes("I'm not sure") ||
      originalResponse.includes("check with your safety") ||
      originalResponse.includes("couldn't generate") ||
      originalResponse.includes("don't have data") ||
      originalResponse.includes("can't provide")) {
    
    console.log("Knowledge gap detected, using enhanced fallback approach");
    
    // Extract the topic from the user's query
    const userQueryIndex = previousMessages.findIndex(msg => msg.role === 'user');
    const userQuery = userQueryIndex >= 0 ? previousMessages[userQueryIndex].content : '';
    
    // Create an improved fallback that acknowledges the user's intent
    const topic = extractTopicFromQuery(userQuery);
    
    // If the local response is substantial, use it instead
    if (localResponse.length > originalResponse.length * 1.2) {
      return addConversationalElements(localResponse);
    } else {
      // Construct a helpful mini-response
      return constructMiniResponse(topic, originalResponse, localResponse);
    }
  }
  
  return addConversationalElements(originalResponse);
};
