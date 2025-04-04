
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { plans, PlanData } from "@/data/subscriptionPlans";
import { validateReturnUrl } from "@/utils/urlValidation";

export function useSignupFlow() {
  const location = useLocation();
  const { toast } = useToast();
  
  const [processingState, setProcessingState] = useState<'validating' | 'redirecting' | 'done'>('validating');
  const [error, setError] = useState<string | null>(null);
  
  // Parse URL parameters
  const searchParams = new URLSearchParams(location.search);
  const planId = searchParams.get('plan') || 'pro';
  const returnUrl = searchParams.get('return_url') || null;
  const email = searchParams.get('email') || '';

  // Validate plan parameter
  const validPlans = ['basic', 'pro', 'premium', 'enterprise'];
  const isValidPlan = validPlans.includes(planId);
  
  // Get plan details
  const selectedPlan = plans.find(p => p.id === planId) || plans[1]; // Default to Pro plan if invalid
  
  // Validate return URL
  const isValidReturnUrl = validateReturnUrl(returnUrl);
  
  // Handle the signup and subscription process
  useEffect(() => {
    const processSignupFlow = async () => {
      try {
        // Validate parameters first
        if (!isValidPlan) {
          setError(`Invalid plan: '${planId}'. Please use one of: basic, pro, premium, enterprise.`);
          return;
        }
        
        if (returnUrl && !isValidReturnUrl) {
          setError(`Invalid return URL. For security reasons, only approved domains are allowed.`);
          return;
        }
        
        setProcessingState('redirecting');
          
        // If enterprise plan, redirect to contact page
        if (planId === 'enterprise') {
          window.location.href = "https://cal.com/annieeser/30min";
          return;
        }
        
        // Redirect to the Replit subscription URL with plan ID
        window.location.href = `https://thalostech.replit.app/api/subscribe?planId=${planId}_monthly${email ? `&email=${encodeURIComponent(email)}` : ''}${returnUrl ? `&return_url=${encodeURIComponent(returnUrl)}` : ''}`;
        
      } catch (err) {
        console.error('Error processing signup flow:', err);
        setError('An unexpected error occurred. Please try again.');
        setProcessingState('done');
      }
    };
    
    if (processingState === 'validating') {
      processSignupFlow();
    }
  }, [planId, returnUrl, isValidPlan, isValidReturnUrl, processingState, email]);

  return {
    processingState,
    error,
    selectedPlan,
  };
}
