
import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Plan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: {
    text: string;
    included: boolean;
  }[];
  popular?: boolean;
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: '$29',
    description: 'For small teams getting started with safety management',
    features: [
      { text: 'Up to 10 users', included: true },
      { text: 'Basic incident reporting', included: true },
      { text: 'Standard compliance checklists', included: true },
      { text: 'Email support', included: true },
      { text: 'Advanced analytics', included: false },
      { text: 'Custom workflows', included: false },
      { text: 'AI safety assistant', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Professional',
    price: '$79',
    description: 'For growing organizations with advanced needs',
    features: [
      { text: 'Up to 50 users', included: true },
      { text: 'Advanced incident reporting', included: true },
      { text: 'Custom compliance checklists', included: true },
      { text: 'Priority email & phone support', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Custom workflows', included: true },
      { text: 'AI safety assistant', included: false },
    ],
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$149',
    description: 'For large organizations requiring full compliance',
    features: [
      { text: 'Unlimited users', included: true },
      { text: 'Enterprise incident reporting', included: true },
      { text: 'Custom compliance & auditing', included: true },
      { text: 'Dedicated support team', included: true },
      { text: 'Advanced analytics & reporting', included: true },
      { text: 'Custom workflows & integrations', included: true },
      { text: 'AI safety assistant', included: true },
    ],
  },
];

const PlanSelector = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');
  
  return (
    <div className="py-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Choose Your Plan</h2>
          <p className="mt-2 text-gray-600">Select the plan that best fits your organization's needs</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={cn(
                "rounded-lg overflow-hidden transition-all duration-300",
                plan.popular ? "transform md:-translate-y-2" : "",
                selectedPlan === plan.id
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
                  <span className="text-3xl font-extrabold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500 text-sm font-medium ml-1">/month</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">{plan.description}</p>
                
                <Button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={cn(
                    "w-full",
                    selectedPlan === plan.id
                      ? "bg-thalos-blue hover:bg-blue-600"
                      : "bg-white text-thalos-blue border border-thalos-blue hover:bg-gray-50"
                  )}
                >
                  {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                </Button>
                
                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, index) => (
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
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button className="bg-thalos-blue hover:bg-blue-600 px-8 py-2 text-lg">
            Subscribe Now
          </Button>
          <p className="mt-4 text-sm text-gray-500">
            Secure payment processing by Stripe. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlanSelector;
