
import { toast } from 'sonner';
import { Message } from '../../types';
import { supabase } from '@/lib/supabase';
import { extractTopicFromQuery } from './topicExtractor';
import { generateImprovedFallback } from './fallbackGenerator';
import { generateTopicSpecificSuggestions } from './suggestionGenerator';

/**
 * Handle sending a message, with optional image attachment
 */
export const handleSendMessage = async (
  content: string, 
  imageFile: File | null | undefined,
  allMessages: Message[],
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setFollowUpSuggestions: React.Dispatch<React.SetStateAction<string[]>>,
  processImageForSafetyViolations: (imageFile: File, messageId: string, setMessages: React.Dispatch<React.SetStateAction<Message[]>>) => void,
  processUserMessage: (content: string, allMessages: Message[], setMessages: React.Dispatch<React.SetStateAction<Message[]>>, setFollowUpSuggestions: React.Dispatch<React.SetStateAction<string[]>>) => Promise<Message>
): Promise<void> => {
  if (!content.trim() && !imageFile) return;

  // Add user message
  const userMessage: Message = {
    id: Date.now().toString(),
    content,
    role: 'user',
    timestamp: new Date().toISOString(),
    imageUrl: imageFile ? URL.createObjectURL(imageFile) : undefined
  };
  
  setMessages(prev => [...prev, userMessage]);
  setIsLoading(true);
  setFollowUpSuggestions([]); // Clear previous suggestions
  
  try {
    // Log the user's query to paulie_queries table
    try {
      const user = await supabase.auth.getUser();
      const userId = user.data?.user?.id;
      
      await supabase.from('paulie_queries').insert({
        question: content,
        user_id: userId || null
      });
    } catch (logError) {
      console.error('Error logging initial query:', logError);
      // Continue even if logging fails
    }
    
    // Processing image if provided
    if (imageFile) {
      console.log("Processing image for safety analysis");
      processImageForSafetyViolations(imageFile, userMessage.id, setMessages);
    }
    
    // Get the current conversation for context
    const updatedMessages = [...allMessages, userMessage];
    
    // Process the user message and get AI response
    await processUserMessage(content, updatedMessages, setMessages, setFollowUpSuggestions);
  } catch (error) {
    console.error('Error sending message:', error);
    
    // Extract topic from user query for better fallback response
    const topic = extractTopicFromQuery(content);
    
    // Add improved fallback message
    const errorMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: generateImprovedFallback(topic, content),
      role: 'assistant',
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, errorMessage]);
    
    // Generate some topic-specific follow-up suggestions
    setFollowUpSuggestions(generateTopicSpecificSuggestions(topic));
    
    toast.error('Using local knowledge base, connection issue detected');
  } finally {
    setIsLoading(false);
  }
};
