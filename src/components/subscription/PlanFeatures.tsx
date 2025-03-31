
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface PlanFeaturesProps {
  features: { text: string; included: boolean }[];
}

const PlanFeatures = ({ features }: PlanFeaturesProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Current Plan Features</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          {features
            .filter(f => f.included)
            .map((feature, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                <span>{feature.text}</span>
              </li>
            ))
          }
        </ul>
      </CardContent>
    </Card>
  );
};

export default PlanFeatures;
