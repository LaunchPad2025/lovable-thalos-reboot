
// Safety regulation data with enhanced fall protection entries

export interface SafetyRegulation {
  id: string;
  topic: string;
  keywords: string[];
  response: string;
  source: string;
}

export const safetyRegulationResponses: SafetyRegulation[] = [
  {
    id: "osha-1926-501",
    topic: "Fall Protection",
    keywords: ["fall protection", "fall arrest", "harness", "tie-off", "lanyard", "guardrail", "safety net", "1926.501", "height requirement", "leading edge", "roof safety", "fall prevention", "anchor point", "lifeline", "fall restraint"],
    response: "According to OSHA standard 29 CFR 1926.501, employers must provide fall protection at heights of 6 feet or more in construction. Acceptable systems include guardrails, safety nets, or personal fall arrest systems. Specific requirements exist for different work scenarios like leading edges, holes, formwork, rebar, excavations, and roofing. Employers must train workers on fall hazards and proper use of fall protection systems. Equipment must be inspected before each use and damaged equipment removed from service.",
    source: "OSHA 29 CFR 1926.501"
  },
  {
    id: "osha-1910-28",
    topic: "Walking-Working Surfaces Fall Protection",
    keywords: ["fall protection", "general industry", "fall arrest", "walking-working", "1910.28", "floor opening", "floor hole", "platform", "elevated work", "stairway", "fixed ladder", "dock board", "ramp"],
    response: "OSHA standard 29 CFR 1910.28 requires fall protection for general industry at heights of 4 feet or more. Protection methods include guardrail systems, safety net systems, and personal fall protection systems. Special requirements apply for hoist areas, runways, dangerous equipment, wall openings, repair pits, stairways, and ladders. The standard was updated in 2017 to allow more flexible fall protection options while still maintaining worker safety.",
    source: "OSHA 29 CFR 1910.28"
  },
  {
    id: "osha-1926-100",
    topic: "Head Protection",
    keywords: ["hardhat", "hard hat", "helmet", "head protection", "cranial protection", "safety hat", "bump cap", "head injury", "falling object", "1926.100", "class E helmet", "class G helmet", "class C helmet", "ANSI Z89.1"],
    response: "According to OSHA regulation 29 CFR 1926.100(a), head protection (hard hats) must be worn in areas where there is a possible danger of head injury from impact, falling or flying objects, or electrical shock. Hard hats must comply with ANSI Z89.1 standards and be replaced if they show signs of damage, wear, or have sustained an impact. Employers must provide hard hats at no cost to employees and ensure they are properly maintained.",
    source: "OSHA 29 CFR 1926.100"
  },
  {
    id: "osha-1910-132",
    topic: "Personal Protective Equipment",
    keywords: ["ppe", "protective equipment", "safety gear", "hazard assessment", "eye protection", "face protection", "gloves", "boots", "respirator", "safety shoes", "1910.132", "protective clothing", "ppe training", "ppe selection"],
    response: "OSHA standard 29 CFR 1910.132 requires employers to assess the workplace for hazards that necessitate the use of personal protective equipment (PPE). Employers must provide appropriate PPE, ensure it fits properly, and train employees on when and how to use it. The standard also requires employers to maintain PPE in a sanitary and reliable condition. Documentation of the hazard assessment and employee training is mandatory.",
    source: "OSHA 29 CFR 1910.132"
  },
  {
    id: "osha-1926-502",
    topic: "Fall Protection Systems Criteria",
    keywords: ["fall protection", "guardrail", "safety net", "personal fall arrest", "positioning device", "1926.502", "fall restraint", "anchor point", "lifeline", "deceleration device", "self-retracting lifeline", "warning line", "safety monitoring", "controlled access zone"],
    response: "OSHA standard 29 CFR 1926.502 details the specific requirements for fall protection systems. Guardrails must be 42 inches high (±3 inches) with midrails and be able to withstand 200 pounds of force. Safety nets must be installed as close as possible under the work area (never more than 30 feet below) and have sufficient clearance. Personal fall arrest systems must limit maximum arresting force to 1,800 pounds, bring a worker to a complete stop, and limit maximum deceleration distance to 3.5 feet. Inspection before each use is required for all components.",
    source: "OSHA 29 CFR 1926.502"
  },
  {
    id: "osha-1910-1200",
    topic: "Hazard Communication",
    keywords: ["hazcom", "chemical labels", "sds", "safety data sheet", "chemical storage", "hazardous chemicals", "pictogram", "hazard statement", "chemical inventory", "signal word", "container labeling", "ghs", "right to know", "1910.1200", "chemical handling"],
    response: "Under OSHA's Hazard Communication Standard (29 CFR 1910.1200), chemical storage areas must be clearly labeled with appropriate hazard warnings. All containers must be labeled with product identifiers and hazard information following GHS guidelines. Safety Data Sheets must be readily accessible to employees. Employers must develop a written hazard communication program and provide employee training on hazards, protective measures, and the SDS system.",
    source: "OSHA 29 CFR 1910.1200"
  },
  {
    id: "epa-rcra",
    topic: "Hazardous Waste Management",
    keywords: ["hazardous waste", "waste disposal", "waste management", "rcra", "epa guidelines", "waste container", "manifest", "contingency plan", "satellite accumulation", "characteristic waste", "listed waste", "cradle to grave", "proper disposal", "waste identification", "waste generator"],
    response: "The EPA's Resource Conservation and Recovery Act (RCRA) sets forth comprehensive regulations for hazardous waste management. Under 40 CFR 262, generators must properly identify, store, and dispose of hazardous waste. Storage containers must be in good condition, compatible with the waste, and kept closed except when adding or removing waste. Containers must be labeled with the words 'Hazardous Waste,' accumulation start dates, and content descriptions. Weekly inspections are required, and contingency plans must be in place for emergencies.",
    source: "EPA 40 CFR 262"
  },
  {
    id: "osha-1910-147",
    topic: "Lockout/Tagout",
    keywords: ["lockout", "tagout", "loto", "energy control", "machine safety", "energy isolation", "zero energy", "authorized employee", "affected employee", "lockout device", "tagout device", "group lockout", "energy source", "1910.147", "unexpected startup"],
    response: "OSHA's Control of Hazardous Energy standard (29 CFR 1910.147), commonly known as Lockout/Tagout, requires employers to establish procedures to disable machinery during maintenance to prevent unexpected energization. The standard mandates developing written energy control procedures, providing appropriate devices (locks, tags), conducting annual inspections of procedures, and training employees. Specific steps include preparation for shutdown, equipment shutdown, energy isolation, lockout/tagout application, verification, and controlled removal when work is complete.",
    source: "OSHA 29 CFR 1910.147"
  },
  {
    id: "osha-1910-157",
    topic: "Fire Extinguishers",
    keywords: ["fire extinguisher", "fire safety", "fire protection", "extinguisher", "fire class", "class A fire", "class B fire", "class C fire", "class D fire", "class K fire", "abc extinguisher", "monthly inspection", "annual maintenance", "1910.157", "portable fire extinguisher"],
    response: "OSHA standard 29 CFR 1910.157 requires employers to mount, locate, and identify fire extinguishers so they are readily accessible, with travel distance for Class A and D not exceeding 75 feet, and Class B not exceeding 50 feet. Extinguishers must be visually inspected monthly and undergo maintenance checks annually. Employers must provide training to employees on extinguisher use upon initial assignment and annually thereafter. Fire extinguishers must be selected based on the types of anticipated fires and suitable for the environment.",
    source: "OSHA 29 CFR 1910.157"
  },
  {
    id: "osha-1926-25",
    topic: "Housekeeping",
    keywords: ["housekeeping", "cleanliness", "trip hazard", "debris", "clutter", "work area", "passageway", "stairway", "walkway", "waste collection", "trash removal", "combustible waste", "slip hazard", "1926.25", "clear path"],
    response: "OSHA standard 29 CFR 1926.25 mandates that during construction, all work areas, passageways, and stairs shall be kept clear of debris and scrap materials. Combustible scrap and debris must be removed at regular intervals. Containers must be provided for collection and separation of waste, trash, and other refuse, which shall be removed as needed to maintain orderly conditions. Good housekeeping practices are essential to prevent slip, trip, and fall hazards as well as fire hazards.",
    source: "OSHA 29 CFR 1926.25"
  },
  {
    id: "osha-1926-1053",
    topic: "Ladder Safety",
    keywords: ["ladder", "step ladder", "extension ladder", "climbing", "a-frame", "straight ladder", "portable ladder", "fixed ladder", "ladder inspection", "ladder maintenance", "ladder load rating", "1926.1053", "ladder angle", "ladder placement", "three points of contact"],
    response: "According to OSHA standard 29 CFR 1926.1053, ladders must be able to support at least four times the maximum intended load. Ladder rungs must be uniformly spaced and parallel. Self-supporting portable ladders must have a 4:1 height-to-base ratio, while non-self-supporting ladders require secure footing and proper angle placement (1:4 ratio). Ladders must be inspected regularly for defects. Workers must maintain three points of contact when climbing, face the ladder, and never carry objects that could cause them to lose balance.",
    source: "OSHA 29 CFR 1926.1053"
  },
  {
    id: "osha-1926-500",
    topic: "Fall Protection Scope and Definitions",
    keywords: ["fall protection definition", "fall protection scope", "1926.500", "anchorage definition", "body belt", "body harness", "connector", "controlled access zone", "dangerous equipment", "lanyard definition", "leading edge", "opening definition", "rope grab", "safety monitoring", "steep roof", "warning line"],
    response: "OSHA standard 29 CFR 1926.500 defines the scope and application of the fall protection standards in construction. It provides key definitions including 'anchorage', 'body belt', 'body harness', 'connector', 'controlled access zone', 'dangerous equipment', 'equivalent', 'failure', 'free fall', 'guardrail system', 'hole', 'lanyard', 'leading edge', 'low-slope roof', 'opening', 'personal fall arrest system', 'positioning device system', 'rope grab', 'safety-monitoring system', 'steep roof', and 'warning line system'. Understanding these definitions is crucial for properly implementing fall protection requirements.",
    source: "OSHA 29 CFR 1926.500"
  },
  {
    id: "osha-1910-1030",
    topic: "Bloodborne Pathogens",
    keywords: ["bloodborne pathogen", "bloodborne", "exposure control", "universal precautions", "needlestick", "sharps", "hepatitis b", "hiv", "biohazard", "contaminated sharps", "regulated waste", "1910.1030", "exposure incident", "post-exposure", "vaccination"],
    response: "OSHA standard 29 CFR 1910.1030 requires employers to develop an exposure control plan to eliminate or minimize employee exposure to bloodborne pathogens. The standard mandates the use of universal precautions, engineering controls, work practice controls, personal protective equipment, and housekeeping measures. Employers must offer hepatitis B vaccinations to exposed employees, provide training, maintain specific records, and have procedures for evaluating exposure incidents. The standard specifically addresses handling of contaminated sharps and regulated waste.",
    source: "OSHA 29 CFR 1910.1030"
  },
  {
    id: "osha-1910-134",
    topic: "Respiratory Protection",
    keywords: ["respirator", "respiratory protection", "n95", "scba", "air-purifying respirator", "supplied air", "fit test", "medical evaluation", "respiratory hazard", "breathing air", "1910.134", "cartridge", "filter", "assigned protection factor", "idlh"],
    response: "OSHA standard 29 CFR 1910.134 requires employers to establish and maintain a respiratory protection program when respirators are necessary to protect worker health. The program must include worksite-specific procedures, respirator selection, medical evaluations, fit testing, proper use procedures, maintenance and care, breathing air quality, training, and program evaluation. Employers must select respirators based on hazards, ensure proper fit and use, and conduct regular evaluations of the workplace to ensure the program's effectiveness.",
    source: "OSHA 29 CFR 1910.134"
  },
  {
    id: "osha-1910-146",
    topic: "Confined Spaces",
    keywords: ["confined space", "permit-required", "entry permit", "attendant", "entrant", "entry supervisor", "atmospheric testing", "ventilation", "rescue", "1910.146", "limited entry", "restricted exit", "hazardous atmosphere", "engulfment", "configuration trap"],
    response: "OSHA standard 29 CFR 1910.146 addresses permit-required confined spaces, which have limited means of entry or exit and are not designed for continuous occupancy. Employers must evaluate workplaces for confined spaces, prevent unauthorized entry, and develop a written program for permit spaces. The standard requires atmospheric testing, ventilation, attendants, entrants, entry supervisors, rescue provisions, and detailed entry permits. Specific training is required for all workers involved in confined space operations, and cancellation procedures must be established for entry permits.",
    source: "OSHA 29 CFR 1910.146"
  },
  {
    id: "osha-1926-651",
    topic: "Excavations Requirements",
    keywords: ["excavation", "trenching", "shoring", "sloping", "benching", "protective system", "competent person", "spoil pile", "underground utility", "cave-in", "1926.651", "soil classification", "access egress", "hazardous atmosphere", "water accumulation"],
    response: "OSHA standard 29 CFR 1926.651 establishes requirements for excavation work, including underground installations, access and egress, exposure to vehicular traffic, exposure to falling loads, warning systems for mobile equipment, hazardous atmospheres, water accumulation, stability of adjacent structures, protection from loose rock or soil, inspections, and fall protection. A competent person must inspect excavations daily and as conditions change. The standard requires protective systems for excavations deeper than 5 feet unless the excavation is made entirely in stable rock.",
    source: "OSHA 29 CFR 1926.651"
  }
];

