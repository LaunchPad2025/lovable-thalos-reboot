
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
      // Processing image if provided
      if (imageFile) {
        console.log("Processing image for safety analysis");
        await processImageForSafetyViolations(imageFile, userMessage.id);
      }
      
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

  // Process image for safety violations
  const processImageForSafetyViolations = async (imageFile: File, messageId: string) => {
    try {
      // Create a form data object to upload the image
      const formData = new FormData();
      formData.append('image', imageFile);
      
      // Convert image to base64 for analysis
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      
      reader.onload = () => {
        const imageBase64 = reader.result as string;
        
        // Simulate AI analysis of the image
        setTimeout(() => {
          // Generate dummy violation detections for demo purposes
          const detections = generateSafetyViolationDetections(imageBase64);
          
          if (detections.length > 0) {
            const violationsText = formatViolationsResponse(detections);
            
            // Add assistant response for violations
            const assistantMessage: Message = {
              id: (Date.now() + 2).toString(),
              content: violationsText,
              role: 'assistant',
              timestamp: new Date().toISOString(),
            };
            
            setMessages(prev => [...prev, assistantMessage]);
          } else {
            // No violations detected
            const assistantMessage: Message = {
              id: (Date.now() + 2).toString(),
              content: "I've analyzed the image and didn't detect any obvious safety violations. However, please note that this is an automated check and may not catch all safety issues. Always follow your workplace safety protocols.",
              role: 'assistant',
              timestamp: new Date().toISOString(),
            };
            
            setMessages(prev => [...prev, assistantMessage]);
          }
        }, 2000);
      };
    } catch (error) {
      console.error('Error analyzing image:', error);
      toast.error('Failed to analyze image for safety violations');
      
      // Add failure message
      const assistantMessage: Message = {
        id: (Date.now() + 2).toString(),
        content: "I encountered an error while analyzing the image. Please try uploading it again or describe the situation in text.",
        role: 'assistant',
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    }
  };

  // Generate mock safety violation detections for demo
  const generateSafetyViolationDetections = (imageBase64: string) => {
    // In a real implementation, this would call a computer vision API
    // For demo purposes, we'll return mock detections 80% of the time
    const shouldDetectViolations = Math.random() > 0.2;
    
    if (!shouldDetectViolations) return [];
    
    // List of possible violations for demo
    const possibleViolations = [
      {
        label: "missing_hardhat",
        confidence: 0.89,
        regulation: "29 CFR 1926.100(a)"
      },
      {
        label: "improper_ladder_usage",
        confidence: 0.76,
        regulation: "29 CFR 1926.1053(b)"
      },
      {
        label: "trip_hazard",
        confidence: 0.82,
        regulation: "29 CFR 1926.25"
      },
      {
        label: "missing_guardrail",
        confidence: 0.91,
        regulation: "29 CFR 1926.502"
      },
      {
        label: "missing_safety_vest",
        confidence: 0.85,
        regulation: "29 CFR 1926.201"
      }
    ];
    
    // Randomly select 1-3 violations
    const numViolations = Math.floor(Math.random() * 3) + 1;
    const shuffled = [...possibleViolations].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numViolations);
  };

  // Format violations into a response message
  const formatViolationsResponse = (violations: any[]) => {
    let response = "**Safety Analysis Results**\n\nI've analyzed the image and detected the following potential safety issues:\n\n";
    
    violations.forEach((violation, index) => {
      const label = violation.label.replace(/_/g, ' ');
      const confidence = Math.floor(violation.confidence * 100);
      response += `${index + 1}. **${label}** (${confidence}% confidence)\n`;
      response += `   *Regulation:* ${violation.regulation}\n`;
      response += `   *Remediation:* ${getRemediationForViolation(violation.label)}\n\n`;
    });
    
    response += "Please take appropriate action to address these safety concerns. Remember, this is an automated analysis and should be verified by a qualified safety professional.";
    
    return response;
  };

  // Get remediation steps for a violation
  const getRemediationForViolation = (violationLabel: string) => {
    switch(violationLabel.toLowerCase()) {
      case 'missing_hardhat':
        return "Ensure all personnel wear properly fitted hard hats in designated areas. Post visible signage about mandatory hard hat requirements.";
      case 'improper_ladder_usage':
        return "Secure ladders on stable ground. Maintain three-point contact when climbing. Ensure proper angle placement (1:4 ratio).";
      case 'trip_hazard':
        return "Clear walkways of debris. Implement regular cleaning schedules. Create designated storage areas for materials and tools.";
      case 'missing_guardrail':
        return "Install OSHA-compliant guardrails along all open sides and edges. Include top rail, mid rail, and toe board where required.";
      case 'missing_safety_vest':
        return "Ensure high-visibility vests are worn in active work zones. Keep a supply of vests available for visitors and temporary workers.";
      default:
        return "Address the identified safety issue according to workplace safety protocols and relevant OSHA regulations.";
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
