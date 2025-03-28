
import { supabase } from '@/lib/supabase';

/**
 * Log user queries to Supabase
 */
export const logUserQuery = async (
  content: string,
  userId: string | null
): Promise<string> => {
  const messageId = Date.now().toString();
  
  try {
    await supabase.from('paulie_queries').insert({
      question: content,
      user_id: userId,
      message_id: messageId
    });
    
    return messageId;
  } catch (error) {
    console.error('Error logging initial query:', error);
    // Return a valid message ID even if logging fails
    return messageId;
  }
};
