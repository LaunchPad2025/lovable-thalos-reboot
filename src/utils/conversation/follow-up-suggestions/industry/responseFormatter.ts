
import { getTopSafetyCategoriesByIndustry } from './suggestionGenerator';

/**
 * Format a fallback response that uses industry context
 * Enhanced for oil & gas/refinery specific responses
 */
export const formatIndustryFallbackResponse = (industry: string | null, query: string): string => {
  if (!industry) {
    return `I wasn't able to find a specific regulation that matches your query. Could you provide more details about your industry or the specific hazard you're concerned about?`;
  }
  
  const formattedIndustry = industry.replace('_', ' ');
  const topCategories = getTopSafetyCategoriesByIndustry(industry);
  
  // Specialized response for oil & gas industry
  if (industry === 'oil_gas') {
    // Check if refinery specific
    if (query.toLowerCase().includes('refiner')) {
      return `**Oil Refinery Safety Regulations**

OSHA's Process Safety Management standard (29 CFR 1910.119) applies specifically to petroleum refineries and facilities with hazardous chemicals above threshold quantities.

Key safety requirements for refineries include:

• Process Safety Management (PSM) program implementation
• H2S safety programs and continuous air monitoring
• Permit-required confined space entry procedures
• Hot work permits for welding and cutting (29 CFR 1910.252)
• Emergency response planning (29 CFR 1910.120)
• Lockout/Tagout (LOTO) procedures (29 CFR 1910.147)

Would you like information about implementing any of these specific refinery safety programs?`;
    }
    
    // General oil & gas response
    return `**Oil & Gas Safety Regulations**

The oil & gas industry is governed by several OSHA standards, with these being most critical:

• Process Safety Management (29 CFR 1910.119) for facilities with threshold quantities of hazardous chemicals
• HAZWOPER (29 CFR 1910.120) for emergency response to releases
• Confined spaces (29 CFR 1910.146) for tank and vessel entry
• Hot work (29 CFR 1910.252) for welding and cutting operations
• Respiratory protection (29 CFR 1910.134) for H2S and other hazards

Would you like more specific information about any of these regulations for the ${formattedIndustry} industry?`;
  }
  
  // For other industries, use the standard response
  const topCategoriesList = topCategories.map(cat => `• ${cat}`).join('\n');
  
  return `I wasn't able to find a regulation specifically for ${formattedIndustry} safety protocols as requested, but here are the top compliance areas for that industry:

${topCategoriesList}

Would you like more specific information about any of these areas in the ${formattedIndustry} industry?`;
};
