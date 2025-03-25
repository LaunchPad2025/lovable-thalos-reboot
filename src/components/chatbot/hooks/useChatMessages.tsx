
import { useState } from 'react';
import { toast } from 'sonner';
import { Message } from '../types';

export const useChatMessages = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm Paulie, your safety assistant. How can I help you with workplace safety today?",
      role: 'assistant',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string, imageFile?: File | null) => {
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
    
    try {
      // Simulate AI response
      setTimeout(() => {
        // Add assistant response
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: getAIResponse(content),
          role: 'assistant',
          timestamp: new Date().toISOString(),
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    handleSendMessage
  };
};

// Simple AI response logic - moved from the component to the hook
const getAIResponse = (message: string): string => {
  message = message.toLowerCase();
  
  if (message.includes('hello') || message.includes('hi')) {
    return "Hello! How can I help you with workplace safety today?";
  } else if (message.includes('hardhat') || message.includes('helmet')) {
    return "Hard hats are required in all construction areas. OSHA regulation 29 CFR 1926.100 mandates that employers must provide head protection equipment when workers are in areas where there is a possible danger of head injury.";
  } else if (message.includes('fall') || message.includes('height') || message.includes('edge')) {
    return "Fall protection is required when working at heights of 6 feet or more in construction (OSHA 29 CFR 1926.501). This includes guardrails, safety nets, or personal fall arrest systems.";
  } else if (message.includes('ppe') || message.includes('equipment')) {
    return "Personal Protective Equipment (PPE) requirements vary by job site. Common PPE includes hard hats, safety glasses, high-visibility clothing, gloves, and steel-toed boots. All PPE should meet ANSI standards.";
  } else if (message.includes('violation') || message.includes('report')) {
    return "To report a safety violation, document the issue with photos, note the location and time, and report it to your supervisor or safety officer. You can also submit violations through our system's 'Report Violation' feature.";
  } else if (message.includes('no violations') || message.includes('safe site') || message.includes('compliance')) {
    return "Even when no violations are detected, it's important to maintain vigilance. Continue regular inspections, ensure all workers are properly trained, and keep safety documentation up to date.";
  } else {
    return "I'm here to help with safety questions and concerns. Could you provide more details about your safety inquiry?";
  }
};
