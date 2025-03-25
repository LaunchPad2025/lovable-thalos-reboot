
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { PlanData } from '@/data/subscriptionPlans';

export const useCheckout = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSubscribe = async (selectedPlan: string, billingCycle: 'monthly' | 'annual', plans: PlanData[]) => {
    try {
      setIsLoading(true);
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
        navigate('/auth');
        return;
      }
      
      // Get the user ID from the session
      const userId = session.session.user.id;
      
      toast({
        title: "Subscription in progress",
        description: `Redirecting to checkout for ${plan.name} (${billingCycle}) plan.`,
      });
      
      // Validate the stripe price ID before proceeding
      const priceId = plan.stripe_price_id[billingCycle];
      if (!priceId) {
        throw new Error(`No price ID available for ${plan.name} with ${billingCycle} billing cycle`);
      }
      
      // Call our Supabase Edge Function to create a checkout session
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          priceId,
          billingCycle,
          planName: plan.name,
          userId,
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
  
  return {
    isLoading,
    handleSubscribe
  };
};
