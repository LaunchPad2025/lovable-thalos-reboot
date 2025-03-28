
/**
 * Industry detection utilities for regulation search
 */
import { supabase } from '@/lib/supabase';
import { industryTerms } from './industryTerms';

/**
 * Detect industry from query content
 * 
 * @param query User query string
 * @returns Detected industry or null if none found
 */
export const detectIndustryFromQuery = (query: string): string | null => {
  // Check for industry mentions in the query
  for (const [industry, terms] of Object.entries(industryTerms)) {
    for (const term of terms) {
      if (query.toLowerCase().includes(term.toLowerCase())) {
        return standardizeIndustryName(industry);
      }
    }
  }
  
  return null;
};

/**
 * Standardize industry names for consistent database queries
 */
export const standardizeIndustryName = (industry: string): string => {
  // Standardize certain industry names
  if (industry === 'oil & gas' || industry === 'oil and gas') {
    return 'oil_gas';
  } else if (industry === 'food processing') {
    return 'food_processing';
  }
  
  return industry;
};

/**
 * Find regulations by industry in the database
 * 
 * @param industry The detected industry
 * @returns Database records for matching regulations or null if none found
 */
export const fetchIndustryRegulations = async (industry: string): Promise<any[] | null> => {
  if (!industry) return null;
  
  try {
    // Try to find regulations by industry or industry_tags array
    const { data: industryRegulations, error } = await supabase
      .from('regulations')
      .select('id, title, description, document_type, authority, source_url, keywords, category, updated_at, industry, industry_tags')
      .or(`industry.ilike.%${industry}%,industry_tags.cs.{${industry}}`)
      .order('updated_at', { ascending: false })
      .limit(3);
    
    if (error || !industryRegulations || industryRegulations.length === 0) {
      console.log('No industry-specific regulations found:', error || 'Empty result');
      return null;
    }
    
    return industryRegulations;
  } catch (error) {
    console.error('Error fetching industry-specific regulations:', error);
    return null;
  }
};
