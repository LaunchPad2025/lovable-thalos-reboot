
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Shield } from 'lucide-react';

interface DemoCardProps {
  message?: string;
}

const DemoCard = ({ message = "This is simulated data" }: DemoCardProps) => {
  return (
    <Card className="bg-blue-900/20 border border-blue-900/30 mt-8">
      <CardContent className="p-4 flex items-center">
        <div className="mr-4 bg-blue-500/20 p-2 rounded-full">
          <Shield className="h-6 w-6 text-blue-500" />
        </div>
        <div>
          <h4 className="font-medium">Demo Mode</h4>
          <p className="text-sm text-gray-400">{message}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DemoCard;
