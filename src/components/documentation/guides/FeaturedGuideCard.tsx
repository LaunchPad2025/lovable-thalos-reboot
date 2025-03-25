
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface FeaturedGuideCardProps {
  title: string;
  description: string;
  imageUrl: string;
  type: 'Video Tutorial' | 'Whitepaper' | string;
  updatedDate: string;
  buttonText: string;
}

const FeaturedGuideCard = ({ 
  title, 
  description, 
  imageUrl, 
  type, 
  updatedDate, 
  buttonText 
}: FeaturedGuideCardProps) => (
  <Card className="overflow-hidden">
    <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }}></div>
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <Badge variant="outline">{type}</Badge>
        <span className="text-sm text-muted-foreground">Updated {updatedDate}</span>
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <Button className="w-full">{buttonText}</Button>
    </div>
  </Card>
);

export default FeaturedGuideCard;
