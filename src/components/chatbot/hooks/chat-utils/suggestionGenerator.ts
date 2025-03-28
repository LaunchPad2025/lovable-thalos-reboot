
/**
 * Generate topic-specific follow-up suggestions
 */
export const generateTopicSpecificSuggestions = (topic: string): string[] => {
  const suggestions: Record<string, string[]> = {
    'chemical safety': [
      "What PPE is required for chemical handling?",
      "How should we store flammable chemicals?",
      "What training is required for GHS compliance?"
    ],
    'fall protection': [
      "What height requires fall protection?",
      "How often should we inspect fall protection equipment?",
      "What documentation is needed for fall protection training?"
    ],
    'personal protective equipment': [
      "How do I document PPE hazard assessments?",
      "What training is required for PPE users?",
      "How often should different types of PPE be replaced?"
    ],
    'safety training': [
      "How should I document safety training?",
      "What topics should be included in new hire safety orientation?",
      "How often should refresher training be conducted?"
    ],
    'hazard assessment': [
      "Can you provide a hazard assessment template?",
      "How often should hazard assessments be updated?",
      "Who should be involved in conducting hazard assessments?"
    ],
    'job safety analysis': [
      "What are the key components of a JSA?",
      "How detailed should each step be in a JSA?",
      "How do I prioritize which jobs need a JSA?"
    ],
    'workplace safety': [
      "What are the essential elements of a safety program?",
      "How do I develop a safety training matrix?",
      "What safety documentation is required by OSHA?"
    ]
  };
  
  // Return topic-specific suggestions or default ones
  return suggestions[topic] || [
    "What specific safety topic are you most interested in?",
    "Would you like information about a particular OSHA regulation?",
    "Do you need help with safety program documentation?"
  ];
};
