
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';

interface ViolationSummaryCardProps {
  severity: string;
  location?: string;
  industry?: string;
  description?: string;
}

const ViolationSummaryCard = ({ 
  severity, 
  location, 
  industry, 
  description 
}: ViolationSummaryCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <div className={`w-3 h-3 rounded-full mr-2 ${
            severity === 'high' ? 'bg-red-500' :
            severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
          }`}></div>
          Severity: {severity.charAt(0).toUpperCase() + severity.slice(1)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p><strong>Location:</strong> {location || 'Unknown'}</p>
          <p><strong>Industry:</strong> {industry || 'Construction'}</p>
          <p className="mt-2">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ViolationSummaryCard;
