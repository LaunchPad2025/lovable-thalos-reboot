
import React from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FaqSection = () => {
  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <Badge className="mb-4" variant="outline">Questions</Badge>
        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions about our products and services
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left">
              How quickly can I expect a response to my inquiry?
            </AccordionTrigger>
            <AccordionContent>
              We strive to respond to all inquiries within 24 business hours. For urgent matters, 
              please indicate so in your subject line.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left">
              Do you offer product demonstrations?
            </AccordionTrigger>
            <AccordionContent>
              Yes, we offer personalized demos of our safety management platform. 
              Please select "Sales Inquiry" as the subject of your message and mention 
              that you're interested in a demo.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left">
              How can I get technical support?
            </AccordionTrigger>
            <AccordionContent>
              Current customers can access our support portal through their dashboard or 
              submit a ticket here by selecting "Technical Support" as the subject. 
              Please include any relevant account information.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-left">
              Do you have an API for integration with other systems?
            </AccordionTrigger>
            <AccordionContent>
              Yes, we offer a comprehensive API for enterprise customers. Please contact 
              our sales team for details on API access and documentation.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-left">
              How do I report a bug or suggest a feature?
            </AccordionTrigger>
            <AccordionContent>
              We value your feedback! Please use the contact form with the subject "Technical Support" 
              for bugs or "Other" for feature suggestions. Be as detailed as possible in your description.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default FaqSection;
