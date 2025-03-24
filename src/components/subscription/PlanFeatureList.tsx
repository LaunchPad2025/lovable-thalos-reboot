
import React from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PlanFeature } from '@/data/subscriptionPlans';

interface PlanFeatureListProps {
  features: PlanFeature[];
}

const PlanFeatureList = ({ features }: PlanFeatureListProps) => {
  return (
    <ul className="mt-6 space-y-3">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          {feature.included ? (
            <Check size={16} className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
          ) : (
            <X size={16} className="text-gray-400 mt-0.5 mr-2 flex-shrink-0" />
          )}
          <span className={cn(
            "text-sm",
            feature.included ? "text-gray-700" : "text-gray-400"
          )}>
            {feature.text}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default PlanFeatureList;
