
import React from 'react';
import PricingFaqItem from './PricingFaqItem';

const PricingFaq = () => {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <PricingFaqItem
          question="How many safety analyses can I run?"
          answer="Each plan includes a set number of monthly analyses: Basic (50), Pro (100), and Premium (250). 
                Need more? Contact our sales team for additional analysis packs or custom volume pricing."
        />
        
        <PricingFaqItem
          question="What is the advantage of annual billing?"
          answer="With annual billing, you save 15% compared to monthly billing. It's a great option if you're committed to 
                improving safety compliance over the long term while also saving on your subscription costs."
        />
        
        <PricingFaqItem
          question="Can I upgrade my plan later?"
          answer="Yes! You can upgrade your plan at any time. When you upgrade, you'll be prorated for the remainder of your billing cycle.
                Your new features will be available immediately after upgrading."
        />
        
        <PricingFaqItem
          question="What is multi-modal analysis?"
          answer="Multi-modal analysis allows you to analyze safety conditions using different input types: 
                images (photos of work sites), text (written descriptions), and audio (verbal reports). This 
                feature is available in Pro and Premium plans."
        />
        
        <PricingFaqItem
          question="What support options are available?"
          answer="All plans include email support. Premium plans include priority support with faster response times.
                Enterprise customers receive a dedicated account manager for personalized assistance."
        />
        
        <PricingFaqItem
          question="Do you offer discounts for multiple sites?"
          answer="Yes, we offer volume discounts for businesses managing safety across multiple locations.
                Contact our sales team to discuss your specific needs and we'll create a custom pricing package."
        />
      </div>
    </div>
  );
};

export default PricingFaq;
