
import { Message } from '../../types';
import { extractSafetyTopics } from '@/utils/conversationUtils';
import { safetyRegulationResponses } from '../../data/safetyRegulationData';

/**
 * Check if the message appears to be a follow-up question
 */
const isFollowUpQuestion = (query: string, previousUserMessages: string[]): boolean => {
  return previousUserMessages.length > 1 && 
    (query.length < 20 || 
    query.includes('what about') || 
    query.includes('how about') || 
    query.includes('and') || 
    !query.includes('?'));
};

/**
 * Handle follow-up questions by incorporating previous context
 */
const handleFollowUpQuestion = (recentTopics: string[]): string | null => {
  if (recentTopics.length === 0) return null;
  
  // Check if any topic from the conversation matches our regulations
  for (const topic of recentTopics) {
    for (const regulation of safetyRegulationResponses) {
      if (regulation.keywords.some(keyword => topic.includes(keyword))) {
        return `Continuing our discussion about ${topic}, ${regulation.response} Would you like me to elaborate on any specific aspect of this?`;
      }
    }
  }
  
  return null;
};

/**
 * Check for exact matches in regulatory database
 */
const findExactRegulationMatch = (query: string): string | null => {
  for (const regulation of safetyRegulationResponses) {
    for (const keyword of regulation.keywords) {
      if (query.includes(keyword)) {
        // Provide a more conversational and detailed response
        const regulationInfo = regulation.response;
        const sourceInfo = regulation.source;
        
        // Enhance with more conversational elements
        return `Based on your question about ${keyword}, here's what you need to know: ${regulationInfo}\n\nThis guidance comes from ${sourceInfo}. Is there a specific aspect of this regulation you'd like me to explain in more detail?`;
      }
    }
  }
  
  return null;
};

/**
 * Generate responses for common safety topics
 */
const getResponseForCommonTopic = (query: string): string | null => {
  if (query.includes('ppe') || query.includes('equipment') || query.includes('protection')) {
    return "Looking at your question about personal protective equipment (PPE), I can share that OSHA regulation 29 CFR 1910.132 requires employers to assess workplace hazards and provide appropriate PPE. This includes hard hats (ANSI Z89.1), safety glasses (ANSI Z87.1), and other equipment specific to job hazards.\n\nFailure to provide proper PPE can result in OSHA citations with penalties up to $13,653 per violation for serious violations, and up to $136,532 for willful or repeated violations.\n\nCan I help with implementing a specific aspect of your PPE program?";
  } else if (query.includes('height') || query.includes('fall') || query.includes('elevation')) {
    return "I see you're asking about fall protection. According to OSHA standard 29 CFR 1926.501, fall protection is required at heights of 6 feet or more in construction (4 feet in general industry).\n\nEmployers must provide guardrails, safety nets, or personal fall arrest systems. Each system must meet specific requirements - for example, guardrails must be 42 inches high (±3 inches) and withstand 200 pounds of force.\n\nNon-compliance can lead to citations with penalties ranging from $4,000 to $13,653 per violation, depending on severity. Would you like me to explain more about a specific fall protection system?";
  } else if (query.includes('chemical') || query.includes('hazardous') || query.includes('storage')) {
    return "Regarding your question about chemical storage, OSHA's Hazard Communication Standard (29 CFR 1910.1200) requires proper labeling, SDS accessibility, and employee training. For flammable liquids specifically, 29 CFR 1910.106 sets requirements for storage cabinets and rooms.\n\nStorage cabinets must be designed to limit internal temperature to 325°F when subjected to a 10-minute fire test. No more than 60 gallons of Class I or II liquids (or 120 gallons of Class III) can be stored in a single cabinet.\n\nAre you looking for guidance on a specific chemical or storage situation? I'd be happy to provide more targeted advice.";
  } else if (query.includes('waste') || query.includes('disposal') || query.includes('epa')) {
    return "I understand you're asking about waste management. The EPA's Resource Conservation and Recovery Act (RCRA) governs hazardous waste handling.\n\nUnder 40 CFR 262, generators must identify waste types, use proper containers, label with accumulation start dates, and conduct weekly inspections. Small quantity generators can store waste up to 180 days, while large quantity generators are limited to 90 days.\n\nNon-compliance penalties can range from $15,000 to $70,000 per day per violation. Is there a specific aspect of waste management you're dealing with at your facility?";
  } else if (query.includes('training') || query.includes('certification')) {
    return "Regarding your question about safety training, OSHA requires employers to provide training to all employees exposed to workplace hazards (29 CFR 1910.132 for general industry, 29 CFR 1926.21 for construction).\n\nKey requirements include:\n- Training must be in a language workers understand\n- It must cover hazard recognition and prevention\n- For many standards, annual refresher training is required\n- Documentation must be maintained with training dates and content\n\nWhat specific type of safety training are you implementing? I can provide more targeted guidance for your industry.";
  } else if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
    return "Hi there! I'm Paulie, your AI safety assistant. I'm here to help with questions about workplace safety regulations, compliance requirements, and best practices. I can provide guidance on OSHA standards, EPA regulations, and industry-specific safety protocols. What specific safety topic can I assist you with today?";
  }
  
  return null;
};

/**
 * Generate a generic fallback response when no specific match is found
 */
const getDefaultResponse = (): string => {
  return "I appreciate your question about workplace safety. While I don't have specific regulatory information on that exact topic in my database, I can suggest consulting your company's safety officer or checking OSHA's website at osha.gov for the most current guidance.\n\nIf you'd like, you can rephrase your question or ask about a related topic like PPE requirements, fall protection, hazard communication, or machine guarding. What aspect of workplace safety is most important for your situation?";
};

/**
 * Enhanced AI response logic with more contextual awareness
 */
export const generateAIResponse = (message: string, allMessages: Message[]): string => {
  const query = message.toLowerCase();
  
  // Extract topics from conversation history to provide more relevant context
  const recentTopics = extractSafetyTopics(allMessages);
  const previousUserMessages = allMessages
    .filter(msg => msg.role === 'user')
    .map(msg => msg.content)
    .slice(-3);
  
  // Check if this is a follow-up question
  if (isFollowUpQuestion(query, previousUserMessages)) {
    console.log("Detected follow-up question, incorporating previous context");
    
    // Reference previous topics in the response
    const followUpResponse = handleFollowUpQuestion(recentTopics);
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
