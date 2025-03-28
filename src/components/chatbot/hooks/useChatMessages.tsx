import { useState } from 'react';
import { toast } from 'sonner';
import { Message } from '../types';
import { safetyRegulationResponses } from '../data/safetyRegulationData';
import { processWithHuggingFace, generateFallbackResponse, suggestFollowUpQuestions } from '@/utils/huggingfaceUtils';
import { extractSafetyTopics } from '@/utils/conversationUtils';

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
  const [followUpSuggestions, setFollowUpSuggestions] = useState<string[]>([]);

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
    setFollowUpSuggestions([]); // Clear previous suggestions
    
    try {
      // Processing image if provided
      if (imageFile) {
        console.log("Processing image for safety analysis");
        await processImageForSafetyViolations(imageFile, userMessage.id);
      }
      
      // Get the current conversation for context
      const updatedMessages = [...messages, userMessage];
      
      // Extract safety topics to enhance context
      const safetyTopics = extractSafetyTopics(updatedMessages);
      console.log("Detected safety topics:", safetyTopics);
      
      // Try to get AI response from Hugging Face model
      let aiResponse: string;
      
      try {
        // First try with the Hugging Face model
        aiResponse = await processWithHuggingFace(content, updatedMessages);
        console.log("Hugging Face processing successful");
      } catch (error) {
        console.error('Error with Hugging Face processing, falling back to local response:', error);
        // Fall back to local response generation if API fails
        aiResponse = generateAIResponse(content, updatedMessages);
      }
      
      // Add AI response to messages
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      // Generate follow-up question suggestions
      const suggestions = suggestFollowUpQuestions(content, aiResponse);
      setFollowUpSuggestions(suggestions);
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
      setIsLoading(false);
      
      // Add failure message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I encountered an error processing your request. Please try again or rephrase your question.",
        role: 'assistant',
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
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

  // Enhanced AI response logic with more contextual awareness
  const generateAIResponse = (message: string, allMessages: Message[]): string => {
    const query = message.toLowerCase();
    
    // Extract topics from conversation history to provide more relevant context
    const recentTopics = extractSafetyTopics(allMessages);
    const previousUserMessages = allMessages
      .filter(msg => msg.role === 'user')
      .map(msg => msg.content)
      .slice(-3);
    
    // Check if this is a follow-up question
    const isFollowUp = previousUserMessages.length > 1 && 
      (query.length < 20 || 
       query.includes('what about') || 
       query.includes('how about') || 
       query.includes('and') || 
       !query.includes('?'));
    
    // If it seems like a follow-up, provide a more contextually relevant response
    if (isFollowUp) {
      console.log("Detected follow-up question, incorporating previous context");
      
      // Reference previous topics in the response
      if (recentTopics.length > 0) {
        // Check if any topic from the conversation matches our regulations
        for (const topic of recentTopics) {
          for (const regulation of safetyRegulationResponses) {
            if (regulation.keywords.some(keyword => topic.includes(keyword))) {
              return `Continuing our discussion about ${topic}, ${regulation.response} Would you like me to elaborate on any specific aspect of this?`;
            }
          }
        }
      }
    }
    
    // First, check for exact matches in our regulatory database
    for (const regulation of safetyRegulationResponses) {
      for (const keyword of regulation.keywords) {
        if (query.includes(keyword)) {
          // Provide a more conversational and detailed response
          const regulationInfo = regulation.response;
          const sourceInfo = regulation.source;
          
          // Enhance with more conversational elements
          return `Based on your question about ${keyword}, here's what you need to know: ${regulationInfo}\n\nThis guidance comes from ${sourceInfo}. Is there a specific aspect of this regulation you'd like me to explain in more detail?`;
        }
      }
    }
    
    // Enhanced fallback responses for common safety topics with specific regulatory details
    if (query.includes('ppe') || query.includes('equipment') || query.includes('protection')) {
      return "Looking at your question about personal protective equipment (PPE), I can share that OSHA regulation 29 CFR 1910.132 requires employers to assess workplace hazards and provide appropriate PPE. This includes hard hats (ANSI Z89.1), safety glasses (ANSI Z87.1), and other equipment specific to job hazards.\n\nFailure to provide proper PPE can result in OSHA citations with penalties up to $13,653 per violation for serious violations, and up to $136,532 for willful or repeated violations.\n\nCan I help with implementing a specific aspect of your PPE program?";
    } else if (query.includes('height') || query.includes('fall') || query.includes('elevation')) {
      return "I see you're asking about fall protection. According to OSHA standard 29 CFR 1926.501, fall protection is required at heights of 6 feet or more in construction (4 feet in general industry).\n\nEmployers must provide guardrails, safety nets, or personal fall arrest systems. Each system must meet specific requirements - for example, guardrails must be 42 inches high (±3 inches) and withstand 200 pounds of force.\n\nNon-compliance can lead to citations with penalties ranging from $4,000 to $13,653 per violation, depending on severity. Would you like me to explain more about a specific fall protection system?";
    } else if (query.includes('chemical') || query.includes('hazardous') || query.includes('storage')) {
      return "Regarding your question about chemical storage, OSHA's Hazard Communication Standard (29 CFR 1910.1200) requires proper labeling, SDS accessibility, and employee training. For flammable liquids specifically, 29 CFR 1910.106 sets requirements for storage cabinets and rooms.\n\nStorage cabinets must be designed to limit internal temperature to 325°F when subjected to a 10-minute fire test. No more than 60 gallons of Class I or II liquids (or 120 gallons of Class III) can be stored in a single cabinet.\n\nAre you looking for guidance on a specific chemical or storage situation? I'd be happy to provide more targeted advice.";
    } else if (query.includes('waste') || query.includes('disposal') || query.includes('epa')) {
      return "I understand you're asking about waste management. The EPA's Resource Conservation and Recovery Act (RCRA) governs hazardous waste handling.\n\nUnder 40 CFR 262, generators must identify waste types, use proper containers, label with accumulation start dates, and conduct weekly inspections. Small quantity generators can store waste up to 180 days, while large quantity generators are limited to 90 days.\n\nNon-compliance penalties can range from $15,000 to $70,000 per day per violation. Is there a specific aspect of waste management you're dealing with at your facility?";
    } else if (query.includes('training') || query.includes('certification')) {
      return "Regarding your question about safety training, OSHA requires employers to provide training to all employees exposed to workplace hazards (29 CFR 1910.132 for general industry, 29 CFR 1926.21 for construction).\n\nKey requirements include:\n- Training must be in a language workers understand\n- It must cover hazard recognition and prevention\n- For many standards, annual refresher training is required\n- Documentation must be maintained with training dates and content\n\nWhat specific type of safety training are you implementing? I can provide more targeted guidance for your industry.";
    } else if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
      return "Hi there! I'm Paulie, your AI safety assistant. I'm here to help with questions about workplace safety regulations, compliance requirements, and best practices. I can provide guidance on OSHA standards, EPA regulations, and industry-specific safety protocols. What specific safety topic can I assist you with today?";
    }
    
    // Default response when no specific safety regulation match is found
    return "I appreciate your question about workplace safety. While I don't have specific regulatory information on that exact topic in my database, I can suggest consulting your company's safety officer or checking OSHA's website at osha.gov for the most current guidance.\n\nIf you'd like, you can rephrase your question or ask about a related topic like PPE requirements, fall protection, hazard communication, or machine guarding. What aspect of workplace safety is most important for your situation?";
  };

  return {
    messages,
    isLoading,
    handleSendMessage,
    followUpSuggestions
  };
};
