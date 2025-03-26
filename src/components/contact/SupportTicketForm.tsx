
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

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
      <CardHeader>
        <CardTitle>Submit a Support Ticket</CardTitle>
        <CardDescription>
          Fill out the form below to get assistance from our support team.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input 
                id="name" 
                placeholder="John Doe"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone (optional)</Label>
              <Input 
                id="phone" 
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input 
                id="company" 
                placeholder="Acme Corporation"
                value={formData.company}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="supportTier">Support Tier</Label>
              <Select 
                value={formData.supportTier} 
                onValueChange={(value) => handleSelectChange('supportTier', value)}
              >
                <SelectTrigger id="supportTier">
                  <SelectValue placeholder="Select your support tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                  <SelectItem value="trial">Free Trial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="issueType">Issue Type</Label>
              <Select 
                value={formData.issueType} 
                onValueChange={(value) => handleSelectChange('issueType', value)}
              >
                <SelectTrigger id="issueType">
                  <SelectValue placeholder="Select issue type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Technical Issue</SelectItem>
                  <SelectItem value="billing">Billing Question</SelectItem>
                  <SelectItem value="account">Account Management</SelectItem>
                  <SelectItem value="feature">Feature Request</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-3">
            <Label>Urgency Level</Label>
            <RadioGroup 
              defaultValue="medium" 
              value={formData.urgency}
              onValueChange={(value) => handleSelectChange('urgency', value)}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="urgency-low" />
                <Label htmlFor="urgency-low" className="font-normal">Low - Not blocking work</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="urgency-medium" />
                <Label htmlFor="urgency-medium" className="font-normal">Medium - Partially blocking work</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="urgency-high" />
                <Label htmlFor="urgency-high" className="font-normal">High - Blocking critical work</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="critical" id="urgency-critical" />
                <Label htmlFor="urgency-critical" className="font-normal">Critical - System outage or security issue</Label>
              </div>
            </RadioGroup>
          </div>
          
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
          
          <div className="flex items-center text-sm text-muted-foreground p-3 bg-muted rounded-md">
            <AlertCircle className="h-4 w-4 mr-2 text-blue-500" />
            <p>Our support team will respond as soon as possible</p>
          </div>
          
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Support Ticket"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SupportTicketForm;
