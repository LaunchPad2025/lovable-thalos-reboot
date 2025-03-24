
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
  // New fields
  severity_level?: string;
  industry_group?: string;
  tags?: string[];
  applicable_to?: string[];
}

/**
 * Ingests a new regulation into the database
 */
export async function ingestRegulation(data: RegulationData) {
  try {
    // Check if regulation already exists
    const exists = await checkRegulationExists(data.title, data.reference_number);
    if (exists) {
      toast.warning(`Regulation "${data.title}" already exists`);
      return null;
    }

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
      last_reviewed_date: new Date().toISOString(),
      // New fields
      severity_level: data.severity_level || null,
      industry_group: data.industry_group || null,
      tags: data.tags || null,
      applicable_to: data.applicable_to || null
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
    // First check by reference number if provided
    if (referenceNumber) {
      const { data: refData } = await supabase
        .from('regulations')
        .select('id')
        .eq('reference_number', referenceNumber)
        .limit(1);
      
      if (refData && refData.length > 0) {
        return true;
      }
    }
    
    // Then check by title
    const { data: titleData } = await supabase
      .from('regulations')
      .select('id')
      .eq('title', title)
      .limit(1);
    
    return Boolean(titleData && titleData.length > 0);
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

/**
 * Ingests multiple regulations from structured data
 * @param regulations Array of regulation data to ingest
 */
export async function batchIngestRegulations(regulations: RegulationData[]) {
  const results = {
    success: 0,
    failed: 0,
    skipped: 0,
    errors: [] as any[]
  };

  for (const regulation of regulations) {
    try {
      // Check if already exists
      const exists = await checkRegulationExists(regulation.title, regulation.reference_number);
      
      if (exists) {
        results.skipped++;
        continue;
      }
      
      await ingestRegulation(regulation);
      results.success++;
    } catch (error) {
      results.failed++;
      results.errors.push({
        regulation: regulation.title,
        error
      });
    }
  }

  if (results.success > 0) {
    toast.success(`Successfully ingested ${results.success} regulations`);
  }
  
  if (results.skipped > 0) {
    toast.info(`Skipped ${results.skipped} existing regulations`);
  }
  
  if (results.failed > 0) {
    toast.error(`Failed to ingest ${results.failed} regulations`);
  }

  return results;
}
