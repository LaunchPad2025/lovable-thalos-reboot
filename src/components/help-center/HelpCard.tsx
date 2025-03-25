
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface HelpCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBgClass: string;
  iconTextClass: string;
  items: {
    icon: React.ReactNode;
    text: string;
  }[];
  buttonText: string;
  onButtonClick: () => void;
}

const HelpCard = ({
  title,
  description,
  icon,
  iconBgClass,
  iconTextClass,
  items,
  buttonText,
  onButtonClick
}: HelpCardProps) => {
  return (
    <Card className="text-center">
      <CardHeader className="pb-3">
        <div className={`mx-auto ${iconBgClass} p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4`}>
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-left">
          <h4 className="font-medium mb-2">
            {title.includes('Getting Started') ? 'Quick start guides:' : 
             title.includes('Documentation') ? 'Popular topics:' : 'Support options:'}
          </h4>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            {items.map((item, index) => (
              <li key={index} className="flex items-center">
                {item.icon}
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <Button 
          variant={title.includes('Contact Support') ? 'default' : 'outline'} 
          className="w-full"
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default HelpCard;
