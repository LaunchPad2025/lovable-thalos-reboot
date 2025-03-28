import { safetyKeywords } from './constants';

// Define industry keywords and suggestions for industryDetection.ts
export const industrySpecificKeywords: Record<string, string[]> = {
  'construction': ['construction site', 'jobsite', 'building', 'scaffolding', 'crane', 'excavation', 'construction', 'builder', 'contractor'],
  'manufacturing': ['factory', 'production', 'assembly line', 'machine shop', 'fabrication', 'manufacturing', 'plant', 'industrial'],
  'healthcare': ['hospital', 'clinic', 'patient', 'medical', 'nursing', 'healthcare', 'health care', 'medical facility', 'doctors', 'nurses'],
  'logistics': ['warehouse', 'forklift', 'shipping', 'distribution', 'loading dock', 'logistics', 'supply chain', 'inventory'],
  'laboratory': ['lab', 'laboratory', 'research', 'experiment', 'chemical', 'testing', 'scientific', 'samples'],
  'oil_gas': [
    'oil', 'gas', 'drilling', 'refinery', 'refineries', 'petrochemical', 'petroleum', 
    'pipeline', 'petroleum', 'rig', 'offshore', 'oil & gas', 'oil and gas', 'well',
    'process safety', 'psm', 'hazwoper', 'h2s', 'sour gas', 'upstream', 'downstream',
    'midstream', 'fracking', 'crude oil', 'natural gas'
  ],
  'mining': ['mine', 'mining', 'underground', 'quarry', 'extraction', 'mineral', 'coal', 'metals', 'excavation'],
  'agriculture': ['farm', 'farming', 'agricultural', 'crops', 'livestock', 'pesticide', 'tractor', 'harvesting'],
  'retail': ['store', 'retail', 'shop', 'customer', 'merchandise', 'sales floor', 'checkout'],
  'food_processing': ['food processing', 'food manufacturing', 'kitchen', 'restaurant', 'bakery', 'meat processing']
};

// Top safety categories by industry for better fallback responses
export const industryTopSafetyCategories: Record<string, string[]> = {
  'construction': ['Fall Protection', 'Electrical Safety', 'Trenching and Excavation', 'Struck-by Hazards', 'Scaffolding'],
  'manufacturing': ['Machine Guarding', 'Lockout/Tagout', 'Hazardous Materials', 'Ergonomics', 'Electrical Safety'],
  'healthcare': ['Bloodborne Pathogens', 'Ergonomics', 'Workplace Violence', 'Hazardous Drugs', 'Needlestick Prevention'],
  'logistics': ['Forklift Safety', 'Material Handling', 'Loading Dock Safety', 'Racking and Storage', 'Pedestrian Safety'],
  'laboratory': ['Chemical Safety', 'Biological Safety', 'Emergency Equipment', 'Fume Hood Operations', 'PPE Requirements'],
  'oil_gas': [
    'Process Safety Management (29 CFR 1910.119)', 
    'H2S Safety Monitoring and Response', 
    'Hot Work Permits (29 CFR 1910.252)', 
    'Confined Space Entry (29 CFR 1910.146)', 
    'Emergency Response Planning (29 CFR 1910.120)',
    'Lockout/Tagout Procedures (29 CFR 1910.147)'
  ],
  'mining': ['Ground Control', 'Ventilation', 'Explosive Safety', 'Respiratory Protection', 'Equipment Operation'],
  'agriculture': ['Tractor Safety', 'Pesticide Handling', 'Grain Handling', 'Animal Handling', 'Machinery Guarding'],
  'retail': ['Ergonomics', 'Slip and Fall Prevention', 'Emergency Exits', 'Ladder Safety', 'Violence Prevention'],
  'food_processing': ['Machine Guarding', 'Lockout/Tagout', 'Ergonomics', 'Slip Resistance', 'Chemical Safety']
};

