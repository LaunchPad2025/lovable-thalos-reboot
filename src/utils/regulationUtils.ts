
import { supabase } from '@/lib/supabase';

export async function checkRegulationExists(id: string): Promise<boolean> {
  if (!id) return false;
  
  const { data, error } = await supabase
    .from('regulations')
    .select('id')
    .eq('id', id)
    .maybeSingle();
  
  if (error) {
    console.error('Error checking if regulation exists:', error);
    return false;
  }
  
  return !!data;
}
