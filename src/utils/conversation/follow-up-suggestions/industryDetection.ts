
import { safetyKeywords } from './constants';

// Define industry keywords and suggestions for industryDetection.ts
export const industrySpecificKeywords: Record<string, string[]> = {
  'construction': ['construction site', 'jobsite', 'building', 'scaffolding', 'crane', 'excavation'],
  'manufacturing': ['factory', 'production', 'assembly line', 'machine shop', 'fabrication'],
  'healthcare': ['hospital', 'clinic', 'patient', 'medical', 'nursing', 'healthcare'],
  'logistics': ['warehouse', 'forklift', 'shipping', 'distribution', 'loading dock'],
  'laboratory': ['lab', 'laboratory', 'research', 'experiment', 'chemical', 'testing'],
  'oil_gas': ['oil', 'gas', 'drilling', 'refinery', 'pipeline', 'petroleum'],
  'mining': ['mine', 'mining', 'underground', 'quarry', 'extraction']
};

export const industrySpecificSuggestions: Record<string, string[]> = {
  'construction': [
    "What fall protection is required on a residential construction site?",
    "How often should scaffolding be inspected?",
    "What are the requirements for crane operator certification?"
  ],
  'manufacturing': [
    "What are the machine guarding requirements for punch presses?",
    "How should we implement lockout/tagout in our production line?",
    "What is the proper way to store chemicals in our manufacturing facility?"
  ],
  'healthcare': [
    "What are the bloodborne pathogen requirements for our clinic?",
    "How do we properly handle sharps and medical waste?",
    "What PPE is required for staff working with COVID patients?"
  ],
  'logistics': [
    "What are the safety requirements for forklift operators?",
    "How do we manage loading dock safety?",
    "What are the regulations for racking and storage inspections?"
  ],
  'laboratory': [
    "What are the requirements for laboratory fume hoods?",
    "How should we store incompatible chemicals?",
    "What emergency equipment is required in our research lab?"
  ],
  'oil_gas': [
    "What are the H2S safety requirements?",
    "How should we manage hot work permits on our site?",
    "What are the confined space requirements for tank entry?"
  ],
  'mining': [
    "What are the ventilation requirements for underground mining?",
    "How often should self-rescuers be inspected?",
    "What are the ground control plan requirements?"
  ]
};

/**
 * Detect industry context from user query and conversation history
 */
export const detectIndustryContext = (query: string, previousMessages: string[] = []): string | null => {
  const allText = [query, ...previousMessages].join(' ').toLowerCase();
  
  for (const [industry, keywords] of Object.entries(industrySpecificKeywords)) {
    if (keywords.some(keyword => allText.includes(keyword.toLowerCase()))) {
      return industry;
    }
  }
  
  return null;
};

/**
 * Get industry-specific follow-up suggestions
 */
export const getIndustrySpecificSuggestions = (industry: string | null): string[] => {
  if (!industry || !industrySpecificSuggestions[industry]) {
    return [
      "What industry-specific safety regulations apply to your workplace?",
      "Are there any specific safety concerns in your industry I can help with?",
      "What type of work environment are you asking about?"
    ];
  }
  
  return industrySpecificSuggestions[industry];
};
