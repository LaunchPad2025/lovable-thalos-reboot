
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { plans } from "@/data/subscriptionPlans";
import { safeLog } from "@/utils/environmentUtils";
import LoadingCard from "@/components/signup/LoadingCard";
import ErrorCard from "@/components/signup/ErrorCard";
import DefaultCard from "@/components/signup/DefaultCard";
import { useSignupValidation } from "@/hooks/signup/useSignupValidation";
import { useSignupConnection } from "@/hooks/signup/useSignupConnection";
import { useSignupRedirection } from "@/hooks/signup/useSignupRedirection";

export default function LovableSignup() {
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
  const [hasShownInitialToast, setHasShownInitialToast] = useState(false);
  const [hasShownRetryToast, setHasShownRetryToast] = useState(false);
  
  // Custom hooks
  const { validateParameters } = useSignupValidation();
  const { 
    connectionAttempts, 
    timerExpired, 
    setTimerExpired,
    setupConnectionTimeout, 
    getConnectionErrorMessage, 
    initiateConnectionAttempt 
  } = useSignupConnection();
  const { isRedirecting, setIsRedirecting, redirectToSignup } = useSignupRedirection();
  
  // Track if component is mounted to prevent state updates after unmount
  const isMounted = React.useRef(true);
  
  // Get plan details
  const selectedPlan = plans.find(p => p.id === planId) || plans[1]; // Default to Pro plan if invalid
  
  // Function to retry connection
  const retryConnection = () => {
    safeLog("Retrying connection");
    
    // Don't update state if component is unmounted
    if (!isMounted.current) return;
    
    setError(null);
    setProcessingState('validating');
    setIsRedirecting(false);
    setTimerExpired(false);
    
    initiateConnectionAttempt();
  };
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Display connection attempt info on first load
  useEffect(() => {
    if (!hasShownInitialToast) {
      toast({
        title: "Connecting to subscription service",
        description: "This might take a moment if the service is waking up from idle state...",
        duration: 8000, // Extended duration for better visibility
      });
      setHasShownInitialToast(true);
      safeLog('Initial connection attempt started');
    }
  }, [toast, hasShownInitialToast]);
  
  // Display connection attempt info
  useEffect(() => {
    if (connectionAttempts > 0) {
      if (!hasShownRetryToast || connectionAttempts > 1) {
        const description = connectionAttempts === 1
          ? "Trying to connect to subscription service..."
          : `Retry attempt ${connectionAttempts}: Connecting to subscription service...`;
          
        toast({
          title: `Connection attempt ${connectionAttempts}`,
          description: description,
          duration: 5000,
        });
        
        safeLog(`Subscription connection attempt: ${connectionAttempts}`);
        
        if (!hasShownRetryToast) {
          setHasShownRetryToast(true);
        }
      }
    }
  }, [connectionAttempts, toast, hasShownRetryToast]);
  
  // Show timeout toast
  useEffect(() => {
    if (timerExpired) {
      toast({
        title: "Connection taking longer than expected",
        description: "The subscription service might be waking up or experiencing high traffic. Please be patient or try again.",
        variant: "destructive",
        duration: 10000, // Longer duration for important message
      });
      safeLog('Connection timeout detected');
    }
  }, [timerExpired, toast]);
  
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

  // Show loading state while processing
  if ((processingState === 'validating' || processingState === 'redirecting') && !error) {
    return <LoadingCard processingState={processingState} selectedPlan={selectedPlan} connectionAttempts={connectionAttempts} />;
  }

  // Show error state if there's an error
  if (error || processingState === 'error') {
    return (
      <ErrorCard 
        error={error || "Unexpected error occurred"} 
        onRetry={retryConnection}
        connectionAttempts={connectionAttempts}
      />
    );
  }

  // Default view (should rarely be shown as user will be redirected)
  return <DefaultCard />;
}
