
/**
 * Constants for follow-up suggestion generation
 */

// Safety-related keyword map for generating contextual and actionable follow-up questions
export const safetyKeywords = {
  'ppe': [
    'Would you like a PPE selection guide for your industry?', 
    'Should I help you create a PPE training checklist?',
    'Do you need a template for documenting PPE inspections?'
  ],
  'fall': [
    'Would you like a fall protection inspection checklist template?', 
    'Should I help you create a fall protection plan template?',
    'Do you need a harness inspection guide for your team?'
  ],
  'fall protection': [
    'Would you like a fall protection inspection checklist template?', 
    'Should I help you create a fall protection plan template?',
    'Do you need a harness inspection guide for your team?'
  ],
  'fall arrest': [
    'Would you like a fall arrest system inspection form?',
    'Do you need guidance on selecting proper anchorage points?',
    'Should I provide information on fall clearance calculations?'
  ],
  'scaffold': [
    'Would you like a scaffold inspection checklist?',
    'Do you need information on scaffold tagging systems?',
    'Should I provide scaffold erection guidelines?'
  ],
  'harness': [
    'Would you like a harness inspection checklist?',
    'Do you need guidelines for proper harness fit and adjustment?',
    'Should I provide information on harness maintenance?'
  ],
  'guardrail': [
    'Would you like specifications for OSHA-compliant guardrail systems?',
    'Do you need a guardrail inspection form?',
    'Should I provide temporary guardrail installation guidance?'
  ],
  'chemical': [
    'Would you like a sample chemical inventory spreadsheet?', 
    'Should I help you create a chemical storage compatibility chart?',
    'Do you need a template for a chemical spill response plan?'
  ],
  'hazcom': [
    'Would you like a chemical labeling compliance guide?',
    'Should I help you create an SDS management system?',
    'Do you need a GHS pictogram quick reference chart?'
  ],
  'confined space': [
    'Would you like a confined space entry permit template?',
    'Should I help you develop atmospheric testing procedures?',
    'Do you need a confined space rescue plan outline?'
  ],
  'respiratory': [
    'Would you like a respirator selection flowchart?',
    'Should I help you create a respiratory protection program?',
    'Do you need a fit testing documentation form?'
  ],
  'excavation': [
    'Would you like a daily excavation inspection form?',
    'Should I help you create a soil classification guide?',
    'Do you need protective system selection guidance?'
  ],
  'bloodborne': [
    'Would you like an exposure control plan template?',
    'Should I help you create a sharps injury log?',
    'Do you need bloodborne pathogens training materials?'
  ],
  'training': [
    'Would you like a downloadable training documentation template?', 
    'Should I help you develop a training effectiveness evaluation form?',
    'Do you need a sample training matrix for your team?'
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
  ],
  'ladder': [
    'Would you like a ladder inspection checklist?',
    'Should I help you create a ladder safety training guide?',
    'Do you need a poster showing proper ladder setup angles?'
  ],
  'electrical': [
    'Would you like an electrical safety program template?',
    'Should I help you create a lockout/tagout procedure for electrical equipment?',
    'Do you need an arc flash hazard assessment guide?'
  ],
  'fire': [
    'Would you like a fire extinguisher inspection log?',
    'Should I help you create an emergency evacuation plan?',
    'Do you need a fire prevention plan template?'
  ],
  'recordkeeping': [
    'Would you like an OSHA recordkeeping decision flowchart?',
    'Should I help you create an injury and illness log template?',
    'Do you need guidance on determining work-relatedness?'
  ]
};

// Industry-specific recommendations for more targeted follow-ups
export const industrySpecificKeywords = {
  'construction': ['fall protection', 'scaffolding', 'trenching', 'silica', 'crane', 'ladder', 'steel erection', 'demolition', 'concrete', 'rebar'],
  'healthcare': ['bloodborne', 'patient handling', 'sharps', 'hazardous drugs', 'radiation', 'infectious waste', 'needle safety', 'ergonomics'],
  'manufacturing': ['machine guarding', 'lockout', 'ergonomics', 'confined space', 'robotics', 'forklift', 'electrical', 'noise', 'dust control'],
  'warehouse': ['forklift', 'pallet jack', 'racking', 'ergonomics', 'loading dock', 'material handling', 'pedestrian safety', 'floor marking'],
  'food': ['sanitation', 'food handling', 'allergens', 'slip prevention', 'knife safety', 'food equipment', 'hot surfaces', 'refrigeration'],
  'energy': ['confined space', 'excavation', 'hot work', 'electrical', 'fall protection', 'process safety', 'hazardous energy', 'radiation'],
  'transportation': ['driver safety', 'hours of service', 'pre-trip inspection', 'cargo securement', 'vehicle maintenance', 'fatigue management'],
  'oil and gas': ['process safety', 'h2s', 'hot work', 'confined space', 'fall protection', 'explosion protection', 'drilling safety']
};

// Industry-specific suggestion templates
export const industrySpecificSuggestions = {
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
  ],
  'oil and gas': [
    'Would you like a H2S safety program template?',
    'Need a hot work permit system for drilling operations?',
    'Should I create a process safety management audit form?'
  ]
};

