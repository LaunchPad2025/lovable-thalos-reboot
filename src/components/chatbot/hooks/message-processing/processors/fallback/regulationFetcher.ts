
import { supabase } from '@/lib/supabase';

/**
 * Fetch industry-specific regulations from the database
 */
export const fetchIndustrySpecificRegulations = async (
  detectedIndustry: string | null
): Promise<any[] | null> => {
  if (!detectedIndustry) return null;
  
  try {
    // Try to find at least one relevant regulation for the detected industry
    const { data: regulations, error } = await supabase
      .from('regulations')
      .select('id, title, description, document_type, authority, source_url, category')
      .filter('industry_tags', 'cs', `{${detectedIndustry}}`)
      .order('updated_at', { ascending: false })
      .limit(1);
    
    if (!error && regulations && regulations.length > 0) {
      return regulations;
    }
  } catch (error) {
    console.error("Error fetching industry-specific regulations:", error);
  }
  
  return null;
};
