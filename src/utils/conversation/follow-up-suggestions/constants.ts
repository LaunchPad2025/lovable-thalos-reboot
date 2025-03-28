
/**
 * Constant definitions for safety keywords and suggestions
 */

// Safety keywords mapped to potential follow-up questions
export const safetyKeywords: Record<string, string[]> = {
  // Fall protection related
  'fall protection': [
    "What are the inspection requirements for fall protection equipment?",
    "How do I develop a site-specific fall protection plan?",
    "What training is required for workers using fall protection?"
  ],
  'harness': [
    "How often should harnesses be inspected?",
    "What documentation is required for harness inspections?",
    "How do you properly fit and adjust a safety harness?"
  ],
  
  // Chemical safety related
  'chemical safety': [
    "What GHS labels are required for chemical containers?",
    "How should we store incompatible chemicals?",
    "What training is required for employees who work with chemicals?"
  ],
  'hazcom': [
    "What elements are required in a HazCom program?",
    "How should we implement GHS labeling?",
    "What needs to be included in our chemical inventory?"
  ],
  
  // Oil & Gas specific keywords
  'refinery': [
    "What are the Process Safety Management (PSM) requirements for refineries?",
    "How should we implement H2S monitoring in our refinery?",
    "What hot work permit procedures are required for refineries?"
  ],
  'oil and gas': [
    "What are the key OSHA regulations for oil and gas operations?",
    "How do we implement a PSM program at our facility?",
    "What emergency response planning is required for oil and gas sites?"
  ],
  'process safety': [
    "What are the 14 elements of Process Safety Management?",
    "How do we conduct a Process Hazard Analysis (PHA)?",
    "What documentation is required for a PSM program?"
  ],
  'h2s': [
    "What H2S monitoring is required at oil and gas facilities?",
    "What respiratory protection is needed for H2S exposure?",
    "How should we develop an H2S contingency plan?"
  ],
  
  // Machine safety related
  'lockout tagout': [
    "What are the key components of a lockout/tagout program?",
    "Who needs to be trained on lockout/tagout procedures?",
    "How often should we review our machine guarding?"
  ],
  
  // Confined space related
  'confined space': [
    "What testing is required before confined space entry?",
    "Who needs to be involved in a confined space entry?",
    "What rescue provisions are required for confined spaces?"
  ],
  
  // Regulation citation related keywords
  '1910.119': [
    "What are the 14 elements of PSM required by 1910.119?",
    "How do we implement Process Safety Information for 1910.119?",
    "What Management of Change procedures are required by 1910.119?"
  ],
  '1926.501': [
    "What are the guardrail specifications in 1926.501?",
    "What fall protection is required for roofing work under 1926.501?",
    "How do we document fall protection training for 1926.501 compliance?"
  ],
  '1910.1200': [
    "What are the SDS requirements in 1910.1200?",
    "How do we implement GHS labeling under 1910.1200?",
    "What employee training is required by 1910.1200?"
  ],
  '1910.147': [
    "What are the key elements of a compliant lockout/tagout program?",
    "What periodic inspections are required for 1910.147 compliance?",
    "Who needs to be trained on LOTO procedures under 1910.147?"
  ]
};

// Add more constants as needed for other modules