export const industrySpecificSuggestions: Record<string, string[]> = {
  'construction': [
    "What fall protection is required on a residential construction site?",
    "How often should scaffolding be inspected?",
    "What are the requirements for crane operator certification?",
    "What are the OSHA regulations for trenching and excavation?",
    "How do I develop a site-specific safety plan for construction?"
  ],
  'manufacturing': [
    "What are the machine guarding requirements for punch presses?",
    "How should we implement lockout/tagout in our production line?",
    "What is the proper way to store chemicals in our manufacturing facility?",
    "What PPE is required for welding operations?",
    "How do I conduct a proper machine risk assessment?"
  ],
  'healthcare': [
    "What are the bloodborne pathogen requirements for our clinic?",
    "How do we properly handle sharps and medical waste?",
    "What PPE is required for staff working with COVID patients?",
    "What are the safety requirements for handling hazardous drugs?",
    "How do we prevent workplace violence in healthcare settings?"
  ],
  'logistics': [
    "What are the safety requirements for forklift operators?",
    "How do we manage loading dock safety?",
    "What are the regulations for racking and storage inspections?",
    "What is required in a material handling training program?",
    "How do we implement pedestrian safety in a warehouse?"
  ],
  'laboratory': [
    "What are the requirements for laboratory fume hoods?",
    "How should we store incompatible chemicals?",
    "What emergency equipment is required in our research lab?",
    "What are the OSHA regulations for laboratory safety?",
    "How should we document laboratory safety training?"
  ],
  'oil_gas': [
    "What are the Process Safety Management (PSM) requirements for refineries?",
    "How should we implement H2S monitoring in our facility?",
    "What hot work permit procedures are required for oil & gas operations?",
    "What are the confined space requirements for tank entry?",
    "What PPE is required for refinery operations?"
  ],
  'mining': [
    "What are the ventilation requirements for underground mining?",
    "How often should self-rescuers be inspected?",
    "What are the ground control plan requirements?",
    "What respiratory protection is needed for miners?",
    "What are the MSHA requirements for mine rescue teams?"
  ],
  'agriculture': [
    "What are the safety requirements for pesticide application?",
    "How do we prevent tractor rollover incidents?",
    "What are the requirements for grain bin entry?",
    "What training is required for agricultural workers?",
    "How do we develop an emergency response plan for our farm?"
  ],
  'retail': [
    "What are the emergency exit requirements for retail stores?",
    "How do we prevent slips, trips, and falls in our retail space?",
    "What are the ladder safety requirements for stockroom work?",
    "How do we develop a workplace violence prevention program?",
    "What ergonomic guidelines apply to checkout stations?"
  ],
  'food_processing': [
    "What are the machine guarding requirements for food processing equipment?",
    "What are the lockout/tagout procedures for cleaning equipment?",
    "What are the requirements for chemical use in food processing?",
    "How do we prevent ergonomic injuries in food production?",
    "What are the requirements for slip-resistant flooring in wet areas?"
  ]
};

/**
 * Detect industry context from user query and conversation history
 * Enhanced to provide more robust industry detection, especially for refineries
 */
export const detectIndustryContext = (query: string, previousMessages: string[] = []): string | null => {
  const allText = [query, ...previousMessages].join(' ').toLowerCase();
  
  // Special case for refineries - explicitly map to oil_gas
  if (allText.includes('refinery') || allText.includes('refineries') || 
      allText.includes('petrochemical') || allText.includes('petroleum processing')) {
    return 'oil_gas';
  }
  
  // First check for direct industry mentions
  for (const [industry, keywords] of Object.entries(industrySpecificKeywords)) {
    if (keywords.some(keyword => allText.includes(keyword.toLowerCase()))) {
      return industry;
    }
  }
  
  // If no direct industry mention, check for related safety topics that imply an industry
  const safetyTopics: Record<string, string> = {
    'scaffolding': 'construction',
    'crane': 'construction',
    'excavation': 'construction',
    'machine guarding': 'manufacturing',
    'assembly line': 'manufacturing',
    'hazardous drugs': 'healthcare',
    'patient': 'healthcare',
    'forklift': 'logistics',
    'warehouse': 'logistics',
    'chemical hood': 'laboratory',
    'experiment': 'laboratory',
    'h2s': 'oil_gas',
    'drilling': 'oil_gas',
    'process safety': 'oil_gas',
    'hot work permit': 'oil_gas',
    'ventilation in mines': 'mining',
    'underground': 'mining',
    'pesticide': 'agriculture',
    'tractor': 'agriculture',
    'retail store': 'retail',
    'merchandise': 'retail',
    'food processing': 'food_processing',
    'meat processing': 'food_processing'
  };
  
  for (const [topic, industry] of Object.entries(safetyTopics)) {
    if (allText.includes(topic.toLowerCase())) {
      return industry;
    }
  }
  
  return null;
};

