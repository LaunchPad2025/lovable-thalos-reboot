
import React from 'react';
import { Separator } from '@/components/ui/separator';
import UpdateItem from './UpdateItem';

export interface UpdateData {
  date: string;
  title: string;
  type: 'feature' | 'improvement' | 'bug';
  description: string;
  bulletPoints: string[];
}

interface MonthUpdatesProps {
  month: string;
  updates: UpdateData[];
}

const MonthUpdates = ({ month, updates }: MonthUpdatesProps) => {
  return (
    <div>
      <div className="flex items-center space-x-4 mb-6">
        <h2 className="text-2xl font-bold">{month}</h2>
        <Separator className="flex-1" />
      </div>
      
      <div className="space-y-8">
        {updates.map((update, index) => (
          <UpdateItem 
            key={index}
            date={update.date}
            title={update.title}
            type={update.type}
            description={update.description}
            bulletPoints={update.bulletPoints}
          />
        ))}
      </div>
    </div>
  );
};

export default MonthUpdates;
