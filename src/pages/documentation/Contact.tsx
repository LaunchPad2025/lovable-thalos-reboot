
import React from 'react';
import PageContainer from '@/components/layout/PageContainer';
import PageTitle from '@/components/ui/PageTitle';
import ContactCards from '@/components/contact/ContactCards';
import SupportTicketForm from '@/components/contact/SupportTicketForm';
import CompanyInfo from '@/components/contact/CompanyInfo';
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
        
        <ContactCards />
        
        {/* Support Ticket Form & Company Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <SupportTicketForm />
          </div>
          
          <div>
            <CompanyInfo />
          </div>
        </div>
        
        <FaqSection />
        
        <MapSection />
        
        <NewsletterSignup />
      </div>
    </PageContainer>
  );
};

export default Contact;
