
import React, { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import PageTitle from '@/components/ui/PageTitle';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  MapPin, 
  Mail, 
  Clock, 
  MessageSquare, 
  HelpCircle, 
  ShoppingCart, 
  Users
} from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    reason: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, reason: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real implementation, you would send this data to your backend
      // For now, we'll simulate a successful form submission
      console.log("Form submitted with data:", formData);
      console.log("Will be sent to: contact@steeltoetech.io and annie.eser@steeltoetech.io");
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent successfully",
        description: "Thank you for contacting us. We'll get back to you soon!",
      });
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        reason: '',
        message: ''
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error sending message",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer>
      <div className="max-w-6xl mx-auto">
        <PageTitle 
          title="Contact Us" 
          subtitle="Get in touch with our team for sales, support, or general inquiries"
          className="mb-12"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <ContactCard 
            icon={<MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
            title="Sales Inquiries"
            description="Interested in Thalos for your organization? Our sales team is ready to help."
            contactInfo={
              <>
                <ContactItem icon={<Mail className="h-5 w-5" />} text="contact@steeltoetech.io" />
              </>
            }
            buttonText="Schedule a Demo"
            buttonLink="https://cal.com/thalos-sales/30min"
          />
          
          <ContactCard 
            icon={<HelpCircle className="h-6 w-6 text-green-600 dark:text-green-400" />}
            title="Customer Support"
            description="Need assistance with Thalos? Our support team is here to help you."
            contactInfo={
              <>
                <ContactItem icon={<Mail className="h-5 w-5" />} text="contact@steeltoetech.io" />
                <ContactItem icon={<Clock className="h-5 w-5" />} text="Mon-Fri, 7AM-7PM ET" />
              </>
            }
            buttonText="Submit Support Ticket"
            buttonLink="#"
          />
          
          <ContactCard 
            icon={<Users className="h-6 w-6 text-amber-600 dark:text-amber-400" />}
            title="Partnerships"
            description="Interested in partnering with Steel Toe Technologies? Let's explore possibilities."
            contactInfo={
              <>
                <ContactItem icon={<Mail className="h-5 w-5" />} text="contact@steeltoetech.io" />
              </>
            }
            buttonText="Partner Inquiry"
            buttonLink="#"
          />
        </div>
        
        {/* Contact Form & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First name</Label>
                      <Input 
                        id="firstName" 
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input 
                        id="lastName" 
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone (optional)</Label>
                      <Input 
                        id="phone" 
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input 
                      id="company" 
                      placeholder="Acme Corporation"
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason for contacting</Label>
                    <Select value={formData.reason} onValueChange={handleSelectChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sales">Sales Inquiry</SelectItem>
                        <SelectItem value="support">Customer Support</SelectItem>
                        <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                        <SelectItem value="careers">Careers</SelectItem>
                        <SelectItem value="media">Media Inquiry</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Please provide details about your inquiry..."
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>
                  Other ways to reach us
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Headquarters</h3>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                    <address className="text-muted-foreground not-italic">
                      Washington, DC<br />
                      United States
                    </address>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">General Inquiries</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-muted-foreground mr-3" />
                      <span className="text-muted-foreground">contact@steeltoetech.io</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Business Hours</h3>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-muted-foreground mr-3" />
                    <span className="text-muted-foreground">Monday-Friday: 9AM-6PM ET</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <h3 className="font-medium mb-2">Connect With Us</h3>
                  {/* Social icons hidden for now 
                  <div className="flex space-x-4">
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                      </svg>
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                      </svg>
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                      </svg>
                    </a>
                  </div>
                  */}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FaqCard 
              question="How quickly will I receive a response?"
              answer="We aim to respond to all inquiries within 24 business hours. For urgent support requests, customers on our Professional and Enterprise plans receive priority response times."
            />
            
            <FaqCard 
              question="Do you offer live chat support?"
              answer="Yes, live chat support is available for customers on our Professional and Enterprise plans during business hours (Monday-Friday, 9AM-6PM ET)."
            />
            
            <FaqCard 
              question="How do I request a product demo?"
              answer="You can request a demo by clicking the 'Schedule a Demo' button in the Sales Inquiries section above, or by emailing contact@steeltoetech.io."
            />
            
            <FaqCard 
              question="Where can I find documentation and self-help resources?"
              answer="Comprehensive documentation, guides, and tutorials are available in our Help Center. Registered users can access additional resources through their dashboard."
            />
          </div>
        </div>
        
        {/* Map Section */}
        <div className="mb-16">
          <div className="bg-card border border-border rounded-lg overflow-hidden h-96">
            <div className="h-full">
              {/* Replace with actual map implementation */}
              <div className="h-full flex items-center justify-center bg-muted">
                <p className="text-muted-foreground">Map showing our Washington, DC location</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Newsletter Signup */}
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest updates, industry news, and safety compliance tips.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <Input placeholder="Enter your email" className="flex-grow" />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  contactInfo: React.ReactNode;
  buttonText: string;
  buttonLink: string;
}

const ContactCard = ({ icon, title, description, contactInfo, buttonText, buttonLink }: ContactCardProps) => (
  <Card className="h-full flex flex-col">
    <CardHeader>
      <div className="mb-4 p-2 w-fit rounded-full bg-muted">
        {icon}
      </div>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4 flex-grow">
      {contactInfo}
    </CardContent>
    <div className="p-6 pt-0 mt-auto">
      <Button 
        className="w-full"
        onClick={() => window.location.href = buttonLink}
      >
        {buttonText}
      </Button>
    </div>
  </Card>
);

interface ContactItemProps {
  icon: React.ReactNode;
  text: string;
}

const ContactItem = ({ icon, text }: ContactItemProps) => (
  <div className="flex items-center text-muted-foreground">
    <span className="mr-3">{icon}</span>
    <span>{text}</span>
  </div>
);

interface FaqCardProps {
  question: string;
  answer: string;
}

const FaqCard = ({ question, answer }: FaqCardProps) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg">{question}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">{answer}</p>
    </CardContent>
  </Card>
);

export default Contact;
