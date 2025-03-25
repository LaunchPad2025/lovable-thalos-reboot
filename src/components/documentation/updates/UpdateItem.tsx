
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface UpdateItemProps {
  date: string;
  title: string;
  type: 'feature' | 'improvement' | 'bug';
  description: string;
  bulletPoints: string[];
}

const UpdateItem = ({ date, title, type, description, bulletPoints }: UpdateItemProps) => {
  const badgeVariant = 
    type === 'feature' ? 'success' :
    type === 'improvement' ? 'info' : 'warning';
  
  const badgeText = 
    type === 'feature' ? 'New Feature' :
    type === 'improvement' ? 'Improvement' : 'Bug Fix';

  return (
    <div className="border border-border rounded-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between mb-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="flex items-center space-x-3 mt-2 sm:mt-0">
          <Badge variant={badgeVariant}>{badgeText}</Badge>
          <span className="text-sm text-muted-foreground">{date}</span>
        </div>
      </div>
      
      <p className="text-muted-foreground mb-4">{description}</p>
      
      <ul className="space-y-2">
        {bulletPoints.map((point, index) => (
          <li key={index} className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpdateItem;
