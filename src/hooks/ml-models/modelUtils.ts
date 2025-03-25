
import { supabase } from '@/lib/supabase';
import { defaultModelDefinitions } from './defaultModels';
import { MLModel } from './types';

/**
 * Initialize default models in the database if none exist
 */
export async function initializeDefaultModels(): Promise<MLModel[]> {
  try {
    console.log("Inserting default models");
    
    // Insert the models into the database
    const { data: insertedModels, error: insertError } = await supabase
      .from('ml_models')
      .insert(defaultModelDefinitions)
      .select();
      
    if (insertError) {
      console.error("Error inserting default models:", insertError);
      throw insertError;
    }
    
    console.log("Successfully inserted default models");
    return insertedModels as MLModel[];
  } catch (insertErr) {
    console.error("Failed to insert default models:", insertErr);
    throw insertErr;
  }
}
