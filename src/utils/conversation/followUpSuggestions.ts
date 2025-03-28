
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
    'Would you like a downloadable training documentation template?', 
    'Should I help you develop a training effectiveness evaluation form?',
    'Do you need a sample training matrix for your team?'
  ],
  'fall': [
    'Would you like a fall protection inspection checklist template?', 
    'Should I help you create a fall protection plan template?',
    'Do you need a harness inspection guide for your team?'
  ],
  'hazard': [
    'Would you like a downloadable hazard assessment template?',
    'Should I help you create a job safety analysis form?',
    'Do you need a guide for prioritizing hazard controls?'
  ],
  'violation': [
    'Would you like a violation abatement tracking template?',
    'Should I help you create a corrective action plan form?',
    'Do you need a guide for preparing violation contest documentation?'
  ],
  'regulations': [
    'Would you like a downloadable compliance calendar for upcoming deadlines?',
    'Should I help you create a regulatory requirements tracker?',
    'Do you need a documentation preparation checklist for inspections?'
  ],
  'fine': [
    'Would you like a guide on penalty reduction programs?',
    'Should I help you develop a financial impact assessment for violations?',
    'Do you need tips for developing an effective abatement strategy?'
  ],
  'inspection': [
    'Would you like a downloadable inspection preparation checklist?',
    'Should I help you create a self-inspection program template?',
    'Do you need templates for documenting inspection findings?'
  ],
  'employee': [
    'Would you like a template for documenting employee safety concerns?',
    'Should I help you create an employee safety suggestion system?',
    'Do you need a safety responsibilities checklist by role?'
  ],
  'document': [
    'Would you like a downloadable safety documentation organization guide?',
    'Should I help you create a documentation retention schedule?',
    'Do you need templates for common safety records?'
  ],
  'incident': [
    'Would you like a downloadable incident investigation form template?',
    'Should I help you create a near-miss reporting system?',
    'Do you need a root cause analysis worksheet?'
  ],
  'audit': [
    'Would you like a downloadable pre-audit preparation checklist?',
    'Should I help you create an audit findings tracking system?',
    'Do you need a template for developing corrective action plans?'
  ],
  'forklift': [
    'Would you like a downloadable forklift operator evaluation form?',
    'Should I help you create a forklift inspection checklist?',
    'Do you need a forklift safety training presentation outline?'
  ],
  'warehouse': [
    'Would you like a warehouse safety checklist template?',
    'Should I help you create a warehouse ergonomics assessment form?',
    'Do you need a racking inspection guide for your facility?'
  ],
  'construction': [
    'Would you like a downloadable construction safety plan template?',
    'Should I help you create a toolbox talk schedule for your site?',
    'Do you need a scaffold inspection checklist?'
  ],
  'healthcare': [
    'Would you like a downloadable bloodborne pathogens exposure control plan?',
    'Should I help you create a sharps injury log template?',
    'Do you need a patient handling assessment form?'
  ],
  'manufacturing': [
    'Would you like a downloadable machine guarding audit form?',
    'Should I help you create a lockout/tagout procedure template?',
    'Do you need an equipment-specific training matrix?'
  ],
  'matrix': [
    'Would you like a downloadable training matrix template for your industry?',
    'Should I help you create a role-based certification tracker?',
    'Do you need a checklist for setting up a new employee in your training system?'
  ],
  'calendar': [
    'Would you like a downloadable annual safety training calendar template?',
    'Should I help you organize your training schedule by priority?',
    'Do you need a regulatory-based training frequency guide?'
  ]
};

// Industry-specific recommendations for more targeted follow-ups
const industrySpecificKeywords = {
  'construction': ['fall protection', 'scaffolding', 'trenching', 'silica', 'crane', 'ladder'],
  'healthcare': ['bloodborne', 'patient handling', 'sharps', 'hazardous drugs', 'radiation'],
  'manufacturing': ['machine guarding', 'lockout', 'ergonomics', 'confined space', 'robotics'],
  'warehouse': ['forklift', 'pallet jack', 'racking', 'ergonomics', 'loading dock'],
  'food': ['sanitation', 'food handling', 'allergens', 'slip prevention', 'knife safety'],
  'energy': ['confined space', 'excavation', 'hot work', 'electrical', 'fall protection'],
  'transportation': ['driver safety', 'hours of service', 'pre-trip inspection', 'cargo securement']
};

