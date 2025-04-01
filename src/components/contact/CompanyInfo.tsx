
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock, Globe } from 'lucide-react';
import ContactItem from './ContactItem';

const CompanyInfo = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Thalos Technologies Inc.</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ContactItem 
          icon={<Mail className="h-5 w-5" />} 
          title="Email"
          text="contact@thalostech.io"
        />
        
        <ContactItem 
          icon={<Phone className="h-5 w-5" />} 
          title="Phone"
          text="+1 (555) 987-6543"
        />
        
        <ContactItem 
          icon={<MapPin className="h-5 w-5" />} 
          title="Address"
          text="123 Safety Street, Tech Valley, CA 94103"
        />
        
        <ContactItem 
          icon={<Clock className="h-5 w-5" />} 
          title="Business Hours"
          text="Monday - Friday: 7:00 AM - 7:00 PM ET"
        />
        
        <ContactItem 
          icon={<Globe className="h-5 w-5" />} 
          title="Website"
          text="www.thalostech.io"
        />
      </CardContent>
    </Card>
  );
};

export default CompanyInfo;
