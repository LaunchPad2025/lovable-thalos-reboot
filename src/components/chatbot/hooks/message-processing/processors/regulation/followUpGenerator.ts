
import { Message } from '../../../../types';
import { extractSafetyTopics } from '@/utils/conversationUtils';
import { 
  detectIndustryContext, 
  getIndustrySpecificSuggestions 
} from '@/utils/conversation/follow-up-suggestions/industryDetection';

/**
 * Generate appropriate follow-up suggestions based on context and topics
 */
export const generateFollowUpSuggestions = (
  content: string,
  allMessages: Message[]
): string[] => {
  // Extract detected safety topics from conversation history
  const safetyTopics = extractSafetyTopics(allMessages);
  
  // Default regulation-specific follow-up suggestions
  let followUpSuggestions = [
    "Can you explain how to implement this regulation?",
    "What documentation is required for compliance?",
    "Are there any exceptions to this regulation?"
  ];
  
  // Customize follow-ups based on detected safety topics
  if (safetyTopics.includes('fall protection')) {
    followUpSuggestions = [
      "What are the inspection requirements for fall protection equipment?",
      "How do I develop a site-specific fall protection plan?",
      "What training is required for workers using fall protection?"
    ];
  } else if (safetyTopics.includes('chemical safety') || safetyTopics.includes('hazcom')) {
    followUpSuggestions = [
      "What GHS labels are required for chemical containers?",
      "How should we store incompatible chemicals?",
      "What training is required for employees who work with chemicals?"
    ];
  } else if (safetyTopics.includes('confined space')) {
    followUpSuggestions = [
      "What testing is required before confined space entry?",
      "Who needs to be involved in a confined space entry?",
      "What rescue provisions are required for confined spaces?"
    ];
  }
  
  // Detect industry context for better follow-up suggestions
  const industryContext = detectIndustryContext(content, allMessages.map(m => m.content));
  if (industryContext) {
    // Add at least one industry-specific follow-up
    const industrySuggestions = getIndustrySpecificSuggestions(industryContext);
    if (industrySuggestions.length > 0) {
      // Replace the last suggestion with an industry-specific one
      followUpSuggestions[followUpSuggestions.length - 1] = industrySuggestions[0];
    }
  }
  
  return followUpSuggestions;
};
