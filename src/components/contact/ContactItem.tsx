
import React from 'react';

interface ContactItemProps {
  icon: React.ReactNode;
  text: string;
}

const ContactItem = ({ icon, text }: ContactItemProps) => (
  <div className="flex items-center text-muted-foreground">
    <span className="mr-3">{icon}</span>
    <span>{text}</span>
  </div>
);

export default ContactItem;
