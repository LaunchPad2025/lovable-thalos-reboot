
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import PageTitle from '@/components/ui/PageTitle';
import ContactHero from '@/components/contact/ContactHero';
import ContactForm from '@/components/contact/ContactForm';

const Contact = () => {
  return (
    <PageContainer>
      <div className="max-w-6xl mx-auto">
        <PageTitle 
          title="Contact Us" 
          subtitle="Get in touch with our team for sales, support, or general inquiries"
          className="mb-12"
        />
        
        <ContactHero />
        
        <div className="mb-16">
          <div className="text-left mb-8">
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-muted-foreground max-w-2xl">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>
          <ContactForm />
        </div>
      </div>
    </PageContainer>
  );
};

export default Contact;
