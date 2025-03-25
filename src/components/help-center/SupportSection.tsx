
import React from 'react';
import SupportTicketForm from '@/components/contact/SupportTicketForm';

const SupportSection = () => {
  return (
    <div className="mb-16">
      <div className="text-center mb-8" id="support-form">
        <h2 className="text-2xl font-bold mb-2">Contact Our Support Team</h2>
        <p className="text-muted-foreground">
          Need personalized assistance? Submit a support ticket and our team will get back to you as soon as possible.
        </p>
      </div>
      
      <SupportTicketForm />
    </div>
  );
};

export default SupportSection;
