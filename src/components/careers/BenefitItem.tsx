
import React from 'react';

interface BenefitItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BenefitItem = ({ icon, title, description }: BenefitItemProps) => (
  <div className="flex items-start p-4 bg-card border border-border rounded-lg">
    <div className="mr-3 mt-0.5">{icon}</div>
    <div>
      <h3 className="font-medium mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

export default BenefitItem;
