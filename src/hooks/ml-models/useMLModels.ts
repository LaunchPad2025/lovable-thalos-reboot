
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { MLModel } from './types';
import { defaultModels } from './defaultModels';
import { initializeDefaultModels } from './modelUtils';

/**
 * Main hook to fetch all ML models
 */
export function useMLModels() {
  return useQuery({
    queryKey: ['ml-models'],
    queryFn: async () => {
      try {
        // Check if we have models in the database
        const { data: existingModels, error } = await supabase
          .from('ml_models')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error("Error fetching models:", error);
          throw error;
        }
        
        // If there are no models, add our default models
        if (!existingModels || existingModels.length === 0) {
          console.log("No models found, inserting default models");
          
          try {
            return await initializeDefaultModels();
          } catch (err) {
            console.error("Unable to insert default models, using hardcoded default models");
            return defaultModels;
          }
        }
        
        console.log(`Found ${existingModels.length} models in database`);
        return existingModels as MLModel[];
      } catch (err) {
        console.error("Exception in useMLModels:", err);
        // If anything fails, return hardcoded default models
        return defaultModels;
      }
    },
    retry: 1, // Retry once in case of network issues
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
}
