
import React, { ReactNode } from 'react';

export interface ContactItemProps {
  icon: ReactNode;
  title: string;
  text: string;
}

const ContactItem = ({ icon, title, text }: ContactItemProps) => {
  return (
    <div className="flex items-start">
      <div className="mr-3 text-primary">{icon}</div>
      <div>
        <div className="font-medium mb-1">{title}</div>
        <div className="text-sm text-muted-foreground">{text}</div>
      </div>
    </div>
  );
};

export default ContactItem;
