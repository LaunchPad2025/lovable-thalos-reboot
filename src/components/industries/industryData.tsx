
import React from 'react';
import { HardHat, Shield, AlertCircle, FileText, Calendar, CheckSquare, VideoIcon, Users, ClipboardCheck, Construction, Industry as IndustryIcon, Pickaxe, Briefcase, Factory, Oil, BatteryCharging } from 'lucide-react';
import { Industry } from './types';

export const industryData: Industry[] = [
  {
    id: '1',
    name: 'Construction',
    slug: 'construction',
    heroDescription: 'Thalos helps construction companies navigate complex OSHA regulations, identify safety hazards in real-time, and maintain comprehensive compliance documentation for projects of all sizes.',
    heroImage: '/public/lovable-uploads/f4b67c18-aa53-452b-b131-aa1a6ae0779d.png',
    icon: <Construction className="h-6 w-6" />,
    color: 'orange',
    description: 'Comprehensive safety compliance solutions for the construction industry.',
    useCases: [
      {
        title: 'Real-Time Worksite Monitoring',
        description: 'Detect safety violations automatically with our AI-powered camera system.',
        icon: <AlertCircle className="h-6 w-6 text-blue-600" />,
        benefits: [
          'Identify missing PPE (hard hats, safety vests, fall protection)',
          'Detect unsafe worker behavior and practices',
          'Automated alerts for immediate intervention',
          'Historical data for trend analysis and preventive measures'
        ]
      },
      {
        title: 'OSHA Compliance Management',
        description: 'Stay ahead of complex regulatory requirements with automated compliance tracking.',
        icon: <Shield className="h-6 w-6 text-blue-600" />,
        benefits: [
          'Automated checklist generation based on project type',
          'Digital inspection forms with photo documentation',
          'Real-time compliance status dashboard',
          'Automated record-keeping for OSHA inspections'
        ]
      },
      {
        title: 'Safety Training & Certification',
        description: 'Manage worker training requirements and certifications in one place.',
        icon: <Users className="h-6 w-6 text-blue-600" />,
        benefits: [
          'Track certification expiration dates',
          'Worker-specific training requirements',
          'Digital training content delivery',
          'Automated reminder system for renewals'
        ]
      }
    ],
    regulations: [
      {
        title: 'OSHA 29 CFR 1926 - Construction Industry Regulations',
        description: 'Comprehensive safety standards for construction sites, covering fall protection, scaffolding, electrical safety, and more.',
        tags: ['OSHA', 'Federal', 'Construction']
      },
      {
        title: 'OSHA 29 CFR 1926.501 - Fall Protection',
        description: 'Requirements for providing fall protection systems for workers at heights of 6 feet or more above a lower level.',
        tags: ['OSHA', 'Fall Protection', 'Critical']
      },
      {
        title: 'OSHA 29 CFR 1926.451 - Scaffolding',
        description: 'Safety requirements for scaffold construction, inspection, and use on construction sites.',
        tags: ['OSHA', 'Scaffolding', 'High Risk']
      },
      {
        title: 'OSHA 29 CFR 1926.1153 - Respirable Crystalline Silica',
        description: 'Exposure limits and control methods for silica dust common in concrete cutting, drilling, and grinding.',
        tags: ['OSHA', 'Health Hazard', 'Respiratory']
      }
    ],
    safetyOfficerBenefits: [
      {
        title: 'Automated Hazard Detection',
        description: 'Our AI-powered system identifies safety hazards in real-time, allowing you to focus on critical interventions rather than constant monitoring.'
      },
      {
        title: 'Simplified Compliance Documentation',
        description: 'Generate comprehensive reports automatically, reducing administrative burden and ensuring all documentation meets regulatory requirements.'
      },
      {
        title: 'Multi-Site Management',
        description: 'Monitor safety compliance across multiple construction sites from a single dashboard, with site-specific analytics and reporting.'
      },
      {
        title: 'Proactive Risk Management',
        description: 'Identify trends and patterns in safety violations to implement preventive measures before incidents occur.'
      }
    ],
    dayInLife: [
      {
        time: '7:30 AM',
        activity: 'Daily Safety Briefing',
        description: 'Review hazards for today's tasks, ensure crew understanding of protocols.',
        withThalos: 'Access site-specific safety briefing templates pre-populated with current project risks and weather conditions.'
      },
      {
        time: '9:15 AM',
        activity: 'Site Walkthrough & Inspections',
        description: 'Physical inspection of worksite, identifying potential hazards.',
        withThalos: 'Use mobile app to document observations with photos, AI automatically flags compliance issues and suggests corrective actions.'
      },
      {
        time: '11:00 AM',
        activity: 'OSHA Documentation Review',
        description: 'Ensure all required safety documentation is current and accessible.',
        withThalos: 'Dashboard shows document status, automatically generating alerts for expiring certifications or missing documentation.'
      },
      {
        time: '2:30 PM',
        activity: 'Safety Incident Response',
        description: 'Investigate near-miss incident reported by crew member.',
        withThalos: 'Digital incident reporting with guided investigation protocols, automated notification to required stakeholders.'
      }
    ]
  },
  {
    id: '2',
    name: 'Mining',
    slug: 'mining',
    heroDescription: 'Thalos provides comprehensive safety solutions for the mining industry, helping companies comply with MSHA regulations, monitor hazardous conditions, and protect worker health and safety in challenging underground and surface operations.',
    heroImage: '/public/lovable-uploads/f4b67c18-aa53-452b-b131-aa1a6ae0779d.png',
    icon: <Pickaxe className="h-6 w-6" />,
    color: 'slate',
    description: 'Advanced safety compliance solutions for mining operations.',
    useCases: [
      {
        title: 'Underground Environment Monitoring',
        description: 'Track atmospheric conditions and structural integrity in real-time.',
        icon: <AlertCircle className="h-6 w-6 text-blue-600" />,
        benefits: [
          'Real-time monitoring of gas levels (methane, CO, CO2)',
          'Structural safety monitoring with alert thresholds',
          'Temperature and humidity tracking',
          'Integrated emergency response protocols'
        ]
      },
      {
        title: 'MSHA Compliance Management',
        description: 'Streamline compliance with Mine Safety and Health Administration regulations.',
        icon: <Shield className="h-6 w-6 text-blue-600" />,
        benefits: [
          'Automated inspection scheduling and tracking',
          'Digital documentation of all required MSHA records',
          'Violation tracking and corrective action workflows',
          'Training requirement management by worker role'
        ]
      },
      {
        title: 'Equipment Safety Monitoring',
        description: 'Ensure all mining equipment meets safety standards and is properly maintained.',
        icon: <ClipboardCheck className="h-6 w-6 text-blue-600" />,
        benefits: [
          'Scheduled maintenance tracking and alerts',
          'Pre-shift equipment inspection records',
          'Parts replacement forecasting',
          'Operator certification verification'
        ]
      }
    ],
    regulations: [
      {
        title: '30 CFR Part 56/57 - Safety and Health Standards',
        description: 'Comprehensive safety standards for surface and underground mining operations.',
        tags: ['MSHA', 'Federal', 'Mining']
      },
      {
        title: '30 CFR Part 75 - Mandatory Safety Standards—Underground Coal Mines',
        description: 'Specific requirements for ventilation, roof support, electrical equipment, and emergency response in underground coal mines.',
        tags: ['MSHA', 'Underground', 'Coal Mining']
      },
      {
        title: '30 CFR Part 62 - Occupational Noise Exposure',
        description: 'Standards for monitoring and controlling worker exposure to hazardous noise levels in mining operations.',
        tags: ['MSHA', 'Health Hazard', 'Hearing Conservation']
      },
      {
        title: '30 CFR Part 71 - Mandatory Health Standards—Surface Coal Mines',
        description: 'Requirements for dust control, air quality monitoring, and medical surveillance for surface coal mining operations.',
        tags: ['MSHA', 'Surface Mining', 'Health']
      }
    ],
    safetyOfficerBenefits: [
      {
        title: 'Comprehensive Environmental Monitoring',
        description: 'Integration with air quality, gas, and structural monitoring systems provides a complete view of mining conditions and automates alert thresholds.'
      },
      {
        title: 'Streamlined MSHA Documentation',
        description: 'Digital records management ensures all required documentation is properly maintained and readily available for inspections.'
      },
      {
        title: 'Worker Health Surveillance',
        description: 'Track exposure limits, medical examinations, and health monitoring requirements to protect miners from long-term health hazards.'
      },
      {
        title: 'Remote Site Management',
        description: 'Monitor safety compliance at multiple mining operations or remote sites from a central dashboard with real-time data.'
      }
    ],
    dayInLife: [
      {
        time: '5:30 AM',
        activity: 'Pre-Shift Safety Briefing',
        description: 'Review underground conditions, equipment status, and task-specific hazards.',
        withThalos: 'Access real-time environmental readings and overnight monitoring data to inform safety briefing content.'
      },
      {
        time: '7:00 AM',
        activity: 'Ventilation System Inspection',
        description: 'Verify proper operation of all ventilation equipment and measure air quality.',
        withThalos: 'Mobile app guides inspection process with digital checklists, automatically documenting readings and flagging any non-compliance issues.'
      },
      {
        time: '10:30 AM',
        activity: 'Worker Exposure Monitoring',
        description: 'Conduct personal dust sampling for workers in high-exposure areas.',
        withThalos: 'Track cumulative exposure data by worker, with automated alerts when approaching regulatory limits.'
      },
      {
        time: '2:00 PM',
        activity: 'MSHA Documentation Review',
        description: 'Prepare for upcoming MSHA inspection by reviewing required documentation.',
        withThalos: 'Generate comprehensive compliance reports with evidence of required inspections, maintenance, and training certifications.'
      }
    ]
  },
  {
    id: '3',
    name: 'Oil & Gas',
    slug: 'oil-gas',
    heroDescription: 'Thalos helps oil and gas companies navigate complex regulatory environments, manage high-risk operations, and implement rigorous safety protocols across drilling sites, refineries, and transportation networks.',
    heroImage: '/public/lovable-uploads/f4b67c18-aa53-452b-b131-aa1a6ae0779d.png',
    icon: <Oil className="h-6 w-6" />,
    color: 'yellow',
    description: 'Comprehensive safety compliance solutions for the oil and gas industry.',
    useCases: [
      {
        title: 'Process Safety Management',
        description: 'Implement and manage comprehensive PSM programs for high-hazard operations.',
        icon: <Shield className="h-6 w-6 text-blue-600" />,
        benefits: [
          'Digital PSM program documentation and management',
          'Process hazard analysis tracking and review scheduling',
          'Management of change (MOC) workflow automation',
          'Pre-startup safety review coordination'
        ]
      },
      {
        title: 'Hazardous Material Management',
        description: 'Track and manage hazardous substances throughout operations.',
        icon: <AlertCircle className="h-6 w-6 text-blue-600" />,
        benefits: [
          'Digital SDS management with mobile access',
          'Chemical inventory tracking and reporting',
          'Exposure monitoring and documentation',
          'Spill prevention and response planning'
        ]
      },
      {
        title: 'Contractor Safety Management',
        description: 'Ensure all contractors meet safety requirements for access to facilities.',
        icon: <Users className="h-6 w-6 text-blue-600" />,
        benefits: [
          'Contractor qualification verification',
          'Training and certification tracking',
          'Site-specific orientation management',
          'Contractor safety performance metrics'
        ]
      }
    ],
    regulations: [
      {
        title: '29 CFR 1910.119 - Process Safety Management of Highly Hazardous Chemicals',
        description: 'Comprehensive requirements for managing hazards associated with processes using highly hazardous chemicals.',
        tags: ['OSHA', 'PSM', 'Critical']
      },
      {
        title: '30 CFR Part 250 - Oil, Gas, and Sulfur Operations in the Outer Continental Shelf',
        description: 'Safety and environmental management system requirements for offshore drilling operations.',
        tags: ['BSEE', 'Offshore', 'Federal']
      },
      {
        title: '49 CFR Part 192 - Transportation of Natural and Other Gas by Pipeline',
        description: 'Minimum safety requirements for pipeline facilities and transportation of gas.',
        tags: ['PHMSA', 'Pipeline', 'Transportation']
      },
      {
        title: '40 CFR Part 112 - Oil Pollution Prevention',
        description: 'Requirements for prevention of, preparation for, and response to oil discharges at non-transportation-related facilities.',
        tags: ['EPA', 'Environmental', 'Spill Prevention']
      }
    ],
    safetyOfficerBenefits: [
      {
        title: 'Integrated Risk Management',
        description: 'Combine hazard assessments, incident data, and safety observations in a single system for comprehensive risk management.'
      },
      {
        title: 'Simplified Regulatory Compliance',
        description: 'Navigate complex and overlapping regulations from multiple agencies (OSHA, EPA, PHMSA, BSEE) with automated compliance tracking.'
      },
      {
        title: 'Emergency Response Readiness',
        description: 'Manage emergency response plans, drills, and resources to ensure preparedness for potential incidents at high-hazard facilities.'
      },
      {
        title: 'Contractor Safety Oversight',
        description: 'Streamline contractor qualification, training verification, and performance monitoring to reduce third-party safety risks.'
      }
    ],
    dayInLife: [
      {
        time: '6:00 AM',
        activity: 'Operational Risk Assessment',
        description: 'Review today's high-risk activities and ensure appropriate controls are in place.',
        withThalos: 'Access digital permit-to-work system showing all planned activities with automated risk level calculation and control verification.'
      },
      {
        time: '8:30 AM',
        activity: 'Process Safety Inspection',
        description: 'Conduct scheduled inspection of critical process safety equipment.',
        withThalos: 'Use mobile app for guided inspection protocols with digital documentation, automatic flagging of deficiencies.'
      },
      {
        time: '11:00 AM',
        activity: 'Contractor Safety Meeting',
        description: 'Meet with contractor supervisors to review safety requirements for upcoming maintenance turnaround.',
        withThalos: 'Generate contractor-specific safety packets with verification of training and qualification status for all personnel.'
      },
      {
        time: '2:15 PM',
        activity: 'Regulatory Compliance Review',
        description: 'Prepare for upcoming regulatory inspection by reviewing documentation and compliance status.',
        withThalos: 'Generate comprehensive compliance dashboards showing status of all regulatory requirements with supporting documentation.'
      }
    ]
  },
  {
    id: '4',
    name: 'Manufacturing',
    slug: 'manufacturing',
    heroDescription: 'Thalos transforms safety management in manufacturing environments, helping facilities maintain OSHA compliance, reduce workplace injuries, and optimize safety processes across production lines, equipment operations, and material handling.',
    heroImage: '/public/lovable-uploads/f4b67c18-aa53-452b-b131-aa1a6ae0779d.png',
    icon: <Factory className="h-6 w-6" />,
    color: 'blue',
    description: 'Comprehensive safety compliance solutions for the manufacturing industry.',
    useCases: [
      {
        title: 'Machine Safety Monitoring',
        description: 'Ensure all equipment meets safety standards and has proper guarding and controls.',
        icon: <AlertCircle className="h-6 w-6 text-blue-600" />,
        benefits: [
          'Machine guarding inspection management',
          'Lockout/tagout procedure documentation',
          'Equipment-specific safety protocol tracking',
          'Safety control system verification'
        ]
      },
      {
        title: 'Ergonomics Management',
        description: 'Identify and mitigate ergonomic hazards in manufacturing processes.',
        icon: <Users className="h-6 w-6 text-blue-600" />,
        benefits: [
          'Workstation ergonomic assessments',
          'Job rotation scheduling for high-risk tasks',
          'Early symptom reporting and tracking',
          'Ergonomic improvement implementation tracking'
        ]
      },
      {
        title: 'Industrial Hygiene Program',
        description: 'Monitor and control employee exposure to chemical, physical, and biological hazards.',
        icon: <Shield className="h-6 w-6 text-blue-600" />,
        benefits: [
          'Exposure assessment scheduling and tracking',
          'Personal and area monitoring data management',
          'Ventilation system efficiency monitoring',
          'PPE selection and fit testing management'
        ]
      }
    ],
    regulations: [
      {
        title: '29 CFR 1910 - General Industry Standards',
        description: 'Comprehensive safety standards for manufacturing facilities covering machine guarding, electrical safety, hazard communication, and more.',
        tags: ['OSHA', 'Federal', 'Manufacturing']
      },
      {
        title: '29 CFR 1910.147 - The Control of Hazardous Energy (Lockout/Tagout)',
        description: 'Requirements for controlling hazardous energy during servicing and maintenance of machines and equipment.',
        tags: ['OSHA', 'Lockout/Tagout', 'Critical']
      },
      {
        title: '29 CFR 1910.1200 - Hazard Communication',
        description: 'Requirements for chemical hazard classification, labeling, safety data sheets, and employee training.',
        tags: ['OSHA', 'Chemical Safety', 'HazCom']
      },
      {
        title: '29 CFR 1910.95 - Occupational Noise Exposure',
        description: 'Standards for protecting workers from the effects of noise exposure in manufacturing environments.',
        tags: ['OSHA', 'Health Hazard', 'Hearing Conservation']
      }
    ],
    safetyOfficerBenefits: [
      {
        title: 'Comprehensive Machine Safety Management',
        description: 'Track all aspects of machine safety including guarding, risk assessments, and lockout/tagout procedures in a centralized system.'
      },
      {
        title: 'Streamlined Chemical Management',
        description: 'Maintain digital SDS library, track chemical inventories, and manage exposure monitoring data for industrial hygiene compliance.'
      },
      {
        title: 'Injury Prevention Analytics',
        description: 'Identify trends in near-misses and minor injuries to implement preventive measures before serious incidents occur.'
      },
      {
        title: 'Production-Integrated Safety Protocols',
        description: 'Align safety requirements with production processes to minimize disruption while maximizing protection.'
      }
    ],
    dayInLife: [
      {
        time: '7:00 AM',
        activity: 'Production Safety Review',
        description: 'Review safety considerations for today's production schedule and any new processes.',
        withThalos: 'Access dashboard showing safety status of all production lines with alerts for any new or changed processes requiring review.'
      },
      {
        time: '9:15 AM',
        activity: 'Machine Guarding Audit',
        description: 'Conduct scheduled inspection of machine guards and safety interlocks.',
        withThalos: 'Use mobile app for equipment-specific inspection checklists with photo documentation and compliance verification.'
      },
      {
        time: '11:30 AM',
        activity: 'Industrial Hygiene Sampling',
        description: 'Set up personal monitoring equipment for workers in areas with potential chemical exposure.',
        withThalos: 'Track sampling schedule, equipment calibration, and maintain historical exposure data by work area and job function.'
      },
      {
        time: '2:45 PM',
        activity: 'Safety Committee Meeting',
        description: 'Lead monthly safety committee meeting to review incidents and improvement initiatives.',
        withThalos: 'Generate comprehensive safety performance reports with trend analysis and automated recommendation tracking.'
      }
    ]
  },
  {
    id: '5',
    name: 'Energy & Utilities',
    slug: 'energy-utilities',
    heroDescription: 'Thalos provides specialized safety compliance solutions for the energy and utilities sector, addressing the unique challenges of electrical safety, renewable energy, infrastructure maintenance, and regulatory compliance across diverse operations.',
    heroImage: '/public/lovable-uploads/f4b67c18-aa53-452b-b131-aa1a6ae0779d.png',
    icon: <BatteryCharging className="h-6 w-6" />,
    color: 'green',
    description: 'Comprehensive safety compliance solutions for the energy and utilities industry.',
    useCases: [
      {
        title: 'Electrical Safety Program Management',
        description: 'Implement comprehensive electrical safety protocols for high and low voltage work.',
        icon: <AlertCircle className="h-6 w-6 text-blue-600" />,
        benefits: [
          'Arc flash hazard analysis documentation',
          'Qualified worker training and certification tracking',
          'Energized work permit management',
          'Electrical PPE inspection and testing records'
        ]
      },
      {
        title: 'Infrastructure Safety Inspection',
        description: 'Manage safety inspections for transmission, distribution, and generation assets.',
        icon: <ClipboardCheck className="h-6 w-6 text-blue-600" />,
        benefits: [
          'Scheduled inspection management for diverse assets',
          'Mobile inspection tools with offline capability for remote locations',
          'Deficiency tracking and corrective action workflow',
          'Regulatory compliance documentation'
        ]
      },
      {
        title: 'Contractor Safety Oversight',
        description: 'Ensure contractors working on utility infrastructure meet all safety requirements.',
        icon: <Users className="h-6 w-6 text-blue-600" />,
        benefits: [
          'Contractor prequalification management',
          'Project-specific safety plan reviews',
          'Field safety observation documentation',
          'Safety performance metrics by contractor'
        ]
      }
    ],
    regulations: [
      {
        title: 'NFPA 70E - Standard for Electrical Safety in the Workplace',
        description: 'Requirements for safe work practices to protect personnel from electrical hazards in the workplace.',
        tags: ['NFPA', 'Electrical', 'Critical']
      },
      {
        title: '29 CFR 1910.269 - Electric Power Generation, Transmission, and Distribution',
        description: 'Safety standards for the operation and maintenance of electric power generation, transmission, and distribution lines and equipment.',
        tags: ['OSHA', 'Utility', 'Federal']
      },
      {
        title: '29 CFR 1926 Subpart V - Electric Power Transmission and Distribution',
        description: 'Safety requirements for the construction of electric transmission and distribution lines and equipment.',
        tags: ['OSHA', 'Construction', 'Electrical']
      },
      {
        title: '18 CFR Part 12 - Safety of Water Power Projects and Project Works',
        description: 'Safety requirements for hydroelectric facilities licensed by the Federal Energy Regulatory Commission.',
        tags: ['FERC', 'Hydroelectric', 'Federal']
      }
    ],
    safetyOfficerBenefits: [
      {
        title: 'Specialized Electrical Safety Management',
        description: 'Comprehensive tools for managing electrical safety programs, including arc flash studies, lockout/tagout procedures, and qualified worker validation.'
      },
      {
        title: 'Multi-Regulatory Compliance',
        description: 'Navigate complex requirements from multiple agencies (OSHA, FERC, EPA, state PUCs) with automated compliance tracking and documentation.'
      },
      {
        title: 'Remote Workforce Safety',
        description: 'Ensure consistent safety practices across geographically dispersed operations with mobile tools and centralized oversight capabilities.'
      },
      {
        title: 'Critical Infrastructure Protection',
        description: 'Integrate safety and security protocols to protect critical energy infrastructure while maintaining worker safety.'
      }
    ],
    dayInLife: [
      {
        time: '6:30 AM',
        activity: 'Daily Work Plan Review',
        description: 'Review planned maintenance activities and associated safety requirements.',
        withThalos: 'Access integrated work management system showing all planned work with automated safety protocol assignments based on task classification.'
      },
      {
        time: '8:00 AM',
        activity: 'High-Voltage Safety Briefing',
        description: 'Conduct job briefing for crew performing substation maintenance.',
        withThalos: 'Generate job-specific safety briefing packets with up-to-date diagrams, energization status, and required protective measures.'
      },
      {
        time: '10:30 AM',
        activity: 'Contractor Safety Verification',
        description: 'Verify safety qualifications for contract crew arriving for transmission line work.',
        withThalos: 'Instantly validate contractor qualifications via mobile app, including training certifications and background checks.'
      },
      {
        time: '2:00 PM',
        activity: 'Regulatory Compliance Audit',
        description: 'Prepare documentation for upcoming OSHA compliance audit.',
        withThalos: 'Generate comprehensive compliance reports with evidence of training, inspections, and safety program implementation.'
      }
    ]
  }
];
