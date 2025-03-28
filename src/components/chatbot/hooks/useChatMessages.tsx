
import { useState } from 'react';
import { toast } from 'sonner';
import { Message } from '../types';
import { safetyRegulationResponses } from '../data/safetyRegulationData';

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
      // Simulate AI processing time
      setTimeout(() => {
        // Get AI response from our safety regulations database
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: generateAIResponse(content),
          role: 'assistant',
          timestamp: new Date().toISOString(),
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 1200);
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

// Enhanced AI response logic that simulates connection to our regulatory database
const generateAIResponse = (message: string): string => {
  const query = message.toLowerCase();
  
  // First, check for exact matches in our regulatory database
  for (const regulation of safetyRegulationResponses) {
    for (const keyword of regulation.keywords) {
      if (query.includes(keyword)) {
        return regulation.response;
      }
    }
  }
  
  // Fallback responses for common safety topics
  if (query.includes('ppe') || query.includes('equipment') || query.includes('protection')) {
    return "Personal Protective Equipment (PPE) requirements vary by job site and task. Common PPE includes hard hats (ANSI Z89.1), safety glasses (ANSI Z87.1), high-visibility clothing (ANSI/ISEA 107), gloves (ANSI/ISEA 105), and steel-toed boots (ASTM F2413). Based on OSHA regulation 29 CFR 1910.132, employers must assess the workplace to determine if hazards are present that require PPE.";
  } else if (query.includes('height') || query.includes('fall') || query.includes('elevation')) {
    return "According to OSHA standard 29 CFR 1926.501, fall protection is required at elevations of 6 feet or more in the construction industry. Employers must provide guardrails, safety nets, or personal fall arrest systems when workers are exposed to fall hazards. Each personal fall arrest system must be inspected prior to use (29 CFR 1926.502). Workers must also be trained on fall hazards and the proper use of fall protection systems according to 29 CFR 1926.503.";
  } else if (query.includes('chemical') || query.includes('hazardous') || query.includes('storage')) {
    return "Chemical storage rooms must be labeled according to OSHA's Hazard Communication Standard (29 CFR 1910.1200). This includes hazard warning signs, GHS pictograms, and proper container labeling. Safety Data Sheets (SDS) must be readily available. For flammable liquids, OSHA standard 29 CFR 1910.106 requires approved storage cabinets and rooms with specific construction, ventilation, and electrical requirements.";
  } else if (query.includes('waste') || query.includes('disposal') || query.includes('epa')) {
    return "The EPA's Resource Conservation and Recovery Act (RCRA) regulates hazardous waste management. Under 40 CFR 262, waste generators must identify, properly store, and arrange for proper disposal of hazardous waste. This includes using appropriate containers, labeling with accumulation start dates, conducting weekly inspections, and maintaining separation of incompatible wastes. Employee training is required under 40 CFR 262.17 for personnel handling hazardous waste.";
  } else if (query.includes('training') || query.includes('certification')) {
    return "OSHA requires employers to provide safety training to employees exposed to workplace hazards (29 CFR 1910.132 for general industry, 29 CFR 1926.21 for construction). Training must cover hazard recognition, equipment-specific procedures, emergency protocols, and be provided in a language workers understand. Records of all safety training must be maintained, including dates, topics covered, and employee verification of understanding.";
  } else if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
    return "Hello! I'm Paulie, your AI safety assistant trained on OSHA regulations, EPA guidelines, and industry-specific workplace safety standards. How can I help you today with workplace safety?";
  }
  
  // Default response when no specific safety regulation match is found
  return "I don't have specific information on that topic in my safety regulations database. For the most accurate guidance, I recommend consulting your company's safety officer or referring to the official OSHA standards at osha.gov. Is there something else I can help with regarding workplace safety?";
};
