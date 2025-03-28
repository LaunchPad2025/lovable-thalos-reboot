
-- Add training examples for various regulations
INSERT INTO public.paulie_queries (
  question, 
  response, 
  matched_regulation_id, 
  matched_category, 
  matched_keywords,
  review_status, 
  training_status, 
  improved_response
)
VALUES
-- 29 CFR 1910.120 (HAZWOPER)
(
  'What are the requirements for HAZWOPER training?', 
  'Under 29 CFR 1910.120 (HAZWOPER), workers must receive specific training before working with hazardous waste. Initially, workers need 40 hours of off-site training and 3 days of supervised field experience. Managers require an additional 8 hours of specialized training. Annual 8-hour refresher training is mandatory. The regulation covers emergency response procedures, hazard recognition, personal protective equipment usage, and decontamination protocols. This comprehensive program ensures workers can safely handle hazardous substances and emergency situations.',
  '29 CFR 1910.120',
  'Chemical Safety',
  ARRAY['HAZWOPER', '1910.120', 'hazardous waste', 'emergency response'],
  'needs_review',
  'pending',
  NULL
),
(
  'How often is HAZWOPER refresher training required?',
  'According to 29 CFR 1910.120(e)(8), HAZWOPER refresher training is required annually (every 12 months). All employees who have received initial HAZWOPER training must complete at least 8 hours of refresher training to maintain their qualifications and ensure they stay current with safety protocols for hazardous waste operations.',
  '29 CFR 1910.120',
  'Chemical Safety',
  ARRAY['HAZWOPER', '1910.120', 'refresher', 'training'],
  'needs_review',
  'pending',
  NULL
),

-- 29 CFR 1910.119 (Process Safety Management)
(
  'What does PSM require for process hazard analysis?', 
  'Under 29 CFR 1910.119(e), Process Safety Management (PSM) requires a thorough Process Hazard Analysis (PHA) for covered processes. The PHA must identify, evaluate, and control hazards using methodologies like HAZOP, What-if, or Fault Tree Analysis. The analysis must address process hazards, previous incidents, engineering controls, consequences of failures, facility siting, human factors, and qualitative evaluation of safety/health effects. PHAs must be updated and revalidated at least every 5 years and be conducted by a team with expertise in the process and PHA methodology.',
  '29 CFR 1910.119',
  'Process Safety',
  ARRAY['PSM', '1910.119', 'process safety management', 'PHA', 'hazard analysis'],
  'needs_review',
  'pending',
  NULL
),
(
  'How often should PSM pre-startup safety reviews be conducted?',
  'According to 29 CFR 1910.119(i), Pre-Startup Safety Reviews (PSSRs) must be performed before introducing highly hazardous chemicals into a new facility or into a modified facility when the modification is significant enough to require a change in the process safety information. PSSRs aren''t conducted on a fixed time interval, but rather before each startup of a new process or after significant modifications. The review confirms construction and equipment meet design specifications, safety procedures are in place, process hazard analysis recommendations have been addressed, and training has been completed.',
  '29 CFR 1910.119',
  'Process Safety',
  ARRAY['PSM', '1910.119', 'pre-startup', 'PSSR', 'process safety'],
  'needs_review',
  'pending',
  NULL
),

-- 29 CFR 1910.146 (Confined Spaces)
(
  'What is required in a confined space permit?', 
  'According to 29 CFR 1910.146(f), a confined space entry permit must include: the permit space to be entered, purpose of entry, date and authorized duration, authorized entrants, attendants, entry supervisors, hazards of the space, measures to isolate the space and eliminate/control hazards, acceptable entry conditions, test results with tester''s initials, rescue and emergency services available, communication procedures, required equipment (PPE, testing, alarm systems, rescue equipment), any additional permits (hot work), and any other necessary information. The permit serves as written verification that pre-entry preparations have been completed and the space is safe for entry.',
  '29 CFR 1910.146',
  'Confined Spaces',
  ARRAY['confined space', '1910.146', 'permit', 'entry'],
  'needs_review',
  'pending',
  NULL
),
(
  'How often should attendants monitor confined space air quality?',
  'According to 29 CFR 1910.146(d)(5), for permit-required confined spaces, testing and monitoring of the space must be conducted as necessary to determine if acceptable entry conditions are maintained during the course of entry operations. For some confined spaces, continuous monitoring may be necessary, especially where conditions can change rapidly. While the regulation doesn''t specify exact intervals, it requires monitoring frequency to be appropriate to the hazards identified and the operations conducted. The attendant must maintain awareness of possible changes in atmospheric conditions that could affect entrant safety.',
  '29 CFR 1910.146',
  'Confined Spaces',
  ARRAY['confined space', '1910.146', 'monitoring', 'atmospheric testing', 'attendant'],
  'needs_review',
  'pending',
  NULL
),

