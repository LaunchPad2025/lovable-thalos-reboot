
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  contactInfo: React.ReactNode;
  buttonText: string;
  buttonLink: string;
}

const ContactCard = ({ icon, title, description, contactInfo, buttonText, buttonLink }: ContactCardProps) => (
  <Card className="h-full flex flex-col">
    <CardHeader>
      <div className="mb-4 p-2 w-fit rounded-full bg-muted">
        {icon}
      </div>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4 flex-grow">
      {contactInfo}
    </CardContent>
    <div className="p-6 pt-0 mt-auto">
      <Button 
        className="w-full"
        onClick={() => window.location.href = buttonLink}
      >
        {buttonText}
      </Button>
    </div>
  </Card>
);

export default ContactCard;
