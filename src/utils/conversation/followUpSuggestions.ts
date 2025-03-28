
// Safety-related keyword map for generating contextual and actionable follow-up questions
const safetyKeywords = {
  'ppe': [
    'Would you like a PPE selection guide for your industry?', 
    'Should I help you create a PPE training checklist?',
    'Do you need a template for documenting PPE inspections?'
  ],
  'chemical': [
    'Would you like a sample chemical inventory spreadsheet?', 
    'Should I help you create a chemical storage compatibility chart?',
    'Do you need a template for a chemical spill response plan?'
  ],
  'training': [
    'Would you like a training documentation template?', 
    'Should I help you develop a training effectiveness evaluation?',
    'Do you need a sample training matrix for your team?'
  ],
  'fall': [
    'Would you like a fall protection inspection checklist?', 
    'Should I help you create a fall protection plan template?',
    'Do you need a harness inspection guide for your team?'
  ],
  'hazard': [
    'Would you like a hazard assessment template?',
    'Should I help you create a job safety analysis form?',
    'Do you need a guide for prioritizing hazard controls?'
  ],
  'violation': [
    'Would you like a violation abatement tracking template?',
    'Should I help you create a corrective action plan?',
    'Do you need a guide for preparing violation contest documentation?'
  ],
  'regulations': [
    'Would you like a compliance calendar for upcoming deadlines?',
    'Should I help you create a regulatory requirements tracker?',
    'Do you need a documentation preparation checklist for inspections?'
  ],
  'fine': [
    'Would you like a guide on penalty reduction programs?',
    'Should I help you develop a financial impact assessment for violations?',
    'Do you need tips for developing an effective abatement strategy?'
  ],
  'inspection': [
    'Would you like an inspection preparation checklist?',
    'Should I help you create a self-inspection program?',
    'Do you need templates for documenting inspection findings?'
  ],
  'employee': [
    'Would you like a template for documenting employee safety concerns?',
    'Should I help you create an employee safety suggestion system?',
    'Do you need a safety responsibilities checklist by role?'
  ],
  'document': [
    'Would you like a safety documentation organization guide?',
    'Should I help you create a documentation retention schedule?',
    'Do you need templates for common safety records?'
  ],
  'incident': [
    'Would you like an incident investigation form template?',
    'Should I help you create a near-miss reporting system?',
    'Do you need a root cause analysis worksheet?'
  ],
  'audit': [
    'Would you like a pre-audit preparation checklist?',
    'Should I help you create an audit findings tracking system?',
    'Do you need a template for developing corrective action plans?'
  ]
};

/**
 * Generate relevant and actionable follow-up questions based on the conversation
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
  
  // If no specific keywords matched, analyze the intent and provide relevant actionable follow-ups
  if (suggestions.length === 0) {
    if (combinedText.includes('osha') || combinedText.includes('regulation')) {
      suggestions.push('Would you like a compliance documentation checklist for this regulation?');
    } else if (combinedText.includes('accident') || combinedText.includes('incident')) {
      suggestions.push('Would you like an incident investigation form template?');
    } else if (combinedText.includes('inspect') || combinedText.includes('audit')) {
      suggestions.push('Would you like a ready-to-use inspection form for this topic?');
    } else {
      // Generic but still actionable follow-ups
      suggestions.push(
        'Would you like me to create a simple checklist for this topic?',
        'Should I help you develop a written procedure for this?'
      );
    }
  }
  
  // Ensure we have at least 2 suggestions
  if (suggestions.length < 2) {
    suggestions.push('Would you like a sample document template for this topic?');
  }
  
  // Add a specific practical follow-up
  if (!suggestions.some(s => s.includes("train"))) {
    suggestions.push('Would you like a quick training outline on this topic?');
  }
  
  // Make sure we're not repeating suggestions
  return [...new Set(suggestions)].slice(0, 3); 
}
