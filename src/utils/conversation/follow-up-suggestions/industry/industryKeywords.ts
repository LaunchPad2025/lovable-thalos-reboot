
/**
 * Industry-specific keywords and categories for detection
 */

// Industry-specific keywords for detection
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

// Top safety categories by industry
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

// Industry-specific follow-up suggestions
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
