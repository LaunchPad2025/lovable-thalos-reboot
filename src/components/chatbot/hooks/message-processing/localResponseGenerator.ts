
import { Message } from '../../types';
import { extractSafetyTopics } from '@/utils/conversationUtils';
import { isFollowUpQuestion, handleFollowUpQuestion } from './utils/follow-up';
import { findExactRegulationMatch } from './utils/regulationMatching';
import { getResponseForCommonTopic } from './utils/commonTopics';
import { getDefaultResponse, getPracticalSafetyGuidance } from './utils/fallbackResponses';

/**
 * Enhanced AI response logic with more contextual awareness, practical guidance and conversational tone
 */
export const generateAIResponse = (message: string, allMessages: Message[]): string => {
  const query = message.toLowerCase();
  
  // Extract topics from conversation history to provide more relevant context
  const recentTopics = extractSafetyTopics(allMessages);
  console.log("Recent conversation topics:", recentTopics);
  
  const previousUserMessages = allMessages
    .filter(msg => msg.role === 'user')
    .map(msg => msg.content)
    .slice(-3);
  
  // Check if this is a follow-up question and handle accordingly
  if (isFollowUpQuestion(query, previousUserMessages)) {
    console.log("Detected follow-up question, incorporating previous context");
    
    // Reference previous topics in the response
    const followUpResponse = handleFollowUpQuestion(recentTopics, query, allMessages);
    if (followUpResponse) return followUpResponse;
  }
  
  // First, check for practical guidance based on common workplace safety topics
  // We're not calling findExactRegulationMatch here anymore since it's async
  const practicalGuidance = getPracticalSafetyGuidance(query);
  if (practicalGuidance) return practicalGuidance;
  
  // Enhanced fallback responses for common safety topics with specific regulatory details
  const commonTopicResponse = getResponseForCommonTopic(query);
  if (commonTopicResponse) return commonTopicResponse;
  
  // Default response when no specific safety regulation match is found
  return getDefaultResponse();
};
