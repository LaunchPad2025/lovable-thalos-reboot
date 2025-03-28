
import { getTrainingMatrixResponse, getTrainingCalendarResponse } from '../utils/follow-up/matrixCalendarResponses';
import { supabase } from '@/lib/supabase';

/**
 * Process queries that might match specialized responses like training matrices
 */
export const processSpecializedResponses = async (
  content: string,
  messageId: string
): Promise<{ 
  match: boolean; 
  response: string | null;
  followUpSuggestions: string[];
}> => {
  // Check for specialized responses first
  const matrixResponse = getTrainingMatrixResponse(content);
  if (matrixResponse) {
    // Update paulie_queries table with the response
    try {
      await supabase.from('paulie_queries').update({
        response: matrixResponse,
        matched_category: 'training'
      }).eq('message_id', messageId);
    } catch (error) {
      console.error('Error updating query with response:', error);
    }
    
    return {
      match: true,
      response: matrixResponse,
      followUpSuggestions: [
        "How do I determine which training topics are required for each position?",
        "What's the best way to track training completion status?",
        "Can you provide a sample training attendance form?"
      ]
    };
  }
  
  const calendarResponse = getTrainingCalendarResponse(content);
  if (calendarResponse) {
    // Update paulie_queries table with the response
    try {
      await supabase.from('paulie_queries').update({
        response: calendarResponse,
        matched_category: 'training'
      }).eq('message_id', messageId);
    } catch (error) {
      console.error('Error updating query with response:', error);
    }
    
    return {
      match: true,
      response: calendarResponse,
      followUpSuggestions: [
        "What safety topics should be prioritized in my training calendar?",
        "How do I measure training effectiveness?",
        "Can you provide a training needs assessment template?"
      ]
    };
  }
  
  return {
    match: false,
    response: null,
    followUpSuggestions: []
  };
};
