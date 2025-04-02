
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
      
      // Check if user is logged in (if we don't already have an authToken)
      if (!authToken) {
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
      }
      
      toast({
        title: "Subscription in progress",
        description: `Redirecting to checkout for ${plan.name} (${billingCycle}) plan.`,
      });
      
      // Redirect to the replit app with the appropriate URL parameters including authToken if available
      const checkoutUrl = `https://thalostech.replit.app/subscription?plan=${selectedPlan}&cycle=${billingCycle}${authToken ? `&authToken=${authToken}` : ''}`;
      window.location.href = checkoutUrl;
      
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
