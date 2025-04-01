
import { useState } from 'react';
import { toast } from 'sonner';
import { Message } from '../types';

export const useChatMessages = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm Paulie, your safety assistant. How can I help you with workplace safety today?",
      role: 'assistant',
      timestamp: new Date(Date.now() - 1000 * 60 * 37).toISOString(), // 37 minutes ago
    },
    {
      id: '2',
      content: "Además de usar el EPP adecuado, es importante seguir las prácticas de seguridad, como trabajar en áreas bien ventiladas, tener acceso a duchas de emergencia y estaciones de lavado de ojos, y recibir capacitación adecuada sobre el manejo seguro de ácidos.",
      role: 'assistant',
      timestamp: new Date(Date.now() - 1000 * 60 * 37).toISOString(), // 37 minutes ago
    },
    {
      id: '3',
      content: "Do hardhats come in multiple sizes?",
      role: 'user',
      timestamp: new Date(Date.now() - 1000 * 60 * 37).toISOString(), // 37 minutes ago
    },
    {
      id: '4',
      content: "Yes, hardhats do come in multiple sizes to ensure a proper fit for different head sizes, which is crucial for safety in the construction industry. Most hardhats have adjustable suspension systems that allow the wearer to customize the fit.\n\nIt's important to select the right size and adjust the suspension correctly to ensure maximum protection. A hardhat that is too loose or too tight can compromise safety by not staying in place or causing discomfort that might lead to improper wear.\n\nAlways follow the manufacturer's instructions for fitting and adjusting the hardhat to comply with safety standards and regulations.",
      role: 'assistant',
      timestamp: new Date(Date.now() - 1000 * 60 * 37).toISOString(), // 37 minutes ago
    },
    {
      id: '5',
      content: "what type of clothing do I wear in a chemical facility",
      role: 'user',
      timestamp: new Date(Date.now() - 1000 * 60 * 7).toISOString(), // 7 minutes ago
    },
    {
      id: '6',
      content: "In a chemical facility, safety is paramount, and the type of clothing you wear is crucial for protection against potential hazards. Here are some general guidelines for personal protective clothing in such environments:\n\n1. **Chemical-Resistant Clothing**: Wear garments made from materials that can resist chemical penetration. This includes coveralls, aprons, and lab coats specifically designed for chemical protection.\n\n2. **Gloves**: Use chemical-resistant gloves appropriate for the chemicals you are handling. Different materials (e.g., nitrile, neoprene) offer protection against different types of chemicals.\n\n3. **Eye and Face Protection**: Safety goggles or face shields should be worn to protect against splashes and fumes.\n\n4. **Footwear**: Chemical-resistant boots are recommended to protect your feet from spills and splashes.\n\n5. **Respiratory Protection**: Depending on the chemicals and the level of exposure, respirators or masks may be necessary to protect against inhalation of harmful substances.\n\n6. **Hard Hats**: If there is a risk of head injury from falling objects or bumping into equipment, a hard hat should be worn.\n\n7. **High-Visibility Clothing**: In areas where visibility is important for safety, high-visibility vests or clothing may be required.\n\nWhen working in a chemical facility, always follow the specific safety protocols and guidelines provided by your employer or the facility's safety officer. They will provide information tailored to the specific chemicals and hazards present in your work environment.",
      role: 'assistant',
      timestamp: new Date(Date.now() - 1000 * 60 * 7).toISOString(), // 7 minutes ago
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
      }, 1500);
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
    return "Hard hats are required in all construction areas. OSHA regulation 29 CFR 1926.100 mandates that employers must provide head protection equipment when workers are in areas where there is a possible danger of head injury.\n\nMake sure your hard hat fits properly and is adjusted correctly. A properly fitted hard hat should sit about 1-1.25 inches above your eyebrows and should not be too tight or too loose.";
  } else if (message.includes('fall') || message.includes('height') || message.includes('edge')) {
    return "Fall protection is required when working at heights of 6 feet or more in construction (OSHA 29 CFR 1926.501). This includes guardrails, safety nets, or personal fall arrest systems.\n\nWhen using a personal fall arrest system, make sure it's properly inspected before each use and that you're using it correctly. The anchor point should be capable of supporting at least 5,000 pounds per attached worker.";
  } else if (message.includes('ppe') || message.includes('equipment')) {
    return "Personal Protective Equipment (PPE) requirements vary by job site and task. Common PPE includes:\n\n1. Hard hats to protect against head injuries\n2. Safety glasses or goggles for eye protection\n3. Hearing protection in noisy environments\n4. Respiratory protection when exposed to harmful dusts, fumes, or gases\n5. Gloves appropriate for the specific hazards\n6. High-visibility clothing in areas with vehicle traffic\n7. Steel-toed boots for foot protection\n\nAlways inspect your PPE before use and replace any damaged equipment immediately.";
  } else if (message.includes('chemical') || message.includes('hazardous')) {
    return "When working with chemicals, always:\n\n1. Read and understand the Safety Data Sheet (SDS) before handling any chemical\n2. Use appropriate PPE including chemical-resistant gloves, eye protection, and clothing\n3. Work in well-ventilated areas to prevent inhalation of fumes\n4. Know the location of emergency equipment such as eyewash stations and safety showers\n5. Label all containers properly\n6. Store chemicals according to compatibility guidelines\n7. Have spill containment materials readily available\n\nDifferent chemicals require different handling procedures, so always follow your workplace's specific protocols.";
  } else if (message.includes('violation') || message.includes('report')) {
    return "To report a safety violation, document the issue with photos, note the location and time, and report it to your supervisor or safety officer. You can also submit violations through our system's 'Report Violation' feature.\n\nIf you feel the violation presents an immediate danger, you have the right to refuse unsafe work while following proper reporting procedures. For serious violations that aren't being addressed internally, you can file a confidential complaint with OSHA by calling 1-800-321-OSHA or visiting their website.";
  } else {
    return "Thank you for your question about workplace safety. To provide you with the most accurate information, I'd need some additional details about your specific situation or concern. Could you please provide more context or ask a more specific question about safety procedures, regulations, or best practices?";
  }
};
