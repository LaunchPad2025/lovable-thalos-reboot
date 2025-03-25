
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export interface IndustryGuideCardProps {
  title: string;
  description: string;
  imageUrl: string;
  icon: React.ReactNode;
}

const IndustryGuideCard = ({ title, description, imageUrl, icon }: IndustryGuideCardProps) => (
  <Card className="overflow-hidden">
    <div className="h-36 bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }}></div>
    <CardHeader className="pb-2">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <CardTitle>{title}</CardTitle>
      </div>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardFooter>
      <Button variant="ghost" className="w-full justify-between">
        Explore Guides <ArrowRight className="h-4 w-4" />
      </Button>
    </CardFooter>
  </Card>
);

export default IndustryGuideCard;
