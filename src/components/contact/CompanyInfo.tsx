
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Mail, Clock } from 'lucide-react';

const CompanyInfo = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Information</CardTitle>
        <CardDescription>
          Other ways to reach us
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="font-medium">Headquarters</h3>
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
            <address className="text-muted-foreground not-italic">
              Washington, DC<br />
              United States
            </address>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium">General Inquiries</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-muted-foreground mr-3" />
              <span className="text-muted-foreground">contact@steeltoetech.io</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium">Business Hours</h3>
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-muted-foreground mr-3" />
            <span className="text-muted-foreground">Monday-Friday: 9AM-6PM ET</span>
          </div>
        </div>
        
        <div className="pt-4 border-t border-border">
          <h3 className="font-medium mb-2">Connect With Us</h3>
          {/* Social icons hidden for now */}
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyInfo;
