
import { Message } from '@/components/chatbot/types';

// Maximum number of messages to keep in context
const MAX_CONTEXT_LENGTH = 12;

/**
 * Prepare conversation history for the AI to maintain context
 * Formats the history in a way suitable for language models
 */
export function prepareConversationContext(messages: Message[]): string {
  // Limit the number of messages to prevent context window overflow
  const contextMessages = messages.slice(-MAX_CONTEXT_LENGTH);
  
  // Format messages for context, ensuring the model can differentiate roles
  return contextMessages.map(msg => {
    const role = msg.role === 'user' ? 'Human' : 'Assistant';
    return `${role}: ${msg.content}`;
  }).join('\n\n');
}

/**
 * Process the message content to make it more natural and friendly
 * Enhances formal responses with more conversational phrases
 */
export function enhanceResponseTone(content: string): string {
  // This is a simple implementation - in a production environment,
  // this would be handled by the model's prompt and temperature settings
  
  // If the response is very short, it might be an error message, so leave it as is
  if (content.length < 50) return content;
  
  // Replace formal phrases with more conversational ones
  // This is a simplistic approach - a better implementation would use NLP
  const formalPhrases = [
    { formal: "It is required that", conversational: "You'll need to" },
    { formal: "According to regulations", conversational: "Based on safety regulations" },
    { formal: "It is necessary to", conversational: "You should" },
    { formal: "It is recommended that", conversational: "I'd recommend that you" },
    { formal: "The compliance requirement is", conversational: "The safety guideline here is" },
    { formal: "It is mandatory to", conversational: "You'll definitely need to" }
  ];
  
  let enhancedContent = content;
  formalPhrases.forEach(phrase => {
    enhancedContent = enhancedContent.replace(
      new RegExp(phrase.formal, 'gi'), 
      phrase.conversational
    );
  });
  
  return enhancedContent;
}

/**
 * Generate relevant follow-up questions based on the conversation
 * @param userQuery Last user message
 * @param aiResponse Last AI response
 * @returns Array of follow-up question suggestions
 */
export function generateFollowUpQuestions(userQuery: string, aiResponse: string): string[] {
  // Enhanced version with more specific and contextual follow-up questions
  const safetyKeywords = {
    'ppe': [
      'Which specific PPE items are you having issues with?', 
      'Are you looking for PPE recommendations for a particular job task?',
      'Do you need help with your PPE compliance program?'
    ],
    'chemical': [
      'What specific chemicals are you working with?', 
      'Are you asking about storage, handling, or disposal procedures?',
      'Do you need help with your chemical hazard communication program?'
    ],
    'training': [
      'Is this for new employee training or refresher training?', 
      'Which specific safety training topic are you interested in?',
      'Are you looking to implement a comprehensive training program?'
    ],
    'fall': [
      'What height are you working at?', 
      'Are you looking for information on guardrails, safety nets, or personal fall arrest systems?',
      'Is this for construction or general industry fall protection?'
    ],
    'hazard': [
      'Is this hazard related to a specific piece of equipment or process?',
      'Have you already conducted a hazard assessment?',
      'Are you looking for hazard control recommendations?'
    ],
    'violation': [
      'Has this violation been cited by OSHA, or are you trying to prevent it?',
      'Do you need guidance on abatement procedures?',
      'Would you like information on potential penalties for this violation?'
    ],
    'regulations': [
      'Which specific OSHA standard are you referencing?',
      'Are you looking for compliance guidance or interpretation?',
      'Do you need help implementing these regulations at your workplace?'
    ],
    'fine': [
      'Are you concerned about a specific citation?',
      'Would you like to know about OSHA\'s penalty reduction policies?',
      'Are you preparing for an OSHA inspection?'
    ]
  };

  // Check for keywords in the user query and AI response
  const combinedText = (userQuery + ' ' + aiResponse).toLowerCase();
  const suggestions: string[] = [];
  
  Object.entries(safetyKeywords).forEach(([keyword, questions]) => {
    if (combinedText.includes(keyword) && suggestions.length < 2) {
      // Add a relevant follow-up question that fits the context
      suggestions.push(questions[Math.floor(Math.random() * questions.length)]);
    }
  });
  
  // If no specific keywords matched, analyze the intent and provide relevant follow-ups
  if (suggestions.length === 0) {
    if (combinedText.includes('osha') || combinedText.includes('regulation') || combinedText.includes('standard')) {
      suggestions.push('Would you like me to explain how to implement this regulation practically?');
    } else if (combinedText.includes('accident') || combinedText.includes('incident') || combinedText.includes('injury')) {
      suggestions.push('Are you looking for prevention strategies or post-incident procedures?');
    } else if (combinedText.includes('inspect') || combinedText.includes('audit')) {
      suggestions.push('Would you like guidance on conducting effective safety inspections?');
    } else {
      // Generic but still helpful follow-ups
      suggestions.push(
        'Would you like more specific information about this safety topic?',
        'Is there a particular aspect of workplace safety you\'re most concerned about?'
      );
    }
  }
  
  return suggestions.slice(0, 2); // Return at most 2 suggestions
}

/**
 * Extract key safety topics from conversation for better context management
 * This helps Paulie remain on topic and reference previous exchanges
 */
export function extractSafetyTopics(messages: Message[]): string[] {
  const safetyTopics = [
    'ppe', 'chemical', 'fall protection', 'lockout/tagout', 'confined space',
    'hazard communication', 'ergonomics', 'electrical safety', 'fire safety',
    'machine guarding', 'respiratory protection', 'hearing conservation',
    'bloodborne pathogens', 'emergency action plan', 'scaffolding', 'ladders',
    'forklift', 'crane', 'welding', 'excavation', 'trenching', 'asbestos',
    'lead', 'silica', 'radiation', 'hazardous waste', 'recordkeeping'
  ];
  
  const topicsFound: string[] = [];
  
  // Look through recent messages
  const recentMessages = messages.slice(-5);
  
  recentMessages.forEach(msg => {
    const content = msg.content.toLowerCase();
    safetyTopics.forEach(topic => {
      if (content.includes(topic.toLowerCase()) && !topicsFound.includes(topic)) {
        topicsFound.push(topic);
      }
    });
  });
  
  return topicsFound;
}
