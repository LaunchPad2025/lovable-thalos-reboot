
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { Message } from './types';

export const useChatMessages = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm Paulie, your workplace safety assistant powered by BLIP2 vision + language AI. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const sendMessage = async (messageText: string, imageFile: File | null) => {
    setIsLoading(true);
    
    try {
      // Add user message to chat
      const userMessage: Message = {
        id: Date.now().toString(),
        content: messageText,
        sender: 'user',
        timestamp: new Date(),
        imageUrl: imageFile ? URL.createObjectURL(imageFile) : undefined
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // Prepare request data for the model
      const requestData: any = {
        violationText: messageText,
        industry: "All",
        modelId: "blip2"
      };
      
      if (imageFile) {
        requestData.violationImageUrl = `mock_url_for_${imageFile.name}`;
      }
      
      // Call the Edge Function
      let response;
      
      try {
        const { data, error } = await supabase.functions.invoke('analyze-violation', {
          body: requestData
        });
        
        if (error) throw error;
        response = data;
      } catch (error) {
        console.error("Error calling model API:", error);
        
        // Fallback to mock responses if the edge function fails
        const botResponses = [
          "I analyzed your input and found potential safety concerns. Workers should always wear appropriate PPE including helmets, safety glasses, and high-visibility vests when in construction areas.",
          "Based on what you've shared, there may be a compliance issue with workplace safety regulations. Ensure that all electrical equipment is properly grounded and that no wires are exposed.",
          "I notice this appears to be a warehouse environment. It's important to maintain clear pathways, proper storage of materials, and ensure all workers have received proper training on equipment operation.",
          "From my analysis, this looks like a hazardous area that requires immediate attention. I recommend cordoning off this space and having a qualified safety inspector evaluate it.",
          "Safety in manufacturing environments requires constant vigilance. Ensure that all machinery has proper guards, emergency stop mechanisms are accessible, and workers are following established protocols."
        ];
        
        response = {
          description: botResponses[Math.floor(Math.random() * botResponses.length)]
        };
      }
      
      // Create the bot's response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.description || "I'm sorry, I couldn't analyze your query. Please try again with more information.",
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error in chat process:", error);
      toast({
        title: "Error",
        description: "Failed to process your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    messages,
    isLoading,
    sendMessage
  };
};
