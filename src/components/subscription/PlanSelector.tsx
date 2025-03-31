
import React, { useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import PlanCard from './PlanCard';
import { plans } from '@/data/subscriptionPlans';
import { useCheckout } from '@/hooks/useCheckout';
import { useStripeStatus } from '@/hooks/useStripeStatus';
import { useAuth } from '@/context/auth';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface PlanSelectorProps {
  billingCycle: 'monthly' | 'annual';
}

const PlanSelector = ({ billingCycle }: PlanSelectorProps) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');
  const [error, setError] = useState<string | null>(null);
  const { isLoading, handleSubscribe } = useCheckout();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Use the hook to handle Stripe status
  useStripeStatus();
  
  const handleSubscription = async () => {
    setError(null);
    
    if (!user) {
      toast({
        title: "Login required",
        description: "Please log in to subscribe to a plan",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    // If Enterprise plan is selected, redirect to contact sales
    if (selectedPlan === 'enterprise') {
      window.location.href = "https://cal.com/annieeser/30min";
      return;
    }
    
    try {
      await handleSubscribe(selectedPlan, billingCycle, plans);
    } catch (err) {
      console.error('Subscription error:', err);
      setError('There was a problem processing your subscription. Please try again later.');
    }
  };
  
  return (
    <div className="py-8">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {plans.filter(plan => plan.id !== 'enterprise').map((plan) => (
            <PlanCard 
              key={plan.id}
              plan={plan}
              isSelected={selectedPlan === plan.id}
              billingCycle={billingCycle}
              onSelectPlan={setSelectedPlan}
            />
          ))}
        </div>

        {/* Enterprise plan special card */}
        <div className="mb-8 p-6 border border-blue-500/30 bg-blue-500/5 rounded-lg text-center">
          <h3 className="text-xl font-bold mb-2">Enterprise Plan</h3>
          <p className="text-gray-400 mb-4">Custom solutions for large organizations with complex compliance needs</p>
          <Button 
            className="bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-500/10"
            onClick={() => window.location.href = "https://cal.com/annieeser/30min"}
          >
            Contact Annie for Enterprise Pricing
          </Button>
        </div>
        
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="text-center">
          <Button 
            className="bg-primary hover:bg-primary/90 px-8 py-2 text-lg"
            onClick={handleSubscription}
            disabled={isLoading || selectedPlan === 'enterprise'}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              selectedPlan === 'enterprise' ? 'Contact Sales' : 'Subscribe Now'
            )}
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Secure payment processing by Stripe. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlanSelector;
