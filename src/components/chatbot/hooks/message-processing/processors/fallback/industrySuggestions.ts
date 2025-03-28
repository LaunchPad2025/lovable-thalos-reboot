
/**
 * Get industry-specific follow-up suggestions
 */
export const getIndustrySpecificSuggestions = (industry: string | null): string[] => {
  if (!industry) {
    return [
      "What specific safety topic are you interested in?",
      "Tell me about Fall Protection requirements",
      "What are the Chemical Safety (HazCom) rules?",
      "Explain Confined Space Entry requirements",
      "What PPE is required for my industry?"
    ];
  }
  
  // Industry-specific suggestions
  const suggestions: Record<string, string[]> = {
    'oil_gas': [
      "What are the key components of Process Safety Management?",
      "What requirements apply to H2S monitoring?",
      "What training is required for hot work permits?",
      "How should we document confined space entries?"
    ],
    'construction': [
      "What are the fall protection requirements for my job site?",
      "What are OSHA's scaffolding requirements?",
      "How should we document excavation inspections?",
      "What PPE is required for concrete work?"
    ],
    'manufacturing': [
      "What machine guarding requirements apply to our equipment?",
      "How should we implement lockout/tagout procedures?",
      "What are the requirements for powered industrial trucks?",
      "How should we document chemical safety training?"
    ],
    'healthcare': [
      "What are the bloodborne pathogen requirements?",
      "How should we handle sharps and needlestick prevention?",
      "What are the requirements for handling hazardous drugs?",
      "How can we prevent workplace violence in healthcare?"
    ],
    'logistics': [
      "What are the safety requirements for forklifts?",
      "How can we improve loading dock safety?",
      "What are the requirements for material storage and racking?",
      "How should we document forklift training?"
    ]
  };
  
  return suggestions[industry] || [
    "What specific safety requirements apply to your operations?",
    "How should you document safety training?",
    "What PPE is required for your work activities?",
    "How can you improve your inspection procedures?"
  ];
};
