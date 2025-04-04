
import React, { useState, useEffect } from 'react';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import PlanCard from './PlanCard';
import { plans } from '@/data/subscriptionPlans';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useLocation } from 'react-router-dom';

interface PlanSelectorProps {
  billingCycle: 'monthly' | 'annual';
}

const PlanSelector = ({ billingCycle: initialBillingCycle }: PlanSelectorProps) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');
  const [error, setError] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>(initialBillingCycle);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const location = useLocation();
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const planParam = searchParams.get('plan');
    
    if (planParam && plans.some(p => p.id === planParam)) {
      setSelectedPlan(planParam);
    }
  }, [location.search]);
  
  const handleSubscription = async () => {
    setError(null);
    
    try {
      setIsLoading(true);
      window.location.href = "https://cal.com/annieeser/30min";
    } catch (err) {
      console.error('Subscription error:', err);
      setError('There was a problem processing your request. Please try again later.');
      setIsLoading(false);
    }
  };
  
  return (
    <div className="py-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex justify-center items-center mb-8 gap-3">
          <span className={billingCycle === 'monthly' ? 'font-medium' : 'text-muted-foreground'}>Monthly</span>
          <Switch 
            checked={billingCycle === 'annual'} 
            onCheckedChange={(checked) => setBillingCycle(checked ? 'annual' : 'monthly')} 
          />
          <span className={billingCycle === 'annual' ? 'font-medium' : 'text-muted-foreground'}>Annual</span>
          {billingCycle === 'annual' && (
            <Badge variant="outline" className="ml-2 bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
              Save 15%
            </Badge>
          )}
        </div>

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

        <div className="mb-8 p-6 border border-blue-500/30 bg-blue-500/5 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Enterprise Plan</h3>
          <p className="text-gray-400 mb-4">Custom solutions for large organizations with complex compliance needs</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
              <span>Custom integration</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
              <span>Multiple user accounts</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
              <span>Custom reporting</span>
            </div>
          </div>
          <div className="text-center">
            <Button 
              className="bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-500/10"
              onClick={() => window.location.href = "https://cal.com/annieeser/30min"}
            >
              Contact Sales for Enterprise Pricing
            </Button>
          </div>
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
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Contact Sales'
            )}
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Secure payment processing. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlanSelector;
