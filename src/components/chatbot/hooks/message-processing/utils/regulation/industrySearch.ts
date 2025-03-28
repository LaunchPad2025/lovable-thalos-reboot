
/**
 * Industry-based regulation search
 */
import { supabase } from '@/lib/supabase';
import { formatRegulationsResponse } from './responseFormatters';
import { logRegulationMatchFailure } from './loggingOperations';

/**
 * Find regulations by industry when no direct keyword matches are found
 */
export const findRegulationsByIndustry = async (query: string, keyTerms: string[], userId?: string): Promise<string | null> => {
  try {
    // Extract industry from query
    const industryTerms = ['construction', 'manufacturing', 'healthcare', 'oil & gas', 'oil and gas', 'mining', 'agriculture', 'retail', 'laboratory', 'logistics', 'food processing'];
    
    let detectedIndustry = null;
    
    for (const industry of industryTerms) {
      if (query.toLowerCase().includes(industry.toLowerCase())) {
        detectedIndustry = industry;
        break;
      }
    }
    
    if (!detectedIndustry) {
      // No industry detected, can't find industry-specific regulations
      await logRegulationMatchFailure(query, keyTerms, userId);
      return null;
    }
    
    // Standardize certain industry names
    if (detectedIndustry === 'oil & gas' || detectedIndustry === 'oil and gas') {
      detectedIndustry = 'oil_gas';
    } else if (detectedIndustry === 'food processing') {
      detectedIndustry = 'food_processing';
    }
    
    // Try to find regulations by industry or industry_tags array
    const { data: industryRegulations, error } = await supabase
      .from('regulations')
      .select('id, title, description, document_type, authority, source_url, keywords, category, updated_at, industry, industry_tags')
      .or(`industry.ilike.%${detectedIndustry}%,industry_tags.cs.{${detectedIndustry}}`)
      .order('updated_at', { ascending: false })
      .limit(3);
    
    if (error || !industryRegulations || industryRegulations.length === 0) {
      console.log('No industry-specific regulations found:', error || 'Empty result');
      
      // Log the failure for industry match as well
      await logRegulationMatchFailure(query, keyTerms, userId, detectedIndustry);
      
      return null;
    }
    
    // We found some industry-specific regulations, process them
    console.log(`Found ${industryRegulations.length} industry-specific regulations for ${detectedIndustry}`);
    
    // Create a special context message for industry matches
    const message = formatRegulationsResponse(
      industryRegulations, 
      query, 
      [...keyTerms, detectedIndustry], 
      [detectedIndustry]
    );
    
    return message;
  } catch (error) {
    console.error('Error in findRegulationsByIndustry:', error);
    return null;
  }
};
