
import React from 'react';
import FaqCard from './FaqCard';

const FaqSection = () => {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FaqCard 
          question="How many safety analyses can I run each month?"
          answer="Each plan includes a set number of safety analyses per month: Basic (50), Pro (100), and Premium (250). If you need more, contact our sales team for additional analysis packs or custom volume pricing."
        />
        
        <FaqCard 
          question="What's the difference between Basic and Pro plans?"
          answer="The Pro plan includes 100 safety analyses (vs 50 in Basic), multi-modal analysis capabilities (image, text, audio), enhanced AI detection, advanced reporting, and risk level assessment. It's ideal for businesses with more complex safety needs."
        />
        
        <FaqCard 
          question="What is the advantage of annual billing?"
          answer="With annual billing, you save 15% compared to monthly billing. It's a great option if you're committed to long-term safety compliance while also reducing your overall costs."
        />
        
        <FaqCard 
          question="Can I upgrade my plan later?"
          answer="Yes, you can upgrade your plan at any time. When you upgrade, you'll be prorated for the remainder of your billing cycle and your new features will be available immediately."
        />
        
        <FaqCard 
          question="Do you offer discounts for multiple sites?"
          answer="Yes, we offer custom pricing for businesses managing safety across multiple locations. Contact our sales team to discuss your specific needs and we'll create a tailored package."
        />
        
        <FaqCard 
          question="What kind of support is included with my plan?"
          answer="All plans include email support. Premium plans include priority support with faster response times, and Enterprise customers receive a dedicated account manager for personalized assistance."
        />
        
        <FaqCard 
          question="What is multi-modal analysis?"
          answer="Multi-modal analysis allows you to analyze safety conditions using different input types: images (photos of work sites), text (written descriptions), and audio (verbal reports). This feature is available in Pro and Premium plans."
        />
        
        <FaqCard 
          question="How do I get started with Thalos?"
          answer="Simply choose a plan that fits your needs, complete the subscription process, and you'll have immediate access to our platform. Our onboarding process will guide you through setting up your account and getting started with your first safety analysis."
        />
      </div>
    </div>
  );
};

export default FaqSection;
