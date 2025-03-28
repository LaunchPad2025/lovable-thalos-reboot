
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { PlanData } from '@/data/subscriptionPlans';

export const useCheckout = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSubscribe = async (selectedPlan: string, billingCycle: 'monthly' | 'annual', plans: PlanData[]) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const plan = plans.find(p => p.id === selectedPlan);
      if (!plan) {
        throw new Error("Selected plan not found");
      }
      
      // Check if user is logged in
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to subscribe to a plan.",
          variant: "destructive",
        });
        navigate(`/auth?redirect=subscription&plan=${selectedPlan}&signup=true`);
        return;
      }
      
      // Get the user ID from the session
      const userId = session.session.user.id;
      
      toast({
        title: "Setting up your free trial",
        description: `Redirecting to checkout for ${plan.name} (${billingCycle}) plan with a ${plan.trial_period_days}-day free trial.`,
      });
      
      // Validate the stripe price ID before proceeding
      const priceId = plan.stripe_price_id[billingCycle];
      if (!priceId) {
        throw new Error(`No price ID available for ${plan.name} with ${billingCycle} billing cycle`);
      }
      
      console.log(`Creating checkout for user ${userId}, plan ${plan.name}, price ${priceId} with ${plan.trial_period_days}-day trial`);
      
      // Call our Supabase Edge Function to create a checkout session with trial
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          priceId,
          billingCycle,
          planName: plan.name,
          planId: plan.id,
          userId,
          trialPeriodDays: plan.trial_period_days
        },
      });
      
      if (error) {
        console.error("Supabase function error:", error);
        throw new Error(error.message || "Error creating checkout session");
      }
      
      // Redirect to Stripe checkout
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned from server');
      }
    } catch (error: any) {
      console.error('Error creating checkout session:', error);
      setError(error.message || "An error occurred during checkout. Please try again.");
      toast({
        title: "Checkout failed",
        description: error.message || "An error occurred during checkout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    isLoading,
    error,
    handleSubscribe
  };
};
