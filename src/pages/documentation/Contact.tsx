
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import PageTitle from '@/components/ui/PageTitle';
import ContactForm from '@/components/contact/ContactForm';
import FaqSection from '@/components/contact/FaqSection';
import MapSection from '@/components/contact/MapSection';
import NewsletterSignup from '@/components/contact/NewsletterSignup';

const Contact = () => {
  return (
    <PageContainer>
      <div className="max-w-6xl mx-auto">
        <PageTitle 
          title="Contact Us" 
          subtitle="Get in touch with our team for sales, support, or general inquiries"
          className="mb-12"
        />
        
        <div className="max-w-3xl mx-auto mb-16">
          <ContactForm />
        </div>
        
        <FaqSection />
        
        <MapSection />
        
        <NewsletterSignup />
      </div>
    </PageContainer>
  );
};

export default Contact;
