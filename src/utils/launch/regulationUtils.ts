
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

/**
 * Verify that all regulations are properly linked to the correct industries
 */
export async function verifyRegulationIndustryMapping() {
  try {
    const { data, error } = await supabase
      .from('regulations')
      .select('id, title, industry')
      .is('industry', null);
    
    if (error) throw error;
    
    if (data && data.length > 0) {
      toast.warning(`Found ${data.length} regulations without industry mapping`);
      return { success: false, unmappedCount: data.length };
    }
    
    toast.success('All regulations have industry mappings');
    return { success: true, unmappedCount: 0 };
  } catch (error: any) {
    console.error('Error verifying regulation industry mapping:', error);
    toast.error(`Failed to verify regulation mappings: ${error.message}`);
    return { success: false, error: error.message };
  }
}
