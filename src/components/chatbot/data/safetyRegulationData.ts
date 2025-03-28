
// Safety regulation data with enhanced entries across all major safety areas

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
    keywords: ["fall protection", "fall arrest", "harness", "tie-off", "lanyard", "guardrail", "safety net", "1926.501", "height requirement", "leading edge", "roof safety", "fall prevention", "anchor point", "lifeline", "fall restraint", "elevated work", "fall distance", "fall clearance", "self-retracting", "walking-working"],
    response: "According to OSHA standard 29 CFR 1926.501, employers must provide fall protection at heights of 6 feet or more in construction. Acceptable systems include guardrails, safety nets, or personal fall arrest systems. Specific requirements exist for different work scenarios like leading edges, holes, formwork, rebar, excavations, and roofing. Employers must train workers on fall hazards and proper use of fall protection systems. Equipment must be inspected before each use and damaged equipment removed from service.",
    source: "OSHA 29 CFR 1926.501"
  },
  {
    id: "osha-1910-28",
    topic: "Walking-Working Surfaces Fall Protection",
    keywords: ["fall protection", "general industry", "fall arrest", "walking-working", "1910.28", "floor opening", "floor hole", "platform", "elevated work", "stairway", "fixed ladder", "dock board", "ramp", "hole cover", "unprotected side", "edge", "wall opening", "walking surface", "working surface"],
    response: "OSHA standard 29 CFR 1910.28 requires fall protection for general industry at heights of 4 feet or more. Protection methods include guardrail systems, safety net systems, and personal fall protection systems. Special requirements apply for hoist areas, runways, dangerous equipment, wall openings, repair pits, stairways, and ladders. The standard was updated in 2017 to allow more flexible fall protection options while still maintaining worker safety.",
    source: "OSHA 29 CFR 1910.28"
  },
  {
    id: "osha-1926-100",
    topic: "Head Protection",
    keywords: ["hardhat", "hard hat", "helmet", "head protection", "cranial protection", "safety hat", "bump cap", "head injury", "falling object", "1926.100", "class E helmet", "class G helmet", "class C helmet", "ANSI Z89.1", "construction head protection", "ppe head"],
    response: "According to OSHA regulation 29 CFR 1926.100(a), head protection (hard hats) must be worn in areas where there is a possible danger of head injury from impact, falling or flying objects, or electrical shock. Hard hats must comply with ANSI Z89.1 standards and be replaced if they show signs of damage, wear, or have sustained an impact. Employers must provide hard hats at no cost to employees and ensure they are properly maintained.",
    source: "OSHA 29 CFR 1926.100"
  },
  {
    id: "osha-1910-132",
    topic: "Personal Protective Equipment",
    keywords: ["ppe", "protective equipment", "safety gear", "hazard assessment", "eye protection", "face protection", "gloves", "boots", "respirator", "safety shoes", "1910.132", "protective clothing", "ppe training", "ppe selection", "ppe hazard assessment", "hand protection", "ppe fit", "ppe maintenance"],
    response: "OSHA standard 29 CFR 1910.132 requires employers to assess the workplace for hazards that necessitate the use of personal protective equipment (PPE). Employers must provide appropriate PPE, ensure it fits properly, and train employees on when and how to use it. The standard also requires employers to maintain PPE in a sanitary and reliable condition. Documentation of the hazard assessment and employee training is mandatory.",
    source: "OSHA 29 CFR 1910.132"
  },
  {
    id: "osha-1926-502",
    topic: "Fall Protection Systems Criteria",
    keywords: ["fall protection", "guardrail", "safety net", "personal fall arrest", "positioning device", "1926.502", "fall restraint", "anchor point", "lifeline", "deceleration device", "self-retracting lifeline", "warning line", "safety monitoring", "controlled access zone", "fall protection system", "maximum arresting force", "free fall distance", "fall clearance"],
    response: "OSHA standard 29 CFR 1926.502 details the specific requirements for fall protection systems. Guardrails must be 42 inches high (±3 inches) with midrails and be able to withstand 200 pounds of force. Safety nets must be installed as close as possible under the work area (never more than 30 feet below) and have sufficient clearance. Personal fall arrest systems must limit maximum arresting force to 1,800 pounds, bring a worker to a complete stop, and limit maximum deceleration distance to 3.5 feet. Inspection before each use is required for all components.",
    source: "OSHA 29 CFR 1926.502"
  },
  {
    id: "osha-1910-1200",
    topic: "Hazard Communication",
    keywords: ["hazcom", "chemical labels", "sds", "safety data sheet", "chemical storage", "hazardous chemicals", "pictogram", "hazard statement", "chemical inventory", "signal word", "container labeling", "ghs", "right to know", "1910.1200", "chemical handling", "hazard classification", "chemical list", "warning label", "material safety data sheet", "secondary container"],
    response: "Under OSHA's Hazard Communication Standard (29 CFR 1910.1200), chemical storage areas must be clearly labeled with appropriate hazard warnings. All containers must be labeled with product identifiers and hazard information following GHS guidelines. Safety Data Sheets must be readily accessible to employees. Employers must develop a written hazard communication program and provide employee training on hazards, protective measures, and the SDS system.",
    source: "OSHA 29 CFR 1910.1200"
  },
  {
    id: "epa-rcra",
    topic: "Hazardous Waste Management",
    keywords: ["hazardous waste", "waste disposal", "waste management", "rcra", "epa guidelines", "waste container", "manifest", "contingency plan", "satellite accumulation", "characteristic waste", "listed waste", "cradle to grave", "proper disposal", "waste identification", "waste generator", "waste accumulation", "hazardous waste determination", "hazardous waste storage", "hazardous waste training"],
    response: "The EPA's Resource Conservation and Recovery Act (RCRA) sets forth comprehensive regulations for hazardous waste management. Under 40 CFR 262, generators must properly identify, store, and dispose of hazardous waste. Storage containers must be in good condition, compatible with the waste, and kept closed except when adding or removing waste. Containers must be labeled with the words 'Hazardous Waste,' accumulation start dates, and content descriptions. Weekly inspections are required, and contingency plans must be in place for emergencies.",
    source: "EPA 40 CFR 262"
  },
  {
    id: "osha-1910-147",
    topic: "Lockout/Tagout",
    keywords: ["lockout", "tagout", "loto", "energy control", "machine safety", "energy isolation", "zero energy", "authorized employee", "affected employee", "lockout device", "tagout device", "group lockout", "energy source", "1910.147", "unexpected startup", "energy control program", "hazardous energy", "energy isolating device", "lockout procedure", "machine guarding"],
    response: "OSHA's Control of Hazardous Energy standard (29 CFR 1910.147), commonly known as Lockout/Tagout, requires employers to establish procedures to disable machinery during maintenance to prevent unexpected energization. The standard mandates developing written energy control procedures, providing appropriate devices (locks, tags), conducting annual inspections of procedures, and training employees. Specific steps include preparation for shutdown, equipment shutdown, energy isolation, lockout/tagout application, verification, and controlled removal when work is complete.",
    source: "OSHA 29 CFR 1910.147"
  },
  {
    id: "osha-1910-157",
    topic: "Fire Extinguishers",
    keywords: ["fire extinguisher", "fire safety", "fire protection", "extinguisher", "fire class", "class A fire", "class B fire", "class C fire", "class D fire", "class K fire", "abc extinguisher", "monthly inspection", "annual maintenance", "1910.157", "portable fire extinguisher", "fire suppression", "fire prevention", "extinguisher inspection", "fire training", "fire emergency"],
    response: "OSHA standard 29 CFR 1910.157 requires employers to mount, locate, and identify fire extinguishers so they are readily accessible, with travel distance for Class A and D not exceeding 75 feet, and Class B not exceeding 50 feet. Extinguishers must be visually inspected monthly and undergo maintenance checks annually. Employers must provide training to employees on extinguisher use upon initial assignment and annually thereafter. Fire extinguishers must be selected based on the types of anticipated fires and suitable for the environment.",
    source: "OSHA 29 CFR 1910.157"
  },
  {
    id: "osha-1926-25",
    topic: "Housekeeping",
    keywords: ["housekeeping", "cleanliness", "trip hazard", "debris", "clutter", "work area", "passageway", "stairway", "walkway", "waste collection", "trash removal", "combustible waste", "slip hazard", "1926.25", "clear path", "clean workplace", "organized workplace", "waste disposal", "workplace organization", "tidy workplace"],
    response: "OSHA standard 29 CFR 1926.25 mandates that during construction, all work areas, passageways, and stairs shall be kept clear of debris and scrap materials. Combustible scrap and debris must be removed at regular intervals. Containers must be provided for collection and separation of waste, trash, and other refuse, which shall be removed as needed to maintain orderly conditions. Good housekeeping practices are essential to prevent slip, trip, and fall hazards as well as fire hazards.",
    source: "OSHA 29 CFR 1926.25"
  },
  {
    id: "osha-1926-1053",
    topic: "Ladder Safety",
    keywords: ["ladder", "step ladder", "extension ladder", "climbing", "a-frame", "straight ladder", "portable ladder", "fixed ladder", "ladder inspection", "ladder maintenance", "ladder load rating", "1926.1053", "ladder angle", "ladder placement", "three points of contact", "ladder safety", "stepladder", "metal ladder", "wooden ladder", "fiberglass ladder"],
    response: "According to OSHA standard 29 CFR 1926.1053, ladders must be able to support at least four times the maximum intended load. Ladder rungs must be uniformly spaced and parallel. Self-supporting portable ladders must have a 4:1 height-to-base ratio, while non-self-supporting ladders require secure footing and proper angle placement (1:4 ratio). Ladders must be inspected regularly for defects. Workers must maintain three points of contact when climbing, face the ladder, and never carry objects that could cause them to lose balance.",
    source: "OSHA 29 CFR 1926.1053"
  },
  {
    id: "osha-1910-146",
    topic: "Confined Spaces",
    keywords: ["confined space", "permit-required", "entry permit", "attendant", "entrant", "entry supervisor", "atmospheric testing", "ventilation", "rescue", "1910.146", "limited entry", "restricted exit", "hazardous atmosphere", "engulfment", "configuration trap", "permit space", "confined space entry", "confined space rescue", "confined space monitoring", "non-permit confined space"],
    response: "OSHA standard 29 CFR 1910.146 addresses permit-required confined spaces, which have limited means of entry or exit and are not designed for continuous occupancy. Employers must evaluate workplaces for confined spaces, prevent unauthorized entry, and develop a written program for permit spaces. The standard requires atmospheric testing, ventilation, attendants, entrants, entry supervisors, rescue provisions, and detailed entry permits. Specific training is required for all workers involved in confined space operations, and cancellation procedures must be established for entry permits.",
    source: "OSHA 29 CFR 1910.146"
  },
  {
    id: "osha-1910-134",
    topic: "Respiratory Protection",
    keywords: ["respirator", "respiratory protection", "n95", "scba", "air-purifying respirator", "supplied air", "fit test", "medical evaluation", "respiratory hazard", "breathing air", "1910.134", "cartridge", "filter", "assigned protection factor", "idlh", "respirator program", "respiratory protection program", "qualitative fit test", "quantitative fit test", "air filtering"],
    response: "OSHA standard 29 CFR 1910.134 requires employers to establish and maintain a respiratory protection program when respirators are necessary to protect worker health. The program must include worksite-specific procedures, respirator selection, medical evaluations, fit testing, proper use procedures, maintenance and care, breathing air quality, training, and program evaluation. Employers must select respirators based on hazards, ensure proper fit and use, and conduct regular evaluations of the workplace to ensure the program's effectiveness.",
    source: "OSHA 29 CFR 1910.134"
  },
  {
    id: "osha-1910-1030",
    topic: "Bloodborne Pathogens",
    keywords: ["bloodborne pathogen", "bloodborne", "exposure control", "universal precautions", "needlestick", "sharps", "hepatitis b", "hiv", "biohazard", "contaminated sharps", "regulated waste", "1910.1030", "exposure incident", "post-exposure", "vaccination", "bloodborne pathogens program", "sharps container", "biohazard labeling", "exposure determination", "infectious material"],
    response: "OSHA standard 29 CFR 1910.1030 requires employers to develop an exposure control plan to eliminate or minimize employee exposure to bloodborne pathogens. The standard mandates the use of universal precautions, engineering controls, work practice controls, personal protective equipment, and housekeeping measures. Employers must offer hepatitis B vaccinations to exposed employees, provide training, maintain specific records, and have procedures for evaluating exposure incidents. The standard specifically addresses handling of contaminated sharps and regulated waste.",
    source: "OSHA 29 CFR 1910.1030"
  },
  {
    id: "osha-1926-651",
    topic: "Excavations Requirements",
    keywords: ["excavation", "trenching", "shoring", "sloping", "benching", "protective system", "competent person", "spoil pile", "underground utility", "cave-in", "1926.651", "soil classification", "access egress", "hazardous atmosphere", "water accumulation", "trench box", "excavation safety", "soil analysis", "excavation inspection", "protective measures"],
    response: "OSHA standard 29 CFR 1926.651 establishes requirements for excavation work, including underground installations, access and egress, exposure to vehicular traffic, exposure to falling loads, warning systems for mobile equipment, hazardous atmospheres, water accumulation, stability of adjacent structures, protection from loose rock or soil, inspections, and fall protection. A competent person must inspect excavations daily and as conditions change. The standard requires protective systems for excavations deeper than 5 feet unless the excavation is made entirely in stable rock.",
    source: "OSHA 29 CFR 1926.651"
  },
  {
    id: "osha-1910-38",
    topic: "Emergency Action Plans",
    keywords: ["emergency action plan", "evacuation", "emergency exit", "fire emergency", "alarm system", "assembly area", "emergency response", "1910.38", "exit route", "evacuation procedure", "emergency preparedness", "emergency planning", "emergency coordinator", "emergency drill", "evacuation map", "evacuation drill", "emergency notification", "meeting point", "emergency contact"],
    response: "OSHA standard 29 CFR 1910.38 requires employers to have a written emergency action plan when required by an OSHA standard. The plan must include procedures for emergency evacuation, employees who remain to operate critical operations, accounting for all employees, reporting emergencies, and identifying employees who perform rescue and medical duties. The employer must have an alarm system, and must train employees on their roles. Employers with 10 or fewer employees may communicate the plan orally rather than in writing.",
    source: "OSHA 29 CFR 1910.38"
  },
  {
    id: "osha-1904",
    topic: "Recordkeeping and Reporting",
    keywords: ["osha recordkeeping", "osha 300", "osha 300a", "osha 301", "injury reporting", "illness reporting", "recordable injury", "first aid", "medical treatment", "fatality reporting", "incident reporting", "1904", "osha log", "injury log", "work-related", "reporting requirement", "recording criteria", "recordkeeping exemption", "privacy case", "reportable incident"],
    response: "OSHA standard 29 CFR 1904 requires employers with more than 10 employees to maintain records of work-related injuries and illnesses. Employers must record each work-related injury or illness that involves death, days away from work, restricted work, transfer to another job, medical treatment beyond first aid, loss of consciousness, or significant injury diagnosed by a healthcare professional. OSHA Forms 300 (Log), 300A (Summary), and 301 (Incident Report) must be used. The Summary must be posted from February 1 to April 30 each year. Fatalities must be reported within 8 hours, and inpatient hospitalizations, amputations, or eye losses within 24 hours.",
    source: "OSHA 29 CFR 1904"
  },
  {
    id: "osha-1910-151",
    topic: "First Aid",
    keywords: ["first aid", "medical services", "emergency medical", "first aid supplies", "eyewash", "emergency shower", "medical attention", "1910.151", "first aid kit", "medical treatment", "emergency medical response", "first aid training", "medical services", "medical personnel", "medical facility", "medical care", "first responder", "emergency medical plan", "quick drenching", "eye flushing"],
    response: "OSHA standard 29 CFR 1910.151 requires employers to ensure the ready availability of medical personnel for advice and consultation. When medical facilities are not in near proximity to the workplace, a person or persons shall be adequately trained to render first aid. First aid supplies approved by the consulting physician shall be readily available. Where the eyes or body may be exposed to injurious corrosive materials, suitable facilities for quick drenching or flushing of the eyes and body shall be provided within the work area for immediate emergency use.",
    source: "OSHA 29 CFR 1910.151"
  },
  {
    id: "osha-1910-178",
    topic: "Powered Industrial Trucks",
    keywords: ["forklift", "powered industrial truck", "lift truck", "pallet jack", "order picker", "reach truck", "operator training", "forklift certification", "forklift inspection", "load handling", "1910.178", "stability", "center of gravity", "fork", "load backrest", "forklift safety", "forklift operator", "forklift maintenance", "forklift evaluation", "industrial truck classification"],
    response: "OSHA standard 29 CFR 1910.178 covers the design, maintenance, and operation of powered industrial trucks (forklifts). Operators must be trained, evaluated, and certified as competent to operate powered industrial trucks safely. Training must include formal instruction, practical training, and workplace performance evaluation. Refresher training is required every three years or earlier if unsafe operation, accidents, or workplace changes occur. Daily pre-operational inspections are required, and defective trucks must be removed from service until repaired.",
    source: "OSHA 29 CFR 1910.178"
  },
  {
    id: "osha-1910-23",
    topic: "Guarding Floor and Wall Openings",
    keywords: ["guardrail", "floor opening", "wall opening", "hole cover", "toeboard", "handrail", "stair rail", "1910.23", "platform", "runway", "ramp", "open-sided floor", "standard railing", "standard guardrail", "floor hole", "skylight", "opening protection", "elevated platform", "fall hazard", "floor guarding"],
    response: "OSHA standard 29 CFR 1910.23 requires protection for employees from falling through floor holes, wall openings, and open-sided floors and platforms. Every stairway floor opening shall be guarded by a standard railing. Every ladder-way floor opening shall be guarded by a standard railing with toeboard. Every floor hole into which persons can accidentally walk shall be guarded by a standard railing with toeboard or a floor hole cover. Open-sided floors or platforms 4 feet or more above the adjacent floor or ground level shall be guarded by a standard railing.",
    source: "OSHA 29 CFR 1910.23"
  },
  {
    id: "osha-1910-303",
    topic: "Electrical Safety",
    keywords: ["electrical safety", "electrical system", "electrical hazard", "electrical equipment", "circuit", "grounding", "electrical installation", "electrical wiring", "insulation", "1910.303", "electrical conductors", "examination", "installation", "electrical room", "panelboard", "electrical panel", "wiring", "electricity", "electrical system design", "electrical workspace"],
    response: "OSHA standard 29 CFR 1910.303 covers general requirements for electrical systems, including examination, installation, use, identification of disconnecting means, guarding of live parts, and space requirements. Electrical equipment must be free from recognized hazards that are likely to cause death or serious physical harm. All electrical equipment must be installed and used in accordance with the manufacturer's instructions. Working space around electrical equipment must permit safe operation and maintenance. Entrances to rooms containing exposed live parts shall be marked with warning signs.",
    source: "OSHA 29 CFR 1910.303"
  }
];
