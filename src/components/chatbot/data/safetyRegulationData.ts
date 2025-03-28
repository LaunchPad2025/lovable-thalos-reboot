
// This file was missing in the previous refactoring
// Moving it from the root to the appropriate location

export interface SafetyRegulation {
  id: string;
  topic: string;
  keywords: string[];
  response: string;
  source: string;
}

export const safetyRegulationResponses: SafetyRegulation[] = [
  {
    id: "osha-1926-100",
    topic: "Head Protection",
    keywords: ["hardhat", "hard hat", "helmet", "head protection"],
    response: "According to OSHA regulation 29 CFR 1926.100(a), head protection (hard hats) must be worn in areas where there is a possible danger of head injury from impact, falling or flying objects, or electrical shock. Hard hats must comply with ANSI Z89.1 standards and be replaced if they show signs of damage, wear, or have sustained an impact. Employers must provide hard hats at no cost to employees and ensure they are properly maintained.",
    source: "OSHA 29 CFR 1926.100"
  },
  {
    id: "osha-1910-132",
    topic: "Personal Protective Equipment",
    keywords: ["ppe", "protective equipment", "safety gear"],
    response: "OSHA standard 29 CFR 1910.132 requires employers to assess the workplace for hazards that necessitate the use of personal protective equipment (PPE). Employers must provide appropriate PPE, ensure it fits properly, and train employees on when and how to use it. The standard also requires employers to maintain PPE in a sanitary and reliable condition. Documentation of the hazard assessment and employee training is mandatory.",
    source: "OSHA 29 CFR 1910.132"
  },
  {
    id: "osha-1926-501",
    topic: "Fall Protection",
    keywords: ["fall protection", "heights", "6 feet", "fall arrest", "guardrail"],
    response: "OSHA standard 29 CFR 1926.501 mandates that employers provide fall protection when workers are operating at heights of 6 feet or more above a lower level in construction. Acceptable fall protection systems include guardrail systems, safety net systems, or personal fall arrest systems. For specific work scenarios such as leading edges, hoist areas, and roofing work, there are additional requirements outlined in subsections of the standard.",
    source: "OSHA 29 CFR 1926.501"
  },
  {
    id: "osha-1910-1200",
    topic: "Hazard Communication",
    keywords: ["hazcom", "chemical labels", "sds", "safety data sheet", "chemical storage", "hazardous chemicals"],
    response: "Under OSHA's Hazard Communication Standard (29 CFR 1910.1200), chemical storage areas must be clearly labeled with appropriate hazard warnings. All containers must be labeled with product identifiers and hazard information following GHS guidelines. Safety Data Sheets must be readily accessible to employees. Employers must develop a written hazard communication program and provide employee training on hazards, protective measures, and the SDS system.",
    source: "OSHA 29 CFR 1910.1200"
  },
  {
    id: "epa-rcra",
    topic: "Hazardous Waste Management",
    keywords: ["hazardous waste", "waste disposal", "waste management", "rcra", "epa guidelines"],
    response: "The EPA's Resource Conservation and Recovery Act (RCRA) sets forth comprehensive regulations for hazardous waste management. Under 40 CFR 262, generators must properly identify, store, and dispose of hazardous waste. Storage containers must be in good condition, compatible with the waste, and kept closed except when adding or removing waste. Containers must be labeled with the words 'Hazardous Waste,' accumulation start dates, and content descriptions. Weekly inspections are required, and contingency plans must be in place for emergencies.",
    source: "EPA 40 CFR 262"
  },
  {
    id: "osha-1910-147",
    topic: "Lockout/Tagout",
    keywords: ["lockout", "tagout", "loto", "energy control", "machine safety"],
    response: "OSHA's Control of Hazardous Energy standard (29 CFR 1910.147), commonly known as Lockout/Tagout, requires employers to establish procedures to disable machinery during maintenance to prevent unexpected energization. The standard mandates developing written energy control procedures, providing appropriate devices (locks, tags), conducting annual inspections of procedures, and training employees. Specific steps include preparation for shutdown, equipment shutdown, energy isolation, lockout/tagout application, verification, and controlled removal when work is complete.",
    source: "OSHA 29 CFR 1910.147"
  },
  {
    id: "osha-1910-157",
    topic: "Fire Extinguishers",
    keywords: ["fire extinguisher", "fire safety", "fire protection", "extinguisher"],
    response: "OSHA standard 29 CFR 1910.157 requires employers to mount, locate, and identify fire extinguishers so they are readily accessible, with travel distance for Class A and D not exceeding 75 feet, and Class B not exceeding 50 feet. Extinguishers must be visually inspected monthly and undergo maintenance checks annually. Employers must provide training to employees on extinguisher use upon initial assignment and annually thereafter. Fire extinguishers must be selected based on the types of anticipated fires and suitable for the environment.",
    source: "OSHA 29 CFR 1910.157"
  },
  {
    id: "osha-1926-25",
    topic: "Housekeeping",
    keywords: ["housekeeping", "cleanliness", "trip hazard", "debris", "clutter"],
    response: "OSHA standard 29 CFR 1926.25 mandates that during construction, all work areas, passageways, and stairs shall be kept clear of debris and scrap materials. Combustible scrap and debris must be removed at regular intervals. Containers must be provided for collection and separation of waste, trash, and other refuse, which shall be removed as needed to maintain orderly conditions. Good housekeeping practices are essential to prevent slip, trip, and fall hazards as well as fire hazards.",
    source: "OSHA 29 CFR 1926.25"
  },
  {
    id: "osha-1910-37",
    topic: "Emergency Exit Routes",
    keywords: ["exit", "exit route", "emergency exit", "evacuation", "escape route"],
    response: "OSHA standard 29 CFR 1910.37 requires that exit routes be permanent parts of the workplace, properly designed, constructed, and maintained. Exit doors must be unlocked from the inside, with side-hinged doors used for exit access. Exit routes must be free of explosive or highly flammable furnishings, and adequately lit. Exit signs must be clearly visible and distinctly marked. The minimum width of exit routes must be sufficient to accommodate the maximum permitted occupant load of each floor served.",
    source: "OSHA 29 CFR 1910.37"
  },
  {
    id: "osha-1926-1053",
    topic: "Ladder Safety",
    keywords: ["ladder", "step ladder", "extension ladder", "climbing"],
    response: "According to OSHA standard 29 CFR 1926.1053, ladders must be able to support at least four times the maximum intended load. Ladder rungs must be uniformly spaced and parallel. Self-supporting portable ladders must have a 4:1 height-to-base ratio, while non-self-supporting ladders require secure footing and proper angle placement (1:4 ratio). Ladders must be inspected regularly for defects. Workers must maintain three points of contact when climbing, face the ladder, and never carry objects that could cause them to lose balance.",
    source: "OSHA 29 CFR 1926.1053"
  }
];
