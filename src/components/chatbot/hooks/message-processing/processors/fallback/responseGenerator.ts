
import { getTopSafetyCategoriesForIndustry } from './safetyCategories';

/**
 * Generate industry-specific response with regulation information
 */
export const generateIndustryRegulationResponse = (
  detectedIndustry: string, 
  regulation: any
): string => {
  // Create a more specific response with the regulation found
  let response = `Based on your question about ${detectedIndustry.replace('_', ' ')} safety, here's a relevant regulation:

**${regulation.title || 'Safety Regulation'}**
${regulation.description || ''}

This is part of ${regulation.document_type || ''} ${regulation.authority || ''}.

Other important safety areas in the ${detectedIndustry.replace('_', ' ')} industry include:
`;

  // Get the top safety categories for this industry
  const topCategories = getTopSafetyCategoriesForIndustry(detectedIndustry);
  for (const category of topCategories.slice(0, 3)) {
    response += `• ${category}\n`;
  }
  
  response += '\nWould you like more specific information about any of these areas?';
  
  return response;
};
