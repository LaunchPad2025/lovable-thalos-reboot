
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PlanData, formatPrice } from '@/data/subscriptionPlans';
import PlanFeatureList from './PlanFeatureList';

interface PlanCardProps {
  plan: PlanData;
  isSelected: boolean;
  billingCycle: 'monthly' | 'annual';
  onSelectPlan: (planId: string) => void;
}

const PlanCard = ({ 
  plan, 
  isSelected, 
  billingCycle, 
  onSelectPlan 
}: PlanCardProps) => {
  return (
    <div 
      className={cn(
        "rounded-lg overflow-hidden transition-all duration-300",
        plan.popular ? "transform md:-translate-y-2" : "",
        isSelected
          ? "border-2 border-thalos-blue shadow-lg"
          : "border border-gray-200"
      )}
    >
      {plan.popular && (
        <div className="bg-thalos-blue text-white text-center py-1 text-sm font-medium">
          Most Popular
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
        <div className="flex items-baseline mb-2">
          <span className="text-3xl font-extrabold text-gray-900">
            {formatPrice(plan.pricing[billingCycle])}
          </span>
          <span className="text-gray-500 text-sm font-medium ml-1">
            {billingCycle === 'monthly' ? '/month' : '/year'}
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-4">{plan.description}</p>
        
        <Button
          onClick={() => onSelectPlan(plan.id)}
          className={cn(
            "w-full",
            isSelected
              ? "bg-thalos-blue hover:bg-blue-600"
              : "bg-white text-thalos-blue border border-thalos-blue hover:bg-gray-50"
          )}
        >
          {isSelected ? 'Selected' : 'Select Plan'}
        </Button>
        
        <PlanFeatureList features={plan.features} />
      </div>
    </div>
  );
};

export default PlanCard;
