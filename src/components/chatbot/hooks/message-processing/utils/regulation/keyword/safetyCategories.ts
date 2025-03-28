
/**
 * Safety categories and associated keywords for regulation matching
 */

/**
 * Comprehensive dictionary of safety categories and their related terms
 * Organized by safety domain for better context matching
 */
export const safetyCategories: Record<string, string[]> = {
  // Fall Protection - expanded with more detailed terms and conversational phrases
  'fall protection': [
    'fall protection', 'fall arrest', 'tie-off', 'harness', 'scaffold safety', '1926.501', 
    'lanyard', 'guardrail', 'safety net', 'anchor point', 'lifeline', 'leading edge', 
    'fall restraint', 'fall prevention', 'height requirement', 'roof work', 'elevated work',
    'fall distance', 'fall clearance', 'self-retracting', '1910.28', 'floor opening',
    'rooftop', 'height', 'feet', 'falling', 'prevent falls', 'need guardrails', 'needs harness'
  ],
  
  // Chemical Safety / HazCom - expanded with conversational terms
  'chemical safety': [
    'hazcom', 'hazard communication', 'sds', 'safety data sheet', 'chemical label', 
    'pictogram', 'ghs', 'chemical storage', 'flammable cabinet', '1910.1200',
    'hazardous chemical', 'corrosive', 'toxic', 'oxidizer', 'container labeling',
    'secondary container', 'chemical inventory', 'chemical compatibility',
    'label chemical', 'chemical containers', 'flammable materials', 'store chemicals',
    'post chemical hazards', 'chemical hazard'
  ],
  
  // Machine Safety & Lockout/Tagout with conversational terms
  'machine safety': [
    'lockout', 'tagout', 'loto', 'machine guarding', 'point of operation', 'energy control',
    'zero energy', 'energy isolation', '1910.147', 'authorized employee', 'affected employee',
    'power transmission', 'pinch point', 'nip point', 'group lockout', 'machine safety',
    'lock out machine', 'tagging out', 'authorized for lockout', 'typical loto', 'loto checklist'
  ],
  
  // Fire Safety & Egress with conversational phrases
  'fire safety': [
    'fire extinguisher', 'fire safety', 'emergency exit', 'exit route', 'evacuation',
    'fire alarm', 'sprinkler', 'fire suppression', '1910.157', 'fire prevention',
    'flammable storage', 'exit sign', 'emergency lighting', 'fire drill', 'fire classification',
    'class a fire', 'class b fire', 'class c fire', 'class d fire', 'class k fire',
    'need fire extinguisher', 'fire drill frequency', 'emergency evacuation'
  ],
  
  // Confined Spaces with conversational phrases
  'confined space': [
    'confined space', 'permit required', 'entry permit', 'atmospheric testing', 
    'attendant', 'entrant', 'entry supervisor', '1910.146', 'rescue plan',
    'ventilation', 'gas monitor', 'air monitoring', 'limited egress', 'hazardous atmosphere',
    'engulfment', 'configuration trap', 'oxygen deficient', 'oxygen enriched',
    'qualifies as confined space', 'permit for tank entry', 'tested before entering',
    'sign off on confined space', 'rescue requirements'
  ],
  
  // Personal Protective Equipment with conversational phrases
  'ppe': [
    'ppe', 'personal protective', 'hard hat', 'safety glasses', 'face shield', 'gloves',
    'safety shoes', 'steel toe', 'ear protection', 'hearing protection', '1910.132',
    'eye protection', 'hand protection', 'foot protection', 'protective clothing',
    'cut resistant', 'impact resistant', 'arc flash', 'welding helmet',
    'ppe required for welding', 'need respirator', 'gloves required', 'ppe training rules',
    'check ppe compliance'
  ],
  
  // Electrical Safety with conversational phrases
  'electrical safety': [
    'electrical safety', 'live work', 'energized', 'arc flash', 'shock hazard', 'gfci',
    'lockout', 'grounding', 'ground fault', '1910.333', 'insulated tools', 'qualified person',
    'nfpa 70e', 'approach boundary', 'limited approach', 'restricted approach', 'extension cord',
    'electrical hazard', 'electrical shock', 'electrical permit', 'hot work'
  ],
  
  // Incident Reporting with conversational phrases
  'incident reporting': [
    'incident report', 'accident report', 'near miss', 'osha 300', 'recordable',
    'first aid', 'injury log', 'fatality', 'hospitalization', 'amputation', 'loss of eye',
    '1904', 'reporting requirement', 'incident investigation', 'root cause', 'corrective action',
    'report accident', 'track incidents', 'document injury', 'record keeping'
  ],
  
  // Training & Documentation with conversational phrases
  'training': [
    'safety training', 'orientation', 'competent person', 'qualified person', 'certification',
    'refresher training', 'training record', 'documentation', 'training requirement',
    'initial training', 'annual training', 'training matrix', 'training calendar',
    'authorized trainer', 'train the trainer', 'verification',
    'training schedule', 'training frequency', 'document training', 'training logs'
  ],
  
  // Ergonomics with conversational phrases
  'ergonomics': [
    'ergonomics', 'ergonomic', 'musculoskeletal', 'carpal tunnel', 'repetitive motion',
    'lifting', 'manual handling', 'workstation design', 'keyboard height', 'monitor position',
    'back injury', 'strain', 'sprain', 'material handling', 'push pull', 'neutral posture',
    'ergonomic assessment', 'safe lifting', 'proper posture', 'ergonomic equipment'
  ],
  
  // Respiratory Protection with conversational phrases
  'respiratory protection': [
    'respirator', 'n95', 'scba', 'papr', 'air purifying', 'supplied air', 'fit test',
    'medical evaluation', 'cartridge', 'filter', '1910.134', 'breathing air', 'idlh',
    'assigned protection factor', 'change schedule', 'positive pressure', 'negative pressure',
    'need respirator', 'respirator program', 'facial hair respirator', 'respiratory hazard'
  ],
  
  // Emergency Planning with conversational phrases
  'emergency planning': [
    'emergency action plan', 'evacuation plan', 'shelter in place', 'emergency response',
    'fire drill', 'tornado drill', 'emergency contact', 'meeting point', 'assembly area',
    '1910.38', 'alarm system', 'notification system', 'emergency coordinator', 'first aid kit',
    'aed', 'emergency route', 'emergency exit',
    'emergency procedures', 'evacuation drill', 'emergency preparedness'
  ],
  
  // Industry-Specific Categories
  'construction': [
    'construction', 'scaffold', 'excavation', 'trenching', 'crane', 'rigging', 'steel erection',
    'concrete', 'demolition', 'welding', '1926', 'ladder safety', 'stairway', 'fall protection',
    'aerial lift', 'heavy equipment', 'operator certification',
    'job site', 'construction site', 'building site'
  ],
  
  'manufacturing': [
    'manufacturing', 'machine guarding', 'conveyor', 'robot', 'assembly line', 'press',
    'injection molding', 'forklift', 'material handling', 'lockout', 'process safety',
    'confined space', 'ergonomics', 'chemical safety',
    'production line', 'factory floor', 'manufacturing plant'
  ],
  
  'healthcare': [
    'healthcare', 'bloodborne pathogen', 'needlestick', 'sharps', 'patient handling',
    'radiation safety', 'laser safety', 'medication safety', 'infectious waste',
    '1910.1030', 'exposure control', 'universal precautions', 'isolation',
    'hospital safety', 'medical facility', 'laboratory safety'
  ],
  
  'mining': [
    'mining', 'msha', 'underground', 'surface mining', 'coal', 'metal', 'nonmetal',
    'ventilation', 'ground control', 'blasting', 'dust control', 'methane', 'respirable dust',
    'rock dust', 'self-rescuer', 'mine rescue',
    'mining operation', 'mining site', 'quarry'
  ],
  
  // Oil & Gas / Refinery specific keywords
  'oil_gas': [
    'refinery', 'refineries', 'oil and gas', 'oil & gas', 'petroleum', 'petrochemical',
    'process safety', 'psm', '1910.119', 'hazwoper', '1910.120', 'hot work', '1910.252',
    'h2s', 'hydrogen sulfide', 'sour gas', 'drilling', 'well', 'pipeline',
    'fracking', 'upstream', 'downstream', 'midstream', 'hazard analysis', 'pha',
    'management of change', 'moc', 'offshore', 'onshore', 'tank', 'vessel',
    'refinery safety', 'oil safety protocols', 'refinery procedures', 'oil processing',
    'process hazard analysis'
  ],
  
  // Process Safety Management specific keywords
  'process safety': [
    'process safety', 'psm', '1910.119', 'process hazard analysis', 'pha',
    'management of change', 'moc', 'pre-startup safety review', 'pssr',
    'mechanical integrity', 'hot work', 'contractor safety', 'operating procedures',
    'emergency planning', 'compliance audit', 'trade secrets', 'employee participation',
    'incident investigation', 'highly hazardous chemicals', 'threshold quantities'
  ],
  
  // Hot Work specific keywords
  'hot work': [
    'hot work', 'welding', 'cutting', 'grinding', 'torch', 'flame', 'spark',
    'hot work permit', 'fire watch', 'fire prevention', 'welding safety',
    'gas welding', 'arc welding', 'oxy fuel', 'acetylene', 'combustible',
    'flammable', 'ignition source', 'fire blanket', 'flash burn',
    'welding permit', 'burn permit', 'hot work procedures'
  ],
  
  // H2S Safety specific keywords
  'h2s safety': [
    'h2s', 'hydrogen sulfide', 'sour gas', 'gas monitor', 'breathing apparatus',
    'scba', 'detector', 'ppm', 'parts per million', 'h2s training', 'sweet gas',
    'rotten egg smell', 'toxic gas', 'contingency plan', 'wind sock',
    'respiratory protection', 'monitor calibration', 'warning signs',
    'h2s alarm', 'gas detection', 'exposure limit'
  ]
};
