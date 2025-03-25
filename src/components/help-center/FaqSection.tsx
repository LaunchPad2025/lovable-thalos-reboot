
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem = ({ question, answer }: FaqItemProps) => (
  <AccordionItem value={question.replace(/\s+/g, '-').toLowerCase()}>
    <AccordionTrigger className="text-left font-medium">{question}</AccordionTrigger>
    <AccordionContent className="text-muted-foreground">{answer}</AccordionContent>
  </AccordionItem>
);

const FaqSection = () => {
  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
        <p className="text-muted-foreground">Quick answers to common questions about Thalos</p>
      </div>
      
      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Accordion type="single" collapsible className="w-full">
            <FaqItem
              question="What is Thalos?"
              answer="Thalos is an AI-powered safety compliance platform that helps organizations identify, track, and remediate workplace safety issues. Our solution combines computer vision, task management, and analytics to create a comprehensive safety management system."
            />
            
            <FaqItem
              question="Who is Thalos designed for?"
              answer="Thalos is designed for safety managers, compliance officers, and operations leaders in industries with significant safety requirements, such as construction, manufacturing, healthcare, and logistics. Organizations of all sizes can benefit from our scalable platform."
            />
            
            <FaqItem
              question="How does Thalos help with safety compliance?"
              answer="Thalos helps with safety compliance by automatically detecting safety violations in images and video, creating and tracking remediation tasks, providing risk assessment tools, and generating compliance reports. The platform keeps all your safety data in one place and provides insights to improve your safety program."
            />
            
            <FaqItem
              question="Is Thalos available in my country?"
              answer="Thalos is available globally, with primary support in North America, Europe, Australia, and parts of Asia. Our platform complies with regional data privacy regulations, including GDPR in Europe. Contact us for specific availability information for your region."
            />
            
            <FaqItem
              question="How can I get started with Thalos?"
              answer="You can get started with Thalos by requesting a demo through our website or contacting our sales team. We'll set up a personalized demonstration and help you determine the right plan for your organization. Once you've subscribed, our onboarding team will guide you through the setup process."
            />
          </Accordion>
        </TabsContent>
        
        <TabsContent value="account">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Account FAQ section coming soon.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="features">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Features FAQ section coming soon.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="billing">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Billing FAQ section coming soon.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="technical">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Technical FAQ section coming soon.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FaqSection;
