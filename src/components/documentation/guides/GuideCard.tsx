
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface GuideCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  level: "Beginner" | "Intermediate" | "Advanced";
  time: string;
  author: string;
}

const GuideCard = ({ title, description, icon, level, time, author }: GuideCardProps) => {
  const getLevelColor = (level: string) => {
    switch(level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Advanced':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <Card className="hover:border-primary/50 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-md bg-primary/10 text-primary">
                {icon}
              </div>
              <Badge variant="outline" className={`${getLevelColor(level)} border-0`}>
                {level}
              </Badge>
              <span className="text-xs text-muted-foreground">{time}</span>
            </div>
            
            <h3 className="text-lg font-medium mb-1">{title}</h3>
            <p className="text-muted-foreground text-sm mb-3">{description}</p>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">By {author}</span>
              <Button variant="ghost" size="sm" className="gap-1 text-xs h-8 px-2">
                Read guide <ArrowRight className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GuideCard;
