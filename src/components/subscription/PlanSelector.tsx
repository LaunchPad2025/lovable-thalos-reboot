
import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PlanCard from './PlanCard';
import { plans } from '@/data/subscriptionPlans';
import { useCheckout } from '@/hooks/useCheckout';
import { useStripeStatus } from '@/hooks/useStripeStatus';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface PlanSelectorProps {
  billingCycle: 'monthly' | 'annual';
}

const PlanSelector = ({ billingCycle }: PlanSelectorProps) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');
  const { isLoading, handleSubscribe } = useCheckout();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Use the hook to handle Stripe status
  useStripeStatus();
  
  const handleSubscription = () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please log in to subscribe to a plan",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }
    
    handleSubscribe(selectedPlan, billingCycle, plans);
  };
  
  return (
    <div className="py-8">
      <div className="mx-auto max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => (
            <PlanCard 
              key={plan.id}
              plan={plan}
              isSelected={selectedPlan === plan.id}
              billingCycle={billingCycle}
              onSelectPlan={setSelectedPlan}
            />
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            className="bg-indigo-600 hover:bg-indigo-700 px-8 py-2 text-lg"
            onClick={handleSubscription}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Subscribe Now'
            )}
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
