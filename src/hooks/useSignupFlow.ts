
import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { plans } from "@/data/subscriptionPlans";
import { safeLog } from "@/utils/environmentUtils";
import { useSignupValidation } from "./signup/useSignupValidation";
import { useSignupConnection } from "./signup/useSignupConnection";
import { useSignupRedirection } from "./signup/useSignupRedirection";

export function useSignupFlow() {
  const location = useLocation();
  const { toast } = useToast();
  
  // Parse URL parameters
  const searchParams = new URLSearchParams(location.search);
  const planId = searchParams.get('plan') || 'pro';
  const returnUrl = searchParams.get('return_url') || null;
  const email = searchParams.get('email') || '';

  // Component state
  const [processingState, setProcessingState] = useState<'validating' | 'redirecting' | 'done' | 'error'>('validating');
  const [error, setError] = useState<string | null>(null);
  
  // Custom hooks
  const { validateParameters } = useSignupValidation();
  const { 
    connectionAttempts, 
    timerExpired, 
    setupConnectionTimeout, 
    getConnectionErrorMessage, 
    initiateConnectionAttempt 
  } = useSignupConnection();
  const { isRedirecting, setIsRedirecting, redirectToSignup } = useSignupRedirection();
  
  // Track if component is mounted to prevent state updates after unmount
  const isMounted = useRef(true);
  
  // Get plan details
  const selectedPlan = plans.find(p => p.id === planId) || plans[1]; // Default to Pro plan if invalid
  
  // Function to retry connection
  const retryConnection = useCallback(() => {
    safeLog("Retrying connection");
    
    // Don't update state if component is unmounted
    if (!isMounted.current) return;
    
    setError(null);
    setProcessingState('validating');
    setIsRedirecting(false);
    
    initiateConnectionAttempt();
  }, [initiateConnectionAttempt]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  
  // Handle the signup and subscription process
  useEffect(() => {
    if (processingState !== 'validating' || isRedirecting || !isMounted.current) return;
    
    const processSignupFlow = async () => {
      try {
        safeLog("Processing signup flow, plan:", planId, "attempt:", connectionAttempts);
        
        // Validate parameters first
        const validationError = validateParameters(planId, returnUrl);
        if (validationError) {
          if (!isMounted.current) return;
          setError(validationError);
          setProcessingState('error');
          return;
        }
        
        if (!isMounted.current) return;
        setProcessingState('redirecting');
        
        // Setup timeout to detect connection issues
        const cleanupTimeout = setupConnectionTimeout(() => {
          if (isMounted.current) {
            const errorMessage = getConnectionErrorMessage();
            setError(errorMessage);
            setProcessingState('error');
            setIsRedirecting(false);
            
            toast({
              title: "Connection Error",
              description: "Failed to connect to subscription service. Please try again.",
              variant: "destructive",
            });
          }
        });
        
        // Redirect to subscription service
        await redirectToSignup(planId, email, returnUrl, selectedPlan);
        
        return () => cleanupTimeout();
        
      } catch (err) {
        safeLog('Error processing signup flow:', err);
        
        // Don't update state if component is unmounted
        if (!isMounted.current) return;
        
        const errorMessage = getConnectionErrorMessage();
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
  }, [
    planId,
    returnUrl, 
    email, 
    processingState, 
    isRedirecting, 
    connectionAttempts,
    selectedPlan,
    toast,
    validateParameters,
    setupConnectionTimeout,
    getConnectionErrorMessage,
    redirectToSignup
  ]);

  return {
    processingState,
    error,
    selectedPlan,
    retryConnection,
    connectionAttempts,
    timerExpired
  };
}
