
import { useState } from 'react';
import { toast } from 'sonner';
import { Message } from '../types';
import { useImageProcessor } from './image-processing/useImageProcessor';
import { useMessageProcessor } from './message-processing/useMessageProcessor';
import { supabase } from '@/lib/supabase';

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

  // Hooks
  const { processImageForSafetyViolations } = useImageProcessor();
  const { processUserMessage } = useMessageProcessor();

  /**
   * Handle sending a message, with optional image attachment
   */
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
      const updatedMessages = [...messages, userMessage];
      
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
  
  /**
   * Extract the main safety topic from a user query
   */
  const extractTopicFromQuery = (query: string): string => {
    const topicMap: {[key: string]: string} = {
      'chemical': 'chemical safety',
      'fall': 'fall protection',
      'height': 'fall protection',
      'ppe': 'personal protective equipment',
      'protective': 'personal protective equipment',
      'train': 'safety training',
      'inspect': 'safety inspection',
      'hazard': 'hazard assessment',
      'assessment': 'risk assessment',
      'confined': 'confined space',
      'lockout': 'lockout/tagout',
      'tagout': 'lockout/tagout',
      'jsa': 'job safety analysis',
      'welding': 'welding safety',
      'forklift': 'powered industrial trucks'
    };
    
    const queryLower = query.toLowerCase();
    
    for (const [key, topic] of Object.entries(topicMap)) {
      if (queryLower.includes(key)) {
        return topic;
      }
    }
    
    return 'workplace safety';
  };
  
  /**
   * Generate an improved fallback response that's helpful even when API fails
   */
  const generateImprovedFallback = (topic: string, query: string): string => {
    // Acknowledgment
    const acknowledgment = `You've asked about ${topic}, which is an important safety consideration. `;
    
    // Mini-response based on topic
    let miniResponse = '';
    
    if (topic === 'chemical safety') {
      miniResponse = `**Chemical Safety Essentials:**

1. **Documentation Requirements:**
   - Maintain safety data sheets (SDS) for all chemicals
   - Create a chemical inventory with locations and quantities
   - Develop written hazard communication program

2. **Storage Best Practices:**
   - Separate incompatible chemicals
   - Ensure proper ventilation
   - Use appropriate containment for spills
   - Label all containers clearly

3. **Training Components:**
   - Hazard identification and understanding labels
   - Proper handling procedures and PPE requirements
   - Emergency response for spills or exposure`;
    } 
    else if (topic === 'hazard assessment' || topic === 'risk assessment' || query.includes('form')) {
      miniResponse = `**Hazard Assessment Form Structure:**

1. **Basic Information Section:**
   - Assessment date and location
   - Team members conducting assessment
   - Process/equipment being evaluated

2. **Hazard Identification:**
   - Task breakdown into steps
   - Potential hazards for each step
   - Risk rating (severity × probability)
   - Existing controls in place

3. **Action Planning:**
   - Additional controls needed
   - Responsible persons
   - Implementation timeline
   - Follow-up verification`;
    }
    else if (topic.includes('confined space') || topic.includes('checklist')) {
      miniResponse = `**Safety Checklist Framework:**

1. **Pre-Task Verification:**
   - Required permits and authorizations
   - Equipment inspection status
   - Environmental conditions check
   - Communication system testing

2. **Personnel Readiness:**
   - Required training verification
   - PPE inspection and availability
   - Role assignments and responsibilities
   - Emergency response preparedness

3. **Post-Completion Actions:**
   - Area restoration and cleanup
   - Equipment return and maintenance
   - Documentation completion
   - Lessons learned discussion`;
    }
    else if (topic.includes('ppe') || topic.includes('welding')) {
      miniResponse = `**PPE Selection Guide:**

1. **Hazard Evaluation:**
   - Identify potential exposures
   - Assess severity and likelihood
   - Document assessment findings
   - Review applicable regulations

2. **Equipment Selection:**
   - Match PPE to specific hazards
   - Consider comfort and usability
   - Ensure proper sizing and fit
   - Verify certification standards

3. **Implementation Program:**
   - User training requirements
   - Inspection procedures
   - Maintenance schedules
   - Replacement criteria`;
    }
    else {
      miniResponse = `**Safety Program Framework:**

1. **Documentation Components:**
   - Written safety policies and procedures
   - Hazard identification process
   - Training records and verification
   - Incident reporting system

2. **Implementation Elements:**
   - Clear roles and responsibilities
   - Regular safety meetings
   - Inspection and audit schedule
   - Continuous improvement process

3. **Performance Measurement:**
   - Leading and lagging indicators
   - Regular program evaluation
   - Employee engagement metrics
   - Corrective action tracking`;
    }
    
    // Template offer and branching options
    const templateOffer = "\n\nWould you like a downloadable template for this that you can customize for your workplace?";
    const branchingOption = `\n\nCan I help you with a specific aspect of ${topic}, such as training requirements, documentation, or implementation strategies?`;
    
    return acknowledgment + miniResponse + templateOffer + branchingOption;
  };
  
  /**
   * Generate topic-specific follow-up suggestions
   */
  const generateTopicSpecificSuggestions = (topic: string): string[] => {
    const suggestions: Record<string, string[]> = {
      'chemical safety': [
        "What PPE is required for chemical handling?",
        "How should we store flammable chemicals?",
        "What training is required for GHS compliance?"
      ],
      'fall protection': [
        "What height requires fall protection?",
        "How often should we inspect fall protection equipment?",
        "What documentation is needed for fall protection training?"
      ],
      'personal protective equipment': [
        "How do I document PPE hazard assessments?",
        "What training is required for PPE users?",
        "How often should different types of PPE be replaced?"
      ],
      'safety training': [
        "How should I document safety training?",
        "What topics should be included in new hire safety orientation?",
        "How often should refresher training be conducted?"
      ],
      'hazard assessment': [
        "Can you provide a hazard assessment template?",
        "How often should hazard assessments be updated?",
        "Who should be involved in conducting hazard assessments?"
      ],
      'job safety analysis': [
        "What are the key components of a JSA?",
        "How detailed should each step be in a JSA?",
        "How do I prioritize which jobs need a JSA?"
      ],
      'workplace safety': [
        "What are the essential elements of a safety program?",
        "How do I develop a safety training matrix?",
        "What safety documentation is required by OSHA?"
      ]
    };
    
    // Return topic-specific suggestions or default ones
    return suggestions[topic] || [
      "What specific safety topic are you most interested in?",
      "Would you like information about a particular OSHA regulation?",
      "Do you need help with safety program documentation?"
    ];
  };

  return {
    messages,
    isLoading,
    handleSendMessage,
    followUpSuggestions
  };
};
