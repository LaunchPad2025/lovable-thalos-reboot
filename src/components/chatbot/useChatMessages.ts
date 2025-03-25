
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
      
      // Handle specific questions with pre-defined responses
      let response: any;
      
      if (messageText.toLowerCase().includes('fix these violations')) {
        response = {
          description: `Based on common workplace safety violations, here are steps to fix them:

1. **Missing Guardrails**: Install OSHA-compliant guardrails (42 inches high with midrails) on all elevated platforms.

2. **Chemical Storage Issues**: Separate incompatible chemicals, ensure proper labeling with GHS-compliant labels, and maintain an updated SDS for each chemical.

3. **Blocked Fire Exits**: Clear all pathways to exits, ensure exit signs are illuminated, and conduct regular evacuation drills.

4. **Electrical Hazards**: Have a licensed electrician repair exposed wiring, implement proper lockout/tagout procedures, and conduct regular inspections.

5. **Missing PPE**: Provide appropriate personal protective equipment (hard hats, safety glasses, high-visibility vests) and enforce usage policies.

Would you like specific guidance on implementing any of these fixes?`
        };
      } else if (messageText.toLowerCase().includes('penalties') || messageText.toLowerCase().includes('fines')) {
        response = {
          description: `OSHA penalties for safety violations can be substantial:

1. **Serious Violations**: Up to $14,502 per violation
2. **Willful or Repeated Violations**: Up to $145,027 per violation
3. **Failure to Abate**: Up to $14,502 per day beyond abatement date
4. **Other-Than-Serious**: Up to $14,502 per violation

Beyond direct fines, violations can lead to:
- Increased workers' compensation premiums
- Potential civil liability
- Loss of contracts, especially government contracts
- Reputational damage
- Mandatory remediation costs

These amounts are adjusted annually for inflation. The exact penalty depends on the employer's size, history of violations, good faith efforts to comply, and severity of the hazard.`
        };
      } else if (messageText.toLowerCase().includes('osha standard')) {
        response = {
          description: `Here are relevant OSHA standards for common workplace violations:

1. **Fall Protection**: 29 CFR 1926.501 (construction) or 29 CFR 1910.28 (general industry)
   - Requires guardrails, safety nets, or personal fall arrest systems for work at heights

2. **Hazard Communication**: 29 CFR 1910.1200
   - Requires chemical labeling, Safety Data Sheets, and employee training

3. **Respiratory Protection**: 29 CFR 1910.134
   - Outlines proper respirator use, fit testing, and maintenance requirements

4. **Machine Guarding**: 29 CFR 1910.212
   - Requires guards on machinery to protect operators from hazards

5. **Electrical Safety**: 29 CFR 1910.303-305
   - Sets standards for electrical systems and work practices

6. **Lockout/Tagout**: 29 CFR 1910.147
   - Procedures to disable machinery during maintenance

Would you like specific details about any of these standards?`
        };
      } else if (messageText.toLowerCase().includes('prevent future violation')) {
        response = {
          description: `To prevent future safety violations, implement these best practices:

1. **Establish a Safety Program**:
   - Create a written safety policy with clear responsibilities
   - Conduct regular safety committee meetings
   - Implement a system for employees to report hazards

2. **Regular Inspections**:
   - Schedule routine workplace inspections
   - Document findings and corrective actions
   - Follow up to ensure issues are addressed

3. **Comprehensive Training**:
   - Train all employees on relevant OSHA standards
   - Provide job-specific safety training
   - Document all training activities

4. **Personal Protective Equipment (PPE)**:
   - Assess PPE needs for each job function
   - Provide appropriate equipment
   - Train on proper use and maintenance

5. **Documentation and Recordkeeping**:
   - Maintain OSHA-required logs (300, 300A, 301)
   - Document all safety initiatives
   - Keep training records updated

Would you like more industry-specific prevention strategies?`
        };
      } else {
        // Call the Edge Function for other queries
        try {
          const { data, error } = await supabase.functions.invoke('analyze-violation', {
            body: {
              violationText: messageText,
              industry: "All",
              modelId: "blip2"
            }
          });
          
          if (error) throw error;
          response = data;
        } catch (error) {
          console.error("Error calling model API:", error);
          
          // Fallback responses
          const fallbackResponses = [
            "Based on your question, I recommend reviewing OSHA standard 29 CFR 1910.132 regarding Personal Protective Equipment requirements.",
            "From what you've described, it sounds like there may be a compliance issue with lockout/tagout procedures outlined in OSHA standard 29 CFR 1910.147.",
            "Without more specific information, I'd suggest consulting the OSHA General Duty Clause, which requires employers to provide a workplace free from recognized hazards.",
            "This situation would typically fall under OSHA's Hazard Communication Standard (29 CFR 1910.1200), which requires proper labeling and employee training for hazardous chemicals.",
            "For this type of situation, I recommend reviewing OSHA's guidelines on ergonomics and workplace design to prevent musculoskeletal injuries."
          ];
          
          response = {
            description: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
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
