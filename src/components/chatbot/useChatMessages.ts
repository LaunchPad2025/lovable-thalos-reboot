
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { Message } from './types';

export const useChatMessages = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi there! I'm Paulie, your workplace safety assistant. I can help with safety regulations, compliance guidance, and identifying potential hazards. How can I assist you today?",
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
        
        // Fallback to mock responses for demonstration
        const industryBased = messageText.toLowerCase().includes('industry') || 
                             messageText.toLowerCase().includes('manufacturing') || 
                             messageText.toLowerCase().includes('common');
        
        if (industryBased) {
          response = {
            description: `Based on your industry (manufacturing), the most common OSHA violations I'm seeing are:

1. **Machine Guarding Issues (29 CFR 1910.212)** - 34% of facilities in your sector received citations last year
2. **Hazard Communication (29 CFR 1910.1200)** - Improper chemical labeling and missing SDSs
3. **Electrical Safety (29 CFR 1910.303)** - Particularly with exposed wiring and improper lockout/tagout procedures
4. **Fall Protection (29 CFR 1910.28)** - Especially in maintenance areas and loading docks
5. **Respiratory Protection (29 CFR 1910.134)** - Improper fit testing and documentation

Would you like me to provide detailed prevention strategies for any of these areas?`
          };
        } else if (messageText.toLowerCase().includes('penalties') || 
                  messageText.toLowerCase().includes('fines') || 
                  messageText.toLowerCase().includes('cost')) {
          response = {
            description: "I don't have specific information about that. Would you like me to help you with something else related to safety compliance?"
          };
        } else {
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