/**
 * Generate relevant and actionable follow-up questions based on the conversation
 * with improved formatting and organization
 * @param userQuery Last user message
 * @param aiResponse Last AI response
 * @returns Array of follow-up question suggestions
 */
export function generateFollowUpQuestions(userQuery: string, aiResponse: string): string[] {
  // Check for keywords in the user query and AI response
  const combinedText = (userQuery + ' ' + aiResponse).toLowerCase();
  const suggestions: string[] = [];
  
  // Detect industry context first for more relevant suggestions
  let detectedIndustry = null;
  for (const [industry, keywords] of Object.entries(industrySpecificKeywords)) {
    if (keywords.some(kw => combinedText.includes(kw)) || combinedText.includes(industry)) {
      detectedIndustry = industry;
      break;
    }
  }
  
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
      suggestions.push('Would you like a downloadable compliance documentation checklist for this regulation?');
    } else if (combinedText.includes('accident') || combinedText.includes('incident')) {
      suggestions.push('Would you like a downloadable incident investigation form template?');
    } else if (combinedText.includes('inspect') || combinedText.includes('audit')) {
      suggestions.push('Would you like a ready-to-use inspection form for this topic?');
    } else {
      // Generic but still actionable follow-ups
      suggestions.push(
        'Would you like me to create a simple downloadable checklist for this topic?',
        'Should I help you develop a written procedure template for this?'
      );
    }
  }
  
  // Add industry-specific suggestions if detected
  if (detectedIndustry && suggestions.length < 3) {
    const industrySpecificSuggestions = {
      'construction': [
        'Would you like a site safety inspection form for construction?',
        'Need a fall protection plan template for your construction site?',
        'Should I create a toolbox talk schedule for your construction crew?'
      ],
      'healthcare': [
        'Would you like a patient handling assessment form?',
        'Need a bloodborne pathogens exposure control plan template?',
        'Should I create an infectious waste management procedure?'
      ],
      'manufacturing': [
        'Would you like a machine-specific lockout/tagout procedure template?',
        'Need an ergonomic assessment form for manufacturing workstations?',
        'Should I create a PPE selection guide for your production areas?'
      ],
      'warehouse': [
        'Would you like a forklift operator certification tracking form?',
        'Need a racking inspection checklist for your warehouse?',
        'Should I create a loading dock safety procedure?'
      ],
      'food': [
        'Would you like a food safety sanitation schedule template?',
        'Need an allergen control program document?',
        'Should I create a kitchen safety audit checklist?'
      ],
      'energy': [
        'Would you like an energized work permit template?',
        'Need a confined space entry procedure document?',
        'Should I create a hot work safety program outline?'
      ],
      'transportation': [
        'Would you like a driver qualification file checklist?',
        'Need a pre-trip inspection form template?',
        'Should I create a hours-of-service tracking log?'
      ]
    };
    
    const industrySuggestions = industrySpecificSuggestions[detectedIndustry as keyof typeof industrySpecificSuggestions];
    if (industrySuggestions) {
      // Add a random industry-specific suggestion
      suggestions.push(industrySuggestions[Math.floor(Math.random() * industrySuggestions.length)]);
    }
  }
  
  // Ensure we have at least 2 suggestions
  if (suggestions.length < 2) {
    suggestions.push('Would you like a downloadable template or sample document for this topic?');
  }
  
  // Add a specific practical follow-up
  if (!suggestions.some(s => s.includes("train"))) {
    suggestions.push('Would you like a quick training outline on this topic?');
  }
  
  // Make sure we're not repeating suggestions
  return [...new Set(suggestions)].slice(0, 3); 
}
