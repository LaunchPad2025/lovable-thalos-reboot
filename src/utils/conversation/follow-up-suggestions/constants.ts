
/**
 * Constants for follow-up suggestions
 */

// Enhanced safety keywords with more conversational options and alternatives
export const safetyKeywords: Record<string, string[]> = {
  // Fall Protection with alternative phrasing
  'fall protection': [
    "What height requires fall protection?",
    "How often should fall protection equipment be inspected?",
    "What documentation is needed for fall protection training?",
    "Do I need a personal fall arrest system or is a guardrail sufficient?",
    "What's the proper way to tie off with a lanyard?"
  ],
  
  // Alternative phrases for fall protection
  'when is fall protection required': [
    "What height requires fall protection?",
    "Does OSHA specify different height requirements by industry?",
    "What qualifies as adequate fall protection systems?"
  ],
  
  'what height needs harness': [
    "At what height is fall protection required?",
    "When do workers need to wear a harness?",
    "What are the height requirements for fall protection in construction?"
  ],
  
  'rooftop work': [
    "What are the safety requirements for rooftop work?",
    "Do I need guardrails on a roof?",
    "What fall protection is required for low-slope roofs?"
  ],
  
  // Chemical Safety / HazCom with alternative phrasing
  'chemical safety': [
    "What GHS labels are required for chemical containers?",
    "How should we store incompatible chemicals?",
    "What chemical safety training is required for employees?",
    "How often should we update safety data sheets?",
    "What is required in a hazard communication program?"
  ],
  
  // Alternative phrases for chemical safety
  'label chemical containers': [
    "What's required on a GHS compliant label?",
    "Do secondary containers need the same labeling?",
    "What symbols are required on chemical labels?"
  ],
  
  'store flammable materials': [
    "What type of cabinet is required for flammables?",
    "How should we store flammable liquids?",
    "What are the quantity limits for flammable storage?"
  ],
  
  'safety data sheet': [
    "What sections must be included in an SDS?",
    "How accessible do safety data sheets need to be?",
    "Do we need to update our SDS when a new revision is available?"
  ],
  
  // Machine Safety / LOTO with alternative phrasing
  'lockout/tagout': [
    "What are the key components of a lockout/tagout program?",
    "Who needs to be trained on lockout/tagout procedures?",
    "How often should lockout/tagout procedures be reviewed?",
    "What documentation is required for LOTO?",
    "When is group lockout permitted?"
  ],
  
  // Alternative phrases for LOTO
  'what is loto': [
    "What does a lockout/tagout program include?",
    "Who needs to be trained in lockout/tagout?",
    "What equipment requires lockout/tagout procedures?"
  ],
  
  'lock out machine': [
    "What are the steps in a proper lockout procedure?",
    "Who is authorized to perform lockout?",
    "What happens if a lock needs to be removed when someone is absent?"
  ],
  
  // Confined Spaces with alternative phrasing
  'confined space': [
    "What testing is required before confined space entry?",
    "Who needs to be involved in a confined space entry?",
    "What rescue provisions are required for confined spaces?",
    "How do you determine if a space is permit-required?",
    "What training is needed for confined space entry?"
  ],
  
  // Alternative phrases for confined spaces
  'permit for tank entry': [
    "What needs to be included on a confined space permit?",
    "How long is a confined space entry permit valid?",
    "Who needs to sign off on a confined space permit?"
  ],
  
  'tested before entering': [
    "What atmospheric testing is required for confined spaces?",
    "How often should air monitoring be performed during entry?",
    "What oxygen levels are safe for confined space entry?"
  ],
  
  // PPE with alternative phrasing
  'ppe': [
    "How do I document PPE hazard assessments?",
    "What training is required for PPE users?",
    "How often should different types of PPE be replaced?",
    "Who pays for required PPE?",
    "What are the recordkeeping requirements for PPE?"
  ],
  
  // Alternative phrases for PPE
  'ppe required for welding': [
    "What PPE is needed when welding?",
    "What type of eye protection is required for welding?",
    "Do welders need respirators?"
  ],
  
  'need respirator': [
    "When are respirators required?",
    "What medical evaluation is needed before using a respirator?",
    "How often should respirator fit testing be performed?"
  ],
  
  // General safety topics
  'safety training': [
    "What should be included in new employee safety orientation?",
    "How often should safety refresher training be conducted?",
    "How should I document safety training?",
    "What training is required by OSHA for my industry?",
    "Can you provide a safety training matrix template?"
  ],
  
  'hazard assessment': [
    "How do I conduct a proper job hazard analysis?",
    "How often should hazard assessments be updated?",
    "What documentation is required for hazard assessments?",
    "Who should be involved in conducting hazard assessments?",
    "Can you provide a hazard assessment template?"
  ],
  
  'incident reporting': [
    "What incidents need to be reported to OSHA?",
    "How do I calculate incident rates?",
    "What information should be included in an incident report?",
    "How long do I need to keep incident records?",
    "What is considered a near miss?"
  ]
};
