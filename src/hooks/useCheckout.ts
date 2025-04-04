
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
  const returnUrl = searchParams.get('return_url');
  
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
      
      // Format the planId according to the new requirements
      const planId = `${selectedPlan}_${billingCycle}`;
      
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
      
      toast({
        title: "Subscription in progress",
        description: `Redirecting to checkout for ${plan.name} (${billingCycle}) plan.`,
      });
      
      // Redirect to the new subscription URL
      window.location.href = `https://thalostech.replit.app/api/subscribe?planId=${planId}`;
      
    } catch (error) {
      console.error('Error during subscription process:', error);
      toast({
        title: "Subscription failed",
        description: error.message || "An error occurred. Please try again.",
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
