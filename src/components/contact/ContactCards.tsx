
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BadgeCheck, Mail, MapPin, Phone } from 'lucide-react';
import ContactItem from './ContactItem';

const ContactCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Contact Details</h3>
          <div className="space-y-6">
            <ContactItem 
              icon={<Phone className="h-5 w-5 text-blue-500" />} 
              title="Phone"
              text="+1 (202) 555-0123" 
            />
            <ContactItem 
              icon={<Mail className="h-5 w-5 text-blue-500" />} 
              title="Email"
              text="contact@steeltoetech.io" 
            />
            <ContactItem 
              icon={<MapPin className="h-5 w-5 text-blue-500" />} 
              title="Address"
              text="1600 Pennsylvania Avenue, Washington DC, 20500" 
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Office Hours</h3>
          <div className="space-y-6">
            <ContactItem 
              icon={<BadgeCheck className="h-5 w-5 text-green-500" />} 
              title="Weekdays"
              text="Monday - Friday: 9:00 AM - 5:00 PM EST" 
            />
            <ContactItem 
              icon={<BadgeCheck className="h-5 w-5 text-green-500" />} 
              title="Weekends"
              text="Saturday - Sunday: Closed" 
            />
            <ContactItem 
              icon={<BadgeCheck className="h-5 w-5 text-green-500" />} 
              title="Support"
              text="24/7 for Priority Enterprise Customers" 
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactCards;
