
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface MessageFieldsProps {
  formData: {
    subject: string;
    description: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const MessageFields = ({ formData, handleInputChange }: MessageFieldsProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input 
          id="subject" 
          placeholder="Brief summary of your issue"
          value={formData.subject}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          placeholder="Please provide detailed information about your issue..."
          rows={5}
          value={formData.description}
          onChange={handleInputChange}
          required
        />
      </div>
    </>
  );
};

export default MessageFields;
