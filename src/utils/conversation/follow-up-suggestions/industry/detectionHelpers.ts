
import { industrySpecificKeywords } from './industryKeywords';

/**
 * Helper function to detect specific industry contexts
 */
export const detectRefineryContext = (text: string): boolean => {
  return text.includes('refinery') || 
         text.includes('refineries') || 
         text.includes('petrochemical') || 
         text.includes('petroleum processing');
};

/**
 * Safety topics that imply a specific industry context
 */
export const safetyTopicToIndustryMap: Record<string, string> = {
  'scaffolding': 'construction',
  'crane': 'construction',
  'excavation': 'construction',
  'machine guarding': 'manufacturing',
  'assembly line': 'manufacturing',
  'hazardous drugs': 'healthcare',
  'patient': 'healthcare',
  'forklift': 'logistics',
  'warehouse': 'logistics',
  'chemical hood': 'laboratory',
  'experiment': 'laboratory',
  'h2s': 'oil_gas',
  'drilling': 'oil_gas',
  'process safety': 'oil_gas',
  'hot work permit': 'oil_gas',
  'ventilation in mines': 'mining',
  'underground': 'mining',
  'pesticide': 'agriculture',
  'tractor': 'agriculture',
  'retail store': 'retail',
  'merchandise': 'retail',
  'food processing': 'food_processing',
  'meat processing': 'food_processing'
};

/**
 * Detect industry based on direct keyword mentions
 */
export const detectIndustryFromKeywords = (text: string): string | null => {
  for (const [industry, keywords] of Object.entries(industrySpecificKeywords)) {
    if (keywords.some(keyword => text.includes(keyword.toLowerCase()))) {
      return industry;
    }
  }
  return null;
};

/**
 * Detect industry based on related safety topics
 */
export const detectIndustryFromSafetyTopics = (text: string): string | null => {
  for (const [topic, industry] of Object.entries(safetyTopicToIndustryMap)) {
    if (text.includes(topic.toLowerCase())) {
      return industry;
    }
  }
  return null;
};
