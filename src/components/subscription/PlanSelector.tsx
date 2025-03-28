
import React, { useState, useEffect } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import PlanCard from './PlanCard';
import { plans } from '@/data/subscriptionPlans';
import { useCheckout } from '@/hooks/useCheckout';
import { useStripeStatus } from '@/hooks/useStripeStatus';
import { useAuth } from '@/context/auth';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useLocation } from 'react-router-dom';

interface PlanSelectorProps {
  billingCycle: 'monthly' | 'annual';
}

const PlanSelector = ({ billingCycle }: PlanSelectorProps) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const preselectedPlan = searchParams.get('plan');
  
  const [selectedPlan, setSelectedPlan] = useState<string>(preselectedPlan || 'pro');
  const [error, setError] = useState<string | null>(null);
  const { isLoading, handleSubscribe } = useCheckout();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Use the hook to handle Stripe status
  useStripeStatus();
  
  // Set the selected plan based on URL parameter
  useEffect(() => {
    if (preselectedPlan && plans.some(plan => plan.id === preselectedPlan)) {
      setSelectedPlan(preselectedPlan);
    }
  }, [preselectedPlan]);
  
  const handleStartTrial = async () => {
    setError(null);
    
    if (!user) {
      toast({
        title: "Login required",
        description: "Please log in to start your free trial",
        variant: "destructive",
      });
      navigate(`/auth?signup=true&plan=${selectedPlan}`);
      return;
    }
    
    try {
      const plan = plans.find(p => p.id === selectedPlan);
      toast({
        title: "Setting up your free trial",
        description: `Starting your ${plan?.trial_period_days}-day free trial of the ${plan?.name} plan.`,
      });
      
      await handleSubscribe(selectedPlan, billingCycle, plans);
    } catch (err) {
      console.error('Subscription error:', err);
      setError('There was a problem setting up your free trial. Please try again later.');
    }
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
        
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="text-center">
          <Button 
            className="bg-primary hover:bg-primary/90 px-8 py-2 text-lg"
            onClick={handleStartTrial}
            disabled={isLoading || (selectedPlan === 'enterprise')}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : selectedPlan === 'enterprise' ? (
              'Contact Sales for Enterprise'
            ) : (
              `Start ${plans.find(p => p.id === selectedPlan)?.trial_period_days}-Day Free Trial`
            )}
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Your card will not be charged until your free trial ends. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlanSelector;
