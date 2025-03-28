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
 * Process the message content to make it more conversational and friendly
 * Enhances formal responses with more natural phrases
 */
export function enhanceResponseTone(content: string): string {
  // If the response is very short, it might be an error message, so leave it as is
  if (content.length < 50) return content;
  
  // Add conversation starters if they don't exist
  if (!content.includes("Great question") && 
      !content.includes("Thanks for asking") && 
      !content.includes("That's a good point") &&
      Math.random() > 0.5) {
    const starters = [
      "Great question! ",
      "I'm glad you asked about that. ",
      "That's something many people wonder about. ",
      "Here's what I found for you. ",
      "Happy to help with that! "
    ];
    content = starters[Math.floor(Math.random() * starters.length)] + content;
  }
  
  // Replace formal phrases with more conversational ones
  const formalPhrases = [
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
  
  let enhancedContent = content;
  formalPhrases.forEach(phrase => {
    enhancedContent = enhancedContent.replace(
      new RegExp(phrase.formal, 'gi'), 
      phrase.conversational
    );
  });
  
  // Add a helpful closing if it doesn't already have one
  if (!enhancedContent.includes("hope that helps") && 
      !enhancedContent.includes("let me know if") && 
      !enhancedContent.includes("anything else") &&
      Math.random() > 0.6) {
    const closings = [
      " Hope that helps! Let me know if you need any clarification.",
      " Does that address what you were looking for?",
      " Is there anything specific about this you'd like me to explain further?",
      " Let me know if you need more specific information on this topic.",
      " Would you like me to elaborate on any part of this?"
    ];
    enhancedContent += closings[Math.floor(Math.random() * closings.length)];
  }
  
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
      'What specific PPE is required for my industry?', 
      'How often should we replace PPE items?',
      'What training is needed for proper PPE use?'
    ],
    'chemical': [
      'What are the storage requirements for flammable chemicals?', 
      'Do you have a template for a chemical inventory list?',
      'What should our chemical spill procedure include?'
    ],
    'training': [
      'How often should we conduct refresher training?', 
      'What should be included in our training documentation?',
      'Are there specific training requirements for supervisors?'
    ],
    'fall': [
      'What are the requirements for temporary guardrails?', 
      'How often should fall protection equipment be inspected?',
      'What documentation is needed for our fall protection program?'
    ],
    'hazard': [
      'What should be included in our hazard assessment?',
      'How often should hazard assessments be updated?',
      'What are the most commonly overlooked workplace hazards?'
    ],
    'violation': [
      'What\'s the process for contesting an OSHA citation?',
      'How should we document our violation abatement efforts?',
      'What are the most common violations in our industry?'
    ],
    'regulations': [
      'Are there any upcoming changes to this regulation?',
      'Is there a simplified guide for implementing this requirement?',
      'What documentation would an inspector look for regarding this?'
    ],
    'fine': [
      'What factors increase or decrease potential fines?',
      'Are there any penalty reduction programs available?',
      'What\'s the typical timeline for resolving citations?'
    ],
    'inspection': [
      'What areas do OSHA inspectors focus on most?',
      'What rights do we have during an inspection?',
      'How should we prepare for an upcoming safety inspection?'
    ],
    'employee': [
      'What safety rights do temporary workers have?',
      'How should we handle employee safety complaints?',
      'What safety responsibilities do employees have?'
    ]
  };

  // Check for keywords in the user query and AI response
  const combinedText = (userQuery + ' ' + aiResponse).toLowerCase();
  const suggestions: string[] = [];
  
  // Try to find the most relevant keywords first
  const foundKeywords = Object.entries(safetyKeywords).filter(([keyword]) => 
    combinedText.includes(keyword)
  );
  
  if (foundKeywords.length > 0) {
    // Sort by keyword occurrence and relevance
    foundKeywords.forEach(([keyword, questions]) => {
      if (suggestions.length < 3) {
        // Add a relevant follow-up question that fits the context
        suggestions.push(questions[Math.floor(Math.random() * questions.length)]);
      }
    });
  }
  
  // If no specific keywords matched, analyze the intent and provide relevant follow-ups
  if (suggestions.length === 0) {
    if (combinedText.includes('osha') || combinedText.includes('regulation')) {
      suggestions.push('How should we document compliance with this regulation?');
    } else if (combinedText.includes('accident') || combinedText.includes('incident')) {
      suggestions.push('What should be included in our incident report forms?');
    } else if (combinedText.includes('inspect') || combinedText.includes('audit')) {
      suggestions.push('How often should we conduct internal safety audits?');
    } else {
      // Generic but still helpful follow-ups
      suggestions.push(
        'What are the top safety concerns in our industry?',
        'How can we improve employee engagement in safety programs?'
      );
    }
  }
  
  // Ensure we have at least 2 suggestions
  if (suggestions.length < 2) {
    suggestions.push('Would you like to see a sample safety checklist for this topic?');
  }
  
  // Make sure we're not repeating suggestions
  return [...new Set(suggestions)].slice(0, 3); 
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
    'lead', 'silica', 'radiation', 'hazardous waste', 'recordkeeping',
    'training', 'new employees', 'safety program', 'inspection', 'audit',
    'violation', 'fine', 'penalty', 'citation', 'compliance', 'standard'
  ];
  
  const topicsFound: string[] = [];
  
  // Look through recent messages (increased from 5 to 7 for better context memory)
  const recentMessages = messages.slice(-7);
  
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
