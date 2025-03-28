
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface PlanFeatureProps {
  features: string[];
}

const PlanFeatureList: React.FC<PlanFeatureProps> = ({ features }) => {
  return (
    <ul className="space-y-3">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
};

export default PlanFeatureList;