-- 29 CFR 1910.212 (Machine Guarding)
(
  'What are the requirements for machine guarding?', 
  'According to 29 CFR 1910.212(a)(1), machine guards must be provided to protect operators and other employees from hazards created by point of operation, ingoing nip points, rotating parts, flying chips, and sparks. Guards must be affixed to the machine when possible and secured elsewhere if attachment to the machine is not possible. Guards must not create potential hazards themselves and must prevent access to the danger zone during operation. The guarding must be in compliance with appropriate standards, or designed to prevent operator from having any part of their body in the danger zone during the operating cycle.',
  '29 CFR 1910.212',
  'Machine Safety',
  ARRAY['machine guarding', '1910.212', 'point of operation', 'rotating parts'],
  'needs_review',
  'pending',
  NULL
),
(
  'When is a machine guard required to be adjusted?',
  'According to 29 CFR 1910.212(a)(3)(ii), the point of operation guarding device shall be designed, constructed, and adjusted so that it prevents the operator from having any part of their body in the danger zone during the operating cycle. Guards must be adjusted properly to ensure effectiveness - this includes adjustments when different operations are performed or when there are changes in material being processed. Any adjustment should maintain the protective function of the guard without impeding the operation of the machine. If guards are found to be ineffective or improperly adjusted during periodic inspections, they must be immediately adjusted to provide the required protection.',
  '29 CFR 1910.212',
  'Machine Safety',
  ARRAY['machine guarding', '1910.212', 'adjustment', 'point of operation'],
  'needs_review',
  'pending',
  NULL
),

-- 29 CFR 1926.501 (Fall Protection)
(
  'What height requires fall protection in construction?', 
  'According to 29 CFR 1926.501(b)(1), employees on walking/working surfaces with an unprotected side or edge which is 6 feet (1.8 meters) or more above a lower level shall be protected from falling by the use of guardrail systems, safety net systems, or personal fall arrest systems. This 6-foot threshold applies to most construction activities, including leading edge work, precast concrete erection, residential construction, and work on roofs. There are specific requirements for different work situations, but the general 6-foot rule is the standard threshold for most construction applications.',
  '29 CFR 1926.501',
  'Construction',
  ARRAY['fall protection', '1926.501', 'height requirement', 'construction'],
  'needs_review',
  'pending',
  NULL
),
(
  'When can a monitor be used instead of physical fall protection?',
  'According to 29 CFR 1926.501(b)(10) and 1926.502(h), a safety monitoring system can be used in place of conventional fall protection systems (guardrails, safety nets, or personal fall arrest) only in specific limited situations: (1) on low-slope roofs (slope less than or equal to 4:12) and (2) in leading edge work, precast concrete work, or residential construction work where conventional fall protection is infeasible or creates a greater hazard. The safety monitor must be competent, able to recognize fall hazards, warn workers of hazards and unsafe practices, and have no other responsibilities that interfere with monitoring. Safety monitoring systems should only be used as a last resort when other systems cannot be implemented.',
  '29 CFR 1926.501',
  'Construction',
  ARRAY['fall protection', '1926.501', 'safety monitor', 'low-slope roof'],
  'needs_review',
  'pending',
  NULL
),

