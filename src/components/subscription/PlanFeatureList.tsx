
import React from 'react';
import { Check, X } from 'lucide-react';
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
            <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
          ) : (
            <X className="h-5 w-5 text-muted-foreground mr-2 shrink-0" />
          )}
          <span className={feature.included ? "text-foreground" : "text-muted-foreground"}>
            {feature.text}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default PlanFeatureList;
