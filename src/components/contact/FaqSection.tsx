
import React from 'react';
import FaqCard from './FaqCard';

const FaqSection = () => {
  return (
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
  );
};

export default FaqSection;