-- 29 CFR 1910.1200 (HazCom)
(
  'What elements are required on a GHS label?', 
  'According to 29 CFR 1910.1200(f), GHS-compliant labels for hazardous chemicals must include six required elements: (1) Product identifier (chemical name, code number, etc.), (2) Signal word ("Danger" for more severe hazards or "Warning" for less severe hazards), (3) Hazard statement(s) describing the nature of the hazard(s), (4) Pictogram(s) - black hazard symbols on white background with red diamond borders, (5) Precautionary statement(s) describing recommended measures to minimize adverse effects, and (6) Name, address, and telephone number of the chemical manufacturer, importer, or other responsible party. These elements ensure standardized communication of chemical hazards to workers.',
  '29 CFR 1910.1200',
  'Chemical Safety',
  ARRAY['HazCom', '1910.1200', 'GHS', 'labeling', 'hazard communication'],
  'needs_review',
  'pending',
  NULL
),
(
  'How often should Safety Data Sheets be updated?',
  'According to 29 CFR 1910.1200(g)(5), chemical manufacturers or importers must ensure that Safety Data Sheets (SDS) are updated within three months when they become aware of any new and significant information regarding the hazards of a chemical or ways to protect against those hazards. Additionally, they must provide the updated information to distributors and employers. There is no set interval for routine updates if no new information is available. Employers must maintain the most current version of the SDS for each hazardous chemical in their workplace and ensure these are readily accessible to employees during each work shift.',
  '29 CFR 1910.1200',
  'Chemical Safety',
  ARRAY['HazCom', '1910.1200', 'SDS', 'Safety Data Sheet', 'update'],
  'needs_review',
  'pending',
  NULL
);

-- Add more training examples (continued)
INSERT INTO public.paulie_queries (
  question, 
  response, 
  matched_regulation_id, 
  matched_category, 
  matched_keywords,
  review_status, 
  training_status, 
  improved_response
)
VALUES
-- 29 CFR 1910.134 (Respiratory Protection)
(
  'How often do respirator fit tests need to be performed?', 
  'According to 29 CFR 1910.134(f)(2), employers must ensure that employees using tight-fitting respirators undergo fit testing in the following circumstances: (1) Before initial use of the respirator, (2) Whenever a different respirator facepiece is used, (3) At least annually thereafter, and (4) Whenever the employee reports, or the employer, PLHCP, supervisor, or program administrator observes changes in the employee''s physical condition that could affect respirator fit (e.g., facial scarring, dental changes, cosmetic surgery, or obvious change in body weight). The annual requirement is the minimum standard frequency for routine fit testing.',
  '29 CFR 1910.134',
  'PPE',
  ARRAY['respiratory protection', '1910.134', 'fit test', 'respirator'],
  'needs_review',
  'pending',
  NULL
),
(
  'What medical evaluations are required for respirator users?',
  'According to 29 CFR 1910.134(e), employers must provide a medical evaluation to determine an employee''s ability to use a respirator before fit testing and use. This evaluation must be performed by a physician or other licensed healthcare professional (PLHCP) using the mandatory questionnaire in Appendix C or an equivalent examination. Based on initial results, the PLHCP may require a follow-up medical examination. The employer must provide the PLHCP with information about the respirator type, work conditions, and the respiratory protection program. Additional medical evaluations are required when: an employee reports medical signs/symptoms related to respirator use, a PLHCP, supervisor, or program administrator recommends reevaluation, information from the program suggests a need, or when changes in workplace conditions increase physiological burden.',
  '29 CFR 1910.134',
  'PPE',
  ARRAY['respiratory protection', '1910.134', 'medical evaluation', 'PLHCP'],
  'needs_review',
  'pending',
  NULL
),

-- 29 CFR 1910.178 (Forklifts)
(
  'How often must forklift operators be evaluated?', 
  'According to 29 CFR 1910.178(l)(4), employers must evaluate each powered industrial truck operator''s performance at least once every three years. Additionally, refresher training and evaluation are required when: the operator has been observed operating the vehicle in an unsafe manner, the operator has been involved in an accident or near-miss incident, the operator has received a negative evaluation, the operator is assigned to drive a different type of truck, or when conditions in the workplace change in a manner that could affect safe operation. This three-year evaluation requirement ensures operators maintain their skills and follow safe operating procedures.',
  '29 CFR 1910.178',
  'Equipment Safety',
  ARRAY['forklift', '1910.178', 'operator evaluation', 'powered industrial truck'],
  'needs_review',
  'pending',
  NULL
),
(
  'What training is required for forklift operators?',
  'According to 29 CFR 1910.178(l), all powered industrial truck (forklift) operators must receive comprehensive training before operating the equipment. The training must include formal instruction (lectures, videos, written materials), practical training (demonstrations by the trainer and exercises performed by the trainee), and evaluation of the operator''s performance in the workplace. The training must cover truck-related topics (operating instructions, controls, capacity, stability, inspections) and workplace-related topics (surface conditions, load manipulation, pedestrian traffic, hazardous locations, ramps, closed environments). Only trained and evaluated operators may operate forklifts. Certification of training and evaluation is required, which includes the operator''s name, training date, evaluation date, and identity of the trainer/evaluator.',
  '29 CFR 1910.178',
  'Equipment Safety',
  ARRAY['forklift', '1910.178', 'operator training', 'powered industrial truck', 'certification'],
  'needs_review',
  'pending',
  NULL
),

