
import { Message } from '../../types';
import { toast } from 'sonner';
import { formatViolationsResponse, generateSafetyViolationDetections } from '../utils/safetyViolationUtils';

export const useImageProcessor = () => {
  /**
   * Process image for safety violations
   */
  const processImageForSafetyViolations = async (imageFile: File, messageId: string, setMessages: React.Dispatch<React.SetStateAction<Message[]>>) => {
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

  return {
    processImageForSafetyViolations
  };
};
