
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

export interface GuideCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeToComplete: string;
  updatedDate: string;
  new?: boolean;
}

const GuideCard = ({ 
  icon, 
  title, 
  description, 
  category, 
  difficulty, 
  timeToComplete, 
  updatedDate,
  new: isNew = false
}: GuideCardProps) => {
  const difficultyColor = 
    difficulty === 'Beginner' ? 'text-green-500' :
    difficulty === 'Intermediate' ? 'text-amber-500' : 'text-red-500';

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="p-2 bg-muted rounded-full">
            {icon}
          </div>
          {isNew && (
            <Badge className="ml-auto" variant="success">New</Badge>
          )}
        </div>
        <CardTitle className="mt-4">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-muted p-2 rounded-md text-center">
            <span className="block text-muted-foreground">Category</span>
            <span>{category}</span>
          </div>
          <div className="bg-muted p-2 rounded-md text-center">
            <span className="block text-muted-foreground">Difficulty</span>
            <span className={difficultyColor}>{difficulty}</span>
          </div>
          <div className="bg-muted p-2 rounded-md text-center">
            <span className="block text-muted-foreground">Time</span>
            <span>{timeToComplete}</span>
          </div>
          <div className="bg-muted p-2 rounded-md text-center">
            <span className="block text-muted-foreground">Updated</span>
            <span>{updatedDate}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          View Guide <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GuideCard;