-- 29 CFR 1910.147 (Lockout/Tagout)
(
  'What are the requirements for lockout/tagout procedures?', 
  'According to 29 CFR 1910.147(c)(4), employers must develop, document, and utilize specific procedures for the control of potentially hazardous energy when employees are performing servicing or maintenance activities. These procedures must clearly outline the scope, purpose, authorization, rules, and techniques to be used for energy control, including specific steps for shutting down, isolating, blocking, and securing machines; steps for the placement, removal, and transfer of lockout/tagout devices; and requirements for testing machines to verify the effectiveness of isolation measures. The procedures must be documented, specific to each machine or equipment, and must address all energy sources. Procedures must be available to employees and updated when equipment or processes change.',
  '29 CFR 1910.147',
  'Equipment Safety',
  ARRAY['LOTO', '1910.147', 'lockout/tagout', 'energy control'],
  'needs_review',
  'pending',
  NULL
),
(
  'How often should lockout/tagout procedures be inspected?',
  'According to 29 CFR 1910.147(c)(6), employers must conduct a periodic inspection of the energy control procedure at least annually to ensure that the procedure and the requirements of the standard are being followed. The periodic inspection must be performed by an authorized employee other than the one(s) utilizing the energy control procedure being inspected. The inspection must include a review between the inspector and each authorized employee of that employee''s responsibilities under the energy control procedure. For lockout procedures, the review must be conducted between the inspector and each authorized employee. For tagout procedures, the review must include all affected employees. The employer must certify that the periodic inspections have been performed, identifying the machine or equipment, the date, the employees included, and the person performing the inspection.',
  '29 CFR 1910.147',
  'Equipment Safety',
  ARRAY['LOTO', '1910.147', 'lockout/tagout', 'periodic inspection'],
  'needs_review',
  'pending',
  NULL
),

-- 29 CFR 1910.132 (PPE General Requirements)
(
  'What is required in a PPE hazard assessment?', 
  'According to 29 CFR 1910.132(d), employers must assess the workplace to determine if hazards are present, or likely to be present, which necessitate the use of personal protective equipment (PPE). The hazard assessment must be properly documented through a written certification that identifies the workplace evaluated, the person certifying the evaluation has been performed, the date(s) of the hazard assessment, and a statement identifying the document as a certification of hazard assessment. The assessment must survey all job tasks and areas to identify sources of hazards to eyes, face, head, feet, hands, and other body parts. Based on this assessment, employers must select appropriate PPE that properly fits each affected employee and train employees on its use.',
  '29 CFR 1910.132',
  'PPE',
  ARRAY['PPE', '1910.132', 'hazard assessment', 'personal protective equipment'],
  'needs_review',
  'pending',
  NULL
),
(
  'When must employers provide PPE training to employees?',
  'According to 29 CFR 1910.132(f), employers must provide training to each employee who is required to use PPE. Training must be provided before the employee is allowed to perform work requiring PPE. Each affected employee must demonstrate an understanding of the training and the ability to use PPE properly before being allowed to perform work requiring its use. The training must cover: when PPE is necessary; what PPE is necessary; how to properly don, doff, adjust, and wear PPE; the limitations of the PPE; and the proper care, maintenance, useful life and disposal of the PPE. Retraining is required when: changes in the workplace render previous training obsolete; changes in the types of PPE to be used render previous training obsolete; or inadequacies in an affected employee''s knowledge or use of assigned PPE indicate that the employee has not retained the necessary understanding or skill.',
  '29 CFR 1910.132',
  'PPE',
  ARRAY['PPE', '1910.132', 'training', 'personal protective equipment'],
  'needs_review',
  'pending',
  NULL
);
