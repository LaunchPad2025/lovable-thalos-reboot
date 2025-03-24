
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface RegulationData {
  title: string;
  reference_number?: string;
  description?: string;
  industry?: string;
  authority?: string;
  source_url?: string;
  keywords?: string[];
  document_type?: string;
  jurisdiction?: string;
}

/**
 * Ingests a new regulation into the database
 */
export async function ingestRegulation(data: RegulationData) {
  try {
    // Format the data for database insertion
    const regulationData = {
      title: data.title,
      description: data.description || null,
      reference_number: data.reference_number || null,
      industry: data.industry || null,
      authority: data.authority || null,
      source_url: data.source_url || null,
      keywords: data.keywords || null,
      document_type: data.document_type || 'standard',
      jurisdiction: data.jurisdiction || null,
      status: 'active',
      created_at: new Date().toISOString(),
      last_reviewed_date: new Date().toISOString()
    };

    const { data: result, error } = await supabase
      .from('regulations')
      .insert([regulationData])
      .select()
      .single();

    if (error) throw error;
    
    toast.success(`Regulation "${data.title}" ingested successfully`);
    return result;
  } catch (error: any) {
    console.error('Error ingesting regulation:', error);
    toast.error(`Failed to ingest regulation: ${error.message}`);
    throw error;
  }
}

/**
 * Checks if a regulation already exists based on title and reference number
 */
export async function checkRegulationExists(title: string, referenceNumber?: string): Promise<boolean> {
  try {
    // Use a simpler approach with separate queries to avoid type inference issues
    if (referenceNumber) {
      // Check by reference number first
      const { data, error } = await supabase
        .from('regulations')
        .select('id')
        .eq('reference_number', referenceNumber)
        .limit(1);
      
      if (error) throw error;
      return data.length > 0;
    } 
    
    // Check by title
    const { data, error } = await supabase
      .from('regulations')
      .select('id')
      .eq('title', title)
      .limit(1);
    
    if (error) throw error;
    return data.length > 0;
  } catch (error) {
    console.error('Error checking regulation existence:', error);
    return false;
  }
}

/**
 * Updates an existing regulation with new data
 */
export async function updateRegulation(id: string, updates: Partial<RegulationData>) {
  try {
    const updateData = {
      ...updates,
      last_reviewed_date: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from('regulations')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    
    toast.success('Regulation updated successfully');
    return data;
  } catch (error: any) {
    console.error('Error updating regulation:', error);
    toast.error(`Failed to update regulation: ${error.message}`);
    throw error;
  }
}