/**
 * Get industry-specific follow-up suggestions
 * Enhanced to provide more relevant suggestions based on industry context
 */
export const getIndustrySpecificSuggestions = (industry: string | null): string[] => {
  if (!industry || !industrySpecificSuggestions[industry]) {
    return [
      "What industry-specific safety regulations apply to your workplace?",
      "Are there any specific safety concerns in your industry I can help with?",
      "What type of work environment are you asking about?"
    ];
  }
  
  // Return industry-specific suggestions
  return industrySpecificSuggestions[industry].slice(0, 3);
};

/**
 * Get the top safety categories for a specific industry
 * Used for improved fallback responses when no exact regulation match is found
 */
export const getTopSafetyCategoriesByIndustry = (industry: string | null): string[] => {
  if (!industry || !industryTopSafetyCategories[industry]) {
    return [
      "Fall Protection",
      "Hazard Communication",
      "Respiratory Protection",
      "Machine Guarding",
      "Electrical Safety"
    ];
  }
  
  return industryTopSafetyCategories[industry].slice(0, 3);
};

/**
 * Format a fallback response that uses industry context
 * Enhanced for oil & gas/refinery specific responses
 */
export const formatIndustryFallbackResponse = (industry: string | null, query: string): string => {
  if (!industry) {
    return `I wasn't able to find a specific regulation that matches your query. Could you provide more details about your industry or the specific hazard you're concerned about?`;
  }
  
  const formattedIndustry = industry.replace('_', ' ');
  const topCategories = getTopSafetyCategoriesByIndustry(industry);
  
  // Specialized response for oil & gas industry
  if (industry === 'oil_gas') {
    // Check if refinery specific
    if (query.toLowerCase().includes('refiner')) {
      return `**Oil Refinery Safety Regulations**

OSHA's Process Safety Management standard (29 CFR 1910.119) applies specifically to petroleum refineries and facilities with hazardous chemicals above threshold quantities.

Key safety requirements for refineries include:

• Process Safety Management (PSM) program implementation
• H2S safety programs and continuous air monitoring
• Permit-required confined space entry procedures
• Hot work permits for welding and cutting (29 CFR 1910.252)
• Emergency response planning (29 CFR 1910.120)
• Lockout/Tagout (LOTO) procedures (29 CFR 1910.147)

Would you like information about implementing any of these specific refinery safety programs?`;
    }
    
    // General oil & gas response
    return `**Oil & Gas Safety Regulations**

The oil & gas industry is governed by several OSHA standards, with these being most critical:

• Process Safety Management (29 CFR 1910.119) for facilities with threshold quantities of hazardous chemicals
• HAZWOPER (29 CFR 1910.120) for emergency response to releases
• Confined spaces (29 CFR 1910.146) for tank and vessel entry
• Hot work (29 CFR 1910.252) for welding and cutting operations
• Respiratory protection (29 CFR 1910.134) for H2S and other hazards

Would you like more specific information about any of these regulations for the ${formattedIndustry} industry?`;
  }
  
  // For other industries, use the standard response
  const topCategoriesList = topCategories.map(cat => `• ${cat}`).join('\n');
  
  return `I wasn't able to find a regulation specifically for ${formattedIndustry} safety protocols as requested, but here are the top compliance areas for that industry:

${topCategoriesList}

Would you like more specific information about any of these areas in the ${formattedIndustry} industry?`;
};
