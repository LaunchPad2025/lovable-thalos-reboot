
import React from 'react';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
}

const DashboardHeader = ({ title, subtitle }: DashboardHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-gray-400 text-sm">{subtitle}</p>
      </div>
      <div className="flex space-x-2">
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Upgrade Plan
        </Button>
        <Button 
          variant="outline" 
          className="border-gray-700 text-gray-300 flex items-center" 
          size="icon"
        >
          <HelpCircle className="h-5 w-5" />
          <span className="sr-only">Start Tour</span>
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
