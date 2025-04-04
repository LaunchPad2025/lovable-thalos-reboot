
import { useState, useEffect, useCallback } from "react";
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
  const [isRedirecting, setIsRedirecting] = useState(false);
  
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
  const retryConnection = useCallback(() => {
    console.log("Retrying connection, attempt:", connectionAttempts + 1);
    setError(null);
    setProcessingState('validating');
    setConnectionAttempts(prev => prev + 1);
    setIsRedirecting(false);
    
    // Show toast when retrying
    toast({
      title: "Retrying connection",
      description: "Attempting to reconnect to subscription service...",
    });
  }, [connectionAttempts, toast]);
  
  // Handle the signup and subscription process
  useEffect(() => {
    if (processingState !== 'validating' || isRedirecting) return;
    
    const processSignupFlow = async () => {
      try {
        console.log("Processing signup flow, plan:", planId, "attempt:", connectionAttempts);
        
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
        setIsRedirecting(true);
          
        // If enterprise plan, redirect to contact page
        if (planId === 'enterprise') {
          window.location.href = "https://cal.com/annieeser/30min";
          return;
        }
        
        // Build the subscription URL with all parameters
        const subscriptionUrl = `https://thalostech.replit.app/api/subscribe?planId=${planId}_monthly${email ? `&email=${encodeURIComponent(email)}` : ''}${returnUrl ? `&return_url=${encodeURIComponent(returnUrl)}` : ''}`;
        
        // Show the redirect toast
        toast({
          title: "Redirecting to subscription service",
          description: `Setting up ${selectedPlan.name} plan...`,
        });
        
        // Setup timeout for detecting connection issues - now with a longer timeout for Replit
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Connection timed out')), 20000); // Increased timeout for Replit
        });
        
        // Add a small delay to ensure the user sees the loading state
        await Promise.race([
          new Promise(resolve => setTimeout(resolve, 300)),
          timeoutPromise
        ]);
        
        // Log the redirect URL for debugging
        console.log("Redirecting to:", subscriptionUrl);
        
        // Redirect to subscription URL
        window.location.href = subscriptionUrl;
        
      } catch (err) {
        console.error('Error processing signup flow:', err);
        
        const errorMessage = connectionAttempts >= 2 
          ? 'Multiple connection attempts failed. The subscription service may be temporarily unavailable. Please try again later.'
          : 'Connection issue detected. The subscription service may be temporarily unavailable.';
          
        setError(errorMessage);
        setProcessingState('error');
        setIsRedirecting(false);
        
        toast({
          title: "Connection Error",
          description: "Failed to connect to subscription service. Please try again.",
          variant: "destructive",
        });
      }
    };
    
    processSignupFlow();
  }, [planId, returnUrl, isValidPlan, isValidReturnUrl, processingState, email, toast, connectionAttempts, selectedPlan.name, isRedirecting]);

  return {
    processingState,
    error,
    selectedPlan,
    retryConnection,
    connectionAttempts
  };
}
