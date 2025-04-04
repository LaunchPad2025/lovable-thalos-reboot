
import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { plans, PlanData } from "@/data/subscriptionPlans";
import { validateReturnUrl } from "@/utils/urlValidation";
import { safeLog } from "@/utils/environmentUtils";

export function useSignupFlow() {
  const location = useLocation();
  const { toast } = useToast();
  
  const [processingState, setProcessingState] = useState<'validating' | 'redirecting' | 'done' | 'error'>('validating');
  const [error, setError] = useState<string | null>(null);
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  // Track if component is mounted to prevent state updates after unmount
  const isMounted = useRef(true);
  
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  
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
    const newAttempt = connectionAttempts + 1;
    safeLog("Retrying connection, attempt:", newAttempt);
    
    // Don't update state if component is unmounted
    if (!isMounted.current) return;
    
    setError(null);
    setProcessingState('validating');
    setConnectionAttempts(newAttempt);
    setIsRedirecting(false);
    
    // Show toast when retrying
    toast({
      title: "Retrying connection",
      description: "Attempting to reconnect to subscription service...",
    });
  }, [connectionAttempts, toast]);
  
  // Handle the signup and subscription process
  useEffect(() => {
    if (processingState !== 'validating' || isRedirecting || !isMounted.current) return;
    
    const processSignupFlow = async () => {
      try {
        safeLog("Processing signup flow, plan:", planId, "attempt:", connectionAttempts);
        
        // Validate parameters first
        if (!isValidPlan) {
          if (!isMounted.current) return;
          setError(`Invalid plan: '${planId}'. Please use one of: basic, pro, premium, enterprise.`);
          setProcessingState('error');
          return;
        }
        
        if (returnUrl && !isValidReturnUrl) {
          if (!isMounted.current) return;
          setError(`Invalid return URL. For security reasons, only approved domains are allowed.`);
          setProcessingState('error');
          return;
        }
        
        if (!isMounted.current) return;
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
        if (!isMounted.current) return;
        toast({
          title: "Redirecting to subscription service",
          description: `Setting up ${selectedPlan.name} plan...`,
        });
        
        // Setup timeout for detecting connection issues - adaptive timeout
        // For first attempt set shorter timeout, for retry attempts increase the timeout
        const timeoutMs = connectionAttempts === 0 ? 15000 : 25000;
        
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Connection timed out')), timeoutMs);
        });
        
        // Add a small delay to ensure the user sees the loading state
        await Promise.race([
          new Promise(resolve => setTimeout(resolve, 300)),
          timeoutPromise
        ]);
        
        // Log the redirect URL for debugging
        safeLog("Redirecting to:", subscriptionUrl);
        
        // Redirect to subscription URL
        window.location.href = subscriptionUrl;
        
      } catch (err) {
        safeLog('Error processing signup flow:', err);
        
        // Don't update state if component is unmounted
        if (!isMounted.current) return;
        
        // Customize error message based on connection attempts
        let errorMessage = "";
        if (connectionAttempts >= 3) {
          errorMessage = 'Multiple connection attempts failed. The subscription service may be temporarily unavailable. Please try again later.';
        } else if (connectionAttempts >= 1) {
          errorMessage = 'Connection issue detected. Replit services may be starting up. Please try again.';
        } else {
          errorMessage = 'Unable to connect to the subscription service. This might be temporary.';
        }
          
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
