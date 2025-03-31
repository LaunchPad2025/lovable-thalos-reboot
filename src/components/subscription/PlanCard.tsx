
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PlanData, formatPrice } from '@/data/subscriptionPlans';
import PlanFeatureList from './PlanFeatureList';
import { CheckCircle } from 'lucide-react';

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
        "rounded-lg overflow-hidden transition-all duration-300 bg-card",
        plan.popular ? "transform md:-translate-y-2" : "",
        isSelected
          ? "border-2 border-primary shadow-lg"
          : "border border-border"
      )}
    >
      {plan.popular && (
        <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
          Most Popular
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-1">{plan.name}</h3>
        <div className="flex items-baseline mb-2">
          <span className="text-3xl font-extrabold text-foreground">
            {plan.id === 'enterprise' ? 'Custom' : formatPrice(plan.pricing[billingCycle])}
          </span>
          {plan.id !== 'enterprise' && (
            <span className="text-muted-foreground text-sm font-medium ml-1">
              /{billingCycle === 'monthly' ? 'month' : 'year'}
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
        
        <Button
          onClick={() => onSelectPlan(plan.id)}
          className={cn(
            "w-full",
            isSelected
              ? "bg-primary hover:bg-primary/90"
              : "bg-card text-primary border border-primary hover:bg-primary/10"
          )}
        >
          {isSelected ? 'Selected' : 'Select Plan'}
        </Button>
        
        <div className="mt-6">
          <div className="text-sm font-medium mb-2">Plan includes:</div>
          <ul className="space-y-3">
            {plan.features.filter(f => f.included).map((feature, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                <span className="text-foreground">{feature.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
