import { supabase } from "@/supabase";

export const fetchRegulations = async () => {
  try {
    const { data: regulations, error } = await supabase
      .from('regulations')
      .select('*');

    if (error) {
      console.error("Error fetching regulations:", error);
      return [];
    }

    return regulations || [];
  } catch (error) {
    console.error("Error fetching regulations:", error);
    return [];
  }
};

export const fetchRegulationById = async (id: string) => {
  try {
    const { data: regulation, error } = await supabase
      .from('regulations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching regulation with ID ${id}:`, error);
      return null;
    }

    return regulation || null;
  } catch (error) {
    console.error(`Error fetching regulation with ID ${id}:`, error);
    return null;
  }
};

export const checkRegulationExists = async (id: string) => {
  try {
    // Use a simple query to check if a regulation exists
    const { data, error } = await supabase
      .from('regulations')
      .select('id')
      .eq('id', id)
      .single();
      
    if (error) {
      console.error('Error checking regulation existence:', error);
      return false;
    }
    
    return !!data;
  } catch (error) {
    console.error('Error checking regulation existence:', error);
    return false;
  }
};

export const createRegulation = async (regulationData: any) => {
  try {
    const { data, error } = await supabase
      .from('regulations')
      .insert([regulationData]);

    if (error) {
      console.error("Error creating regulation:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error creating regulation:", error);
    return { success: false, error: 'Failed to create regulation' };
  }
};

export const updateRegulation = async (id: string, regulationData: any) => {
  try {
    const { data, error } = await supabase
      .from('regulations')
      .update(regulationData)
      .eq('id', id);

    if (error) {
      console.error(`Error updating regulation with ID ${id}:`, error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error(`Error updating regulation with ID ${id}:`, error);
    return { success: false, error: 'Failed to update regulation' };
  }
};

export const deleteRegulation = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from('regulations')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(`Error deleting regulation with ID ${id}:`, error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error(`Error deleting regulation with ID ${id}:`, error);
    return { success: false, error: 'Failed to delete regulation' };
  }
};
