
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
      
      // Redirect to the replit app with the appropriate URL parameters
      window.location.href = `https://thalostech.replit.app/subscription?plan=${selectedPlan}&cycle=${billingCycle}`;
      
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast({
        title: "Checkout failed",
        description: error.message || "An error occurred during checkout. Please try again.",
        variant: "destructive",
      });
      throw error; // Re-throw to allow the component to handle it
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    isLoading,
    handleSubscribe
  };
};
