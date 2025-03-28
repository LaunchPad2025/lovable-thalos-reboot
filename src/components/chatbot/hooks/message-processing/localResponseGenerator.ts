
import { Message } from '../../types';
import { extractSafetyTopics } from '@/utils/conversationUtils';
import { isFollowUpQuestion, handleFollowUpQuestion } from './utils/followUp';
import { findExactRegulationMatch } from './utils/regulationMatching';
import { getResponseForCommonTopic } from './utils/commonTopics';
import { getDefaultResponse } from './utils/fallbackResponses';

/**
 * Enhanced AI response logic with more contextual awareness and conversational tone
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
  
  // First, check for exact matches in our regulatory database
  const exactMatchResponse = findExactRegulationMatch(query);
  if (exactMatchResponse) return exactMatchResponse;
  
  // Enhanced fallback responses for common safety topics with specific regulatory details
  const commonTopicResponse = getResponseForCommonTopic(query);
  if (commonTopicResponse) return commonTopicResponse;
  
  // Default response when no specific safety regulation match is found
  return getDefaultResponse();
};
