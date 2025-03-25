
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
  <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
    <div 
      className="h-40 bg-cover bg-center relative" 
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
    </div>
    <CardHeader className="pb-2 flex-grow">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-full bg-muted flex items-center justify-center">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </div>
      <CardDescription className="text-sm line-clamp-3">{description}</CardDescription>
    </CardHeader>
    <CardFooter className="pt-0">
      <Button variant="ghost" className="w-full justify-between group">
        Explore Guides 
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </CardFooter>
  </Card>
);

export default IndustryGuideCard;
