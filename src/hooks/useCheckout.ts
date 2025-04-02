
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { PlanData } from '@/data/subscriptionPlans';

export const useCheckout = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Look for auth token in the URL if available
  const searchParams = new URLSearchParams(location.search);
  const authToken = searchParams.get('authToken');
  
  const handleSubscribe = async (selectedPlan: string, billingCycle: 'monthly' | 'annual', plans: PlanData[]) => {
    try {
      setIsLoading(true);
      const plan = plans.find(p => p.id === selectedPlan);
      if (!plan) {
        throw new Error("Selected plan not found");
      }
      
      // Special handling for enterprise plan
      if (selectedPlan === 'enterprise') {
        window.location.href = "https://cal.com/annieeser/30min";
        return;
      }
      
      // If we don't have an authToken from URL, check if user is logged in
      let userAuthToken = authToken;
      
      if (!userAuthToken) {
        const { data: session } = await supabase.auth.getSession();
        if (!session.session) {
          // If not logged in, redirect to auth page with the current URL as return path
          toast({
            title: "Authentication required",
            description: "Please sign in to subscribe to a plan.",
            variant: "destructive",
          });
          navigate('/auth?return_url=' + encodeURIComponent(window.location.href));
          return;
        }
      }
      
      // Get the stripe price ID based on the selected plan and billing cycle
      const priceId = plan.stripe_price_id[billingCycle];
      
      if (!priceId) {
        throw new Error("Invalid price ID for the selected plan and billing cycle");
      }
      
      toast({
        title: "Subscription in progress",
        description: `Redirecting to checkout for ${plan.name} (${billingCycle}) plan.`,
      });
      
      // Create a checkout session using the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          priceId,
          billingCycle,
          planName: selectedPlan,
          userId: (await supabase.auth.getUser()).data.user?.id
        }
      });
      
      if (error) throw error;
      
      if (data && data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error("Failed to create checkout session");
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
