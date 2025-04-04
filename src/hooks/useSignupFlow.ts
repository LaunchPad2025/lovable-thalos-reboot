
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { plans, PlanData } from "@/data/subscriptionPlans";
import { validateReturnUrl } from "@/utils/urlValidation";

export function useSignupFlow() {
  const location = useLocation();
  const { toast } = useToast();
  
  const [processingState, setProcessingState] = useState<'validating' | 'redirecting' | 'done' | 'error'>('validating');
  const [error, setError] = useState<string | null>(null);
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  
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
  const isValidReturnUrl = returnUrl ? validateReturnUrl(returnUrl) : true;
  
  // Function to retry connection
  const retryConnection = () => {
    setError(null);
    setProcessingState('validating');
    setConnectionAttempts(prev => prev + 1);
  };
  
  // Handle the signup and subscription process
  useEffect(() => {
    const processSignupFlow = async () => {
      try {
        // Validate parameters first
        if (!isValidPlan) {
          setError(`Invalid plan: '${planId}'. Please use one of: basic, pro, premium, enterprise.`);
          setProcessingState('error');
          return;
        }
        
        if (returnUrl && !isValidReturnUrl) {
          setError(`Invalid return URL. For security reasons, only approved domains are allowed.`);
          setProcessingState('error');
          return;
        }
        
        setProcessingState('redirecting');
          
        // If enterprise plan, redirect to contact page
        if (planId === 'enterprise') {
          window.location.href = "https://cal.com/annieeser/30min";
          return;
        }
        
        // Redirect to the Replit subscription URL with plan ID
        const subscriptionUrl = `https://thalostech.replit.app/api/subscribe?planId=${planId}_monthly${email ? `&email=${encodeURIComponent(email)}` : ''}${returnUrl ? `&return_url=${encodeURIComponent(returnUrl)}` : ''}`;
        
        // Setup timeout for detecting connection issues
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Connection timed out')), 15000);
        });
        
        // Add a small delay to ensure the user sees the loading state
        await Promise.race([
          new Promise(resolve => setTimeout(resolve, 300)),
          timeoutPromise
        ]);
        
        // Redirect to subscription URL
        window.location.href = subscriptionUrl;
        
      } catch (err) {
        console.error('Error processing signup flow:', err);
        setError('Connection issue detected. The subscription service may be temporarily unavailable.');
        setProcessingState('error');
        toast({
          title: "Connection Error",
          description: "Failed to connect to subscription service. Please try again.",
          variant: "destructive",
        });
      }
    };
    
    if (processingState === 'validating') {
      processSignupFlow();
    }
  }, [planId, returnUrl, isValidPlan, isValidReturnUrl, processingState, email, toast, connectionAttempts]);

  return {
    processingState,
    error,
    selectedPlan,
    retryConnection
  };
}
