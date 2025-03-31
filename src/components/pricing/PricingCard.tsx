import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import { PlanData, formatPrice } from '@/data/subscriptionPlans';
import PricingFeature from './PricingFeature';

interface PricingCardProps {
  plan: PlanData;
  billingCycle: 'monthly' | 'annual';
  isPopular?: boolean;
  onSubscribe: (planId: string) => void;
}

const PricingCard = ({ plan, billingCycle, isPopular, onSubscribe }: PricingCardProps) => {
  return (
    <Card className={`border-border ${isPopular ? 'border-blue-600 dark:border-blue-500 shadow-lg relative md:scale-105 z-10' : ''}`}>
      {isPopular && (
        <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 text-xs font-medium rounded-bl-lg rounded-tr-lg">
          MOST POPULAR
        </div>
      )}
      <CardHeader>
        <div className="mb-4 p-2 w-fit rounded-full bg-blue-100 dark:bg-blue-900/30">
          <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <CardTitle className="text-2xl">{plan.name}</CardTitle>
        <CardDescription>
          {plan.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <span className="text-4xl font-bold">
            {plan.id === 'enterprise' ? 'Custom Pricing' : formatPrice(plan.pricing[billingCycle])}
          </span>
          {plan.id !== 'enterprise' && (
            <span className="text-muted-foreground ml-2">/ {billingCycle === 'monthly' ? 'month' : 'year'}</span>
          )}
        </div>
        
        <ul className="space-y-3">
          {plan.features.filter(f => f.included).map((feature, index) => (
            <PricingFeature key={index}>{feature.text}</PricingFeature>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => onSubscribe(plan.id)} 
          className={`w-full ${isPopular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
          variant={plan.id === 'enterprise' ? 'outline' : 'default'}>
          {plan.id === 'enterprise' ? 'Contact Sales' : `Subscribe to ${plan.name}`}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;
