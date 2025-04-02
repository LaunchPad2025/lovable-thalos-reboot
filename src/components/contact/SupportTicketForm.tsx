
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';

// Import refactored components
import FormHeader from './support-ticket/FormHeader';
import PersonalInfoFields from './support-ticket/PersonalInfoFields';
import SupportInfoFields from './support-ticket/SupportInfoFields';
import UrgencyRadioGroup from './support-ticket/UrgencyRadioGroup';
import MessageFields from './support-ticket/MessageFields';
import SupportMessage from './support-ticket/SupportMessage';
import SubmitButton from './support-ticket/SubmitButton';

const SupportTicketForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    supportTier: '',
    issueType: '',
    urgency: 'medium',
    subject: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUrgencyChange = (value: string) => {
    handleSelectChange('urgency', value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      console.log("Support ticket submitted with data:", formData);
      
      // Call the Supabase Edge Function to send the email
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          firstName: formData.name.split(' ')[0] || formData.name,
          lastName: formData.name.split(' ').slice(1).join(' ') || '',
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          subject: `Support Ticket: ${formData.subject} (${formData.urgency} priority)`,
          message: `
Support Tier: ${formData.supportTier}
Issue Type: ${formData.issueType}
Urgency: ${formData.urgency}

${formData.description}
          `
        },
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      toast({
        title: "Support ticket submitted",
        description: "Thank you for contacting us. We'll get back to you as soon as possible.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        supportTier: '',
        issueType: '',
        urgency: 'medium',
        subject: '',
        description: ''
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error submitting ticket",
        description: "There was a problem sending your support ticket. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <FormHeader />
      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <PersonalInfoFields 
            formData={formData} 
            handleInputChange={handleInputChange} 
          />
          
          <SupportInfoFields 
            formData={formData} 
            handleSelectChange={handleSelectChange} 
          />
          
          <UrgencyRadioGroup 
            value={formData.urgency} 
            onChange={handleUrgencyChange} 
          />
          
          <MessageFields 
            formData={formData} 
            handleInputChange={handleInputChange} 
          />
          
          <SupportMessage />
          
          <SubmitButton isSubmitting={isSubmitting} />
        </form>
      </CardContent>
    </Card>
  );
};

export default SupportTicketForm;
