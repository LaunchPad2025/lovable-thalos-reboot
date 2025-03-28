
/**
 * Get top safety categories for a specific industry, tailored for more accurate responses
 */
export const getTopSafetyCategoriesForIndustry = (industry: string): string[] => {
  const categoriesByIndustry: Record<string, string[]> = {
    'oil_gas': [
      'Process Safety Management (PSM)',
      'H2S Safety and Monitoring',
      'Hot Work Permits',
      'Confined Space Entry',
      'Emergency Response Planning',
      'Lockout/Tagout (LOTO)'
    ],
    'construction': [
      'Fall Protection',
      'Electrical Safety',
      'Trenching and Excavation',
      'Struck-by Hazards',
      'Scaffolding'
    ],
    'manufacturing': [
      'Machine Guarding',
      'Lockout/Tagout',
      'Hazardous Materials',
      'Ergonomics',
      'Electrical Safety'
    ],
    'healthcare': [
      'Bloodborne Pathogens',
      'Ergonomics',
      'Workplace Violence',
      'Hazardous Drugs',
      'Needlestick Prevention'
    ],
    'logistics': [
      'Forklift Safety',
      'Material Handling',
      'Loading Dock Safety',
      'Racking and Storage',
      'Pedestrian Safety'
    ],
    'laboratory': [
      'Chemical Safety',
      'Biological Safety',
      'Emergency Equipment',
      'Fume Hood Operations',
      'PPE Requirements'
    ]
  };
  
  return categoriesByIndustry[industry] || [
    'Hazard Communication',
    'Emergency Action Plans',
    'Fire Safety',
    'PPE Requirements',
    'Job Hazard Analysis'
  ];
};
