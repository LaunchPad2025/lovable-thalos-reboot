
// Safety-related keyword map for generating contextual follow-up questions
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

/**
 * Generate relevant follow-up questions based on the conversation
 * @param userQuery Last user message
 * @param aiResponse Last AI response
 * @returns Array of follow-up question suggestions
 */
export function generateFollowUpQuestions(userQuery: string, aiResponse: string): string[] {
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
  
  // Add a specific practical follow-up
  if (!suggestions.some(s => s.includes("train"))) {
    suggestions.push('What training should our employees receive on this topic?');
  }
  
  // Make sure we're not repeating suggestions
  return [...new Set(suggestions)].slice(0, 3); 
}
