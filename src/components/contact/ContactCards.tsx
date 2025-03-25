
import React from 'react';
import { MessageSquare, Mail, Clock, HelpCircle, Users } from 'lucide-react';
import ContactCard from './ContactCard';
import ContactItem from './ContactItem';

const ContactCards = () => {
  return (
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
  );
};

export default ContactCards;
