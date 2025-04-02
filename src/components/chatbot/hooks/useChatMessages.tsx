
import { useState } from 'react';
import { Message } from '../types';

export const useChatMessages = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi there! I'm Paulie, your AI safety assistant. How can I help you today?",
      role: 'assistant',
      timestamp: new Date().toISOString(),
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date().toISOString(),
    };

    addMessage(userMessage);
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Example safety-related responses based on keywords
      let responseContent = '';
      const lowerContent = content.toLowerCase();
      
      if (lowerContent.includes('ppe') || lowerContent.includes('equipment')) {
        responseContent = "Personal Protective Equipment (PPE) is essential in hazardous environments. Depending on your industry, required PPE may include:\n\n• Hard hats for head protection\n• Safety glasses or goggles for eye protection\n• Ear protection in loud environments\n• Respirators for airborne hazards\n• Gloves for hand protection\n• Safety footwear\n• High-visibility clothing\n\nAlways follow your company's specific PPE requirements for your work area.";
      } else if (lowerContent.includes('chemical') || lowerContent.includes('hazardous')) {
        responseContent = "When working with chemicals or hazardous materials:\n\n1. Always read the Safety Data Sheet (SDS) before handling\n2. Use appropriate PPE as specified in the SDS\n3. Know the location of emergency equipment (eyewash stations, showers)\n4. Store chemicals properly according to compatibility\n5. Label all containers correctly\n6. Dispose of waste according to regulations\n\nDo you need information about a specific chemical or hazard?";
      } else if (lowerContent.includes('regulation') || lowerContent.includes('compliance') || lowerContent.includes('osha')) {
        responseContent = "Safety regulations vary by industry and location, but typically include:\n\n• OSHA standards for workplace safety\n• EPA regulations for environmental protection\n• DOT requirements for transportation of materials\n• Industry-specific standards\n\nRegular audits, documentation, and training are critical for compliance. Would you like information about regulations for a specific industry?";
      } else if (lowerContent.includes('training') || lowerContent.includes('certification')) {
        responseContent = "Safety training is crucial for compliance and accident prevention. Key training programs include:\n\n• New employee orientation\n• Hazard communication\n• Emergency response procedures\n• Equipment-specific training\n• First aid and CPR\n• Periodic refresher courses\n\nTraining should be documented and regularly updated to reflect current procedures and regulations.";
      } else if (lowerContent.includes('emergency') || lowerContent.includes('evacuation')) {
        responseContent = "Emergency preparedness is essential for workplace safety:\n\n• Develop clear emergency action plans\n• Designate and train emergency response teams\n• Conduct regular drills for different scenarios\n• Ensure evacuation routes are clearly marked and unobstructed\n• Maintain emergency equipment (fire extinguishers, first aid kits)\n• Post emergency contact information\n\nEmergency plans should be reviewed and updated regularly.";
      } else if (lowerContent.includes('hardhats') || lowerContent.includes('hard hats') || lowerContent.includes('helmet')) {
        responseContent = "Yes, hardhats do come in multiple sizes to ensure a proper fit for different head sizes, which is crucial for safety in the construction industry. Most hardhats have adjustable suspension systems that allow the wearer to customize the fit.\n\nIt's important to select the right size and adjust the suspension correctly to ensure maximum protection. A hardhat that is too loose or too tight can compromise safety by not staying in place or causing discomfort that might lead to improper wear.\n\nAlways follow the manufacturer's instructions for fitting and adjusting the hardhat to comply with safety standards and regulations.";
      } else {
        responseContent = "Thanks for your question about safety. I can provide information on workplace safety procedures, regulations, PPE requirements, hazard identification, and best practices for maintaining a safe work environment. Could you provide more details about your specific safety concern or question?";
      }

      // Add assistant response
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        role: 'assistant',
        timestamp: new Date().toISOString(),
      };

      addMessage(botResponse);
    } catch (error) {
      console.error('Failed to get response:', error);
      
      // Error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error while processing your request. Please try again.',
        role: 'assistant',
        timestamp: new Date().toISOString(),
      };

      addMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    sendMessage,
    addMessage,
  };
};
