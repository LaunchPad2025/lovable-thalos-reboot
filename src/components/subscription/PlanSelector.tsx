
import React, { useState, useEffect } from 'react';
import { Check, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Plan } from '@/types/models';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { useNavigate, useLocation } from 'react-router-dom';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface PlanData {
  id: string;
  name: string;
  description: string;
  features: PlanFeature[];
  pricing: {
    monthly: number;
    annual: number;
  };
  stripe_price_id: {
    monthly: string;
    annual: string;
  };
  popular?: boolean;
}

const plans: PlanData[] = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'For small teams getting started with safety management',
    pricing: {
      monthly: 99,
      annual: 1009.80,
    },
    stripe_price_id: {
      monthly: 'price_1R4YqoGCrRkrgEFrxnYFNfd8',
      annual: 'price_1R4YsZGCrRkrgEFruQgqFdUi',
    },
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
    description: 'For growing organizations with advanced needs',
    pricing: {
      monthly: 149,
      annual: 1519.80,
    },
    stripe_price_id: {
      monthly: 'price_1R4Yv1GCrRkrgEFr3bBkqIy1',
      annual: 'price_1R4Yv1GCrRkrgEFr3bBkqIy1',
    },
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
    description: 'For large organizations requiring full compliance',
    pricing: {
      monthly: 350,
      annual: 3570.00,
    },
    stripe_price_id: {
      monthly: 'price_1R4Yv1GCrRkrgEFr3bBkqIy1',
      annual: 'price_1R4Yw3GCrRkrgEFrredMrTtQ',
    },
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

interface PlanSelectorProps {
  billingCycle: 'monthly' | 'annual';
}

const PlanSelector = ({ billingCycle }: PlanSelectorProps) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check for Stripe success or canceled status
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const success = searchParams.get('success');
    const canceled = searchParams.get('canceled');
    const sessionId = searchParams.get('session_id');
    
    if (success === 'true' && sessionId) {
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to Thalos. Your account has been upgraded.",
        duration: 5000,
      });
      
      // Clean up the URL by removing query parameters
      navigate('/subscription', { replace: true });
    } else if (canceled === 'true') {
      toast({
        title: "Subscription canceled",
        description: "You've canceled the checkout process. No charges were made.",
        duration: 5000,
      });
      
      // Clean up the URL by removing query parameters
      navigate('/subscription', { replace: true });
    }
  }, [location.search, toast, navigate]);
  
  const handleSubscribe = async () => {
    try {
      setIsLoading(true);
      const plan = plans.find(p => p.id === selectedPlan);
      if (!plan) return;
      
      // Check if user is logged in
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to subscribe to a plan.",
          variant: "destructive",
        });
        navigate('/auth');
        return;
      }
      
      toast({
        title: "Subscription in progress",
        description: `Redirecting to checkout for ${plan.name} (${billingCycle}) plan.`,
      });
      
      // Call our Supabase Edge Function to create a checkout session
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          priceId: plan.stripe_price_id[billingCycle],
          billingCycle,
          planName: plan.name,
        },
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      // Redirect to Stripe checkout
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast({
        title: "Checkout failed",
        description: error.message || "An error occurred during checkout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };
  
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
                  <span className="text-3xl font-extrabold text-gray-900">
                    {formatPrice(plan.pricing[billingCycle])}
                  </span>
                  <span className="text-gray-500 text-sm font-medium ml-1">
                    {billingCycle === 'monthly' ? '/month' : '/year'}
                  </span>
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
          <Button 
            className="bg-thalos-blue hover:bg-blue-600 px-8 py-2 text-lg"
            onClick={handleSubscribe}
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
