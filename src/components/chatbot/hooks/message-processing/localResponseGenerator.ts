
import { Message } from '../../types';
import { extractSafetyTopics } from '@/utils/conversationUtils';
import { safetyRegulationResponses } from '../../data/safetyRegulationData';

/**
 * Check if the message appears to be a follow-up question
 */
const isFollowUpQuestion = (query: string, previousUserMessages: string[]): boolean => {
  // Enhanced detection of follow-up questions with more patterns
  if (previousUserMessages.length === 0) return false;
  
  const followUpIndicators = [
    'what about', 'how about', 'and', 'but', 'so', 'then', 'what if',
    'would', 'could', 'should', 'why', 'when', 'is it', 'are they', 
    'do i need', 'is there', 'what else', 'anything else'
  ];
  
  const isShortQuery = query.length < 20;
  const hasFollowUpPhrase = followUpIndicators.some(indicator => 
    query.toLowerCase().includes(indicator)
  );
  const lacksContext = !query.includes('?') && query.split(' ').length < 6;
  
  return previousUserMessages.length > 0 && (isShortQuery || hasFollowUpPhrase || lacksContext);
};

/**
 * Handle follow-up questions by incorporating previous context
 */
const handleFollowUpQuestion = (recentTopics: string[], query: string, previousMessages: Message[]): string | null => {
  if (recentTopics.length === 0) return null;
  
  // Find the most recent non-user message to reference
  const previousResponses = previousMessages
    .filter(msg => msg.role === 'assistant')
    .map(msg => msg.content)
    .slice(-2);
  
  if (previousResponses.length === 0) return null;
  
  // Get the most recent topic discussed
  const mostRecentTopic = recentTopics[0];
  
  // Check if any topic from the conversation matches our regulations
  for (const topic of recentTopics) {
    for (const regulation of safetyRegulationResponses) {
      if (regulation.keywords.some(keyword => topic.toLowerCase().includes(keyword.toLowerCase()))) {
        // Create a conversational response that builds on previous context
        const openingPhrases = [
          `Building on what we discussed about ${topic}, `,
          `To add to our conversation about ${topic}, `,
          `Regarding ${topic} that we were discussing, `,
          `Following up on ${topic}, `
        ];
        
        const opening = openingPhrases[Math.floor(Math.random() * openingPhrases.length)];
        const response = regulation.response.replace(/According to OSHA|OSHA standard|OSHA regulation/gi, 'the safety guideline');
        
        const simplifiedResponse = response.split('. ').slice(0, 3).join('. ') + '.';
        
        const closingPhrases = [
          ` Does that help answer your follow-up question?`,
          ` Is this what you were looking for?`,
          ` Is there a specific aspect of this you'd like me to focus on?`
        ];
        
        const closing = closingPhrases[Math.floor(Math.random() * closingPhrases.length)];
        
        return opening + simplifiedResponse + closing;
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
      if (query.toLowerCase().includes(keyword.toLowerCase())) {
        // Provide a more conversational and detailed response
        const regulationInfo = regulation.response;
        
        // Remove formal citation language unless specific request
        const simplifiedInfo = query.includes('citation') || query.includes('standard') || query.includes('regulation number')
          ? regulationInfo
          : regulationInfo
              .replace(/according to osha regulation [^,]+,/gi, '')
              .replace(/osha standard [^,]+,/gi, '')
              .replace(/\([0-9]+ CFR [^\)]+\)/gi, '')
              .replace(/\([^\)]+\)/gi, '');
        
        // Structure in a more conversational format
        const openingPhrases = [
          `Great question about ${keyword}! Here's what you need to know: `,
          `I'd be happy to help with information about ${keyword}. `,
          `When it comes to ${keyword}, here's the guidance you should follow: `,
          `Thanks for asking about ${keyword}! `
        ];
        
        const opening = openingPhrases[Math.floor(Math.random() * openingPhrases.length)];
        
        // Break the response into bullet points for better readability if it's long
        let formattedResponse = simplifiedInfo;
        if (simplifiedInfo.length > 200) {
          const sentences = simplifiedInfo.split(/\.\s+/);
          if (sentences.length > 2) {
            formattedResponse = sentences.slice(0, 3).map(s => `• ${s}`).join('\n');
          }
        }
        
        const closingPhrases = [
          `\n\nIs there anything specific about ${keyword} you'd like me to explain in more detail?`,
          `\n\nDoes this address your question about ${keyword}?`,
          `\n\nWould you like me to provide more practical implementation advice for this?`
        ];
        
        const closing = closingPhrases[Math.floor(Math.random() * closingPhrases.length)];
        
        return opening + formattedResponse + closing;
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
    return "Thanks for asking about personal protective equipment (PPE)! Let me help with that.\n\n• Employers need to assess workplace hazards and provide appropriate PPE at no cost to employees\n• Common required equipment includes hard hats, safety glasses, gloves, and job-specific gear\n• You'll need proper training on when and how to use each piece of equipment\n\nWhat specific PPE are you concerned about implementing in your workplace?";
  } else if (query.includes('height') || query.includes('fall') || query.includes('elevation')) {
    return "Fall protection is definitely important! Here's what you should know:\n\n• Protection is required at 6 feet or more in construction (4 feet in general industry)\n• Your options include guardrails, safety nets, or personal fall arrest systems\n• Each system has specific requirements - for example, guardrails need to be 42 inches high and withstand 200 pounds of force\n\nAre you working on a specific height safety situation I can help with?";
  } else if (query.includes('chemical') || query.includes('hazardous') || query.includes('storage')) {
    return "Great question about chemical storage! Here's what you need to know:\n\n• You'll need proper labeling, accessible Safety Data Sheets, and employee training\n• For flammable liquids, storage cabinets must limit internal temperature to 325°F during fires\n• You're limited to 60 gallons of Class I or II liquids (or 120 gallons of Class III) per cabinet\n\nWhat specific chemicals are you working with? I can provide more targeted advice.";
  } else if (query.includes('waste') || query.includes('disposal') || query.includes('epa')) {
    return "Thanks for asking about waste management. Here's the key information:\n\n• You'll need to identify waste types, use proper containers, and label with accumulation start dates\n• Small quantity generators can store waste up to 180 days, while large quantity generators are limited to 90 days\n• Weekly inspections are required to check for leaks or deterioration\n\nIs there a specific aspect of waste management you're dealing with at your facility?";
  } else if (query.includes('training') || query.includes('certification')) {
    return "Safety training is essential! Here's what you need to know:\n\n• Training must be in a language workers understand\n• It needs to cover hazard recognition and prevention\n• For many hazards, annual refresher training is required\n• Documentation must be maintained with training dates and content\n\nAre you setting up a new training program or updating an existing one?";
  } else if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
    return "Hi there! I'm Paulie, your friendly safety assistant. I'm here to help with questions about workplace safety regulations, compliance requirements, and best practices. What specific safety topic can I help you with today?";
  } else if (query.includes('construction') || query.includes('building') || query.includes('site')) {
    return "Construction safety is a big topic! Here are the key areas to focus on:\n\n• Fall protection when working at heights of 6+ feet\n• Proper scaffolding with guardrails\n• Trench protection for excavations 5+ feet deep\n• Proper lockout/tagout procedures for equipment\n• Hard hats, safety glasses, and appropriate PPE\n\nWhat specific aspect of construction safety are you working on?";
  } else if (query.includes('new employee') || query.includes('new hire') || query.includes('onboarding')) {
    return "Great question about training new employees! Here's what you need to know:\n\n• New employees need safety training before they start work - especially for hazardous tasks\n• Training should cover workplace-specific hazards, emergency procedures, and PPE use\n• You'll need to document all training with dates, topics covered, and signatures\n• Consider a mentor system for the first few weeks to reinforce safety practices\n\nAre you developing an onboarding program or improving an existing one?";
  } else if (query.includes('fine') || query.includes('penalty') || query.includes('citation')) {
    return "When it comes to safety violations and fines, here's what you should know:\n\n• Serious violations typically range from $4,000 to $13,653 per violation\n• Willful or repeated violations can reach $136,532 each\n• Factors affecting penalties include company size, good faith efforts, and violation history\n• You can reduce penalties through abatement, safety programs, and cooperation\n\nAre you dealing with a specific citation or just wanting to understand the potential risks?";
  } else if (query.includes('exit') || query.includes('emergency') || query.includes('evacuation')) {
    return "Emergency exits and evacuation routes are critical safety elements! Here's what you need to know:\n\n• Exit routes must be permanent, properly lit, and unobstructed\n• Exit doors must be unlocked from the inside and swing outward\n• You need clear, visible exit signs and emergency lighting\n• Regular evacuation drills should be conducted to ensure everyone knows what to do\n\nIs there a specific aspect of emergency planning you're working on?";
  } else if (query.includes('scaffold') || query.includes('ladder')) {
    return "Thanks for asking about scaffold and ladder safety! Here's the key guidance:\n\n• Scaffolds need to support at least 4 times the maximum intended load\n• Guardrails are required for platforms 10 feet or higher\n• Ladders should be inspected before each use for defects\n• Users need to maintain three points of contact when climbing\n• Never stand on the top step of a stepladder\n\nAre you using scaffolds, ladders, or both in your workplace?";
  }
  
  return null;
};

/**
 * Generate a generic fallback response when no specific match is found
 */
const getDefaultResponse = (): string => {
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
