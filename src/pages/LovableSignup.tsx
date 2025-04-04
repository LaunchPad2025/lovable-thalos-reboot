
import React, { useEffect, useState } from "react";
import { useSignupFlow } from "@/hooks/useSignupFlow";
import LoadingCard from "@/components/signup/LoadingCard";
import ErrorCard from "@/components/signup/ErrorCard";
import DefaultCard from "@/components/signup/DefaultCard";
import { useToast } from "@/hooks/use-toast";
import { safeLog } from "@/utils/environmentUtils";

export default function LovableSignup() {
  const { processingState, error, selectedPlan, retryConnection, connectionAttempts } = useSignupFlow();
  const { toast } = useToast();
  const [hasShownInitialToast, setHasShownInitialToast] = useState(false);
  
  // Display connection attempt info on first load
  useEffect(() => {
    if (!hasShownInitialToast) {
      toast({
        title: "Connecting to subscription service",
        description: "This might take a moment if the service is waking up...",
      });
      setHasShownInitialToast(true);
    }
  }, [toast, hasShownInitialToast]);
  
  // Display connection attempt info
  useEffect(() => {
    if (connectionAttempts > 0) {
      const description = connectionAttempts === 1
        ? "Trying to connect to subscription service..."
        : `Retry attempt ${connectionAttempts}: Connecting to subscription service...`;
        
      toast({
        title: `Connection attempt ${connectionAttempts}`,
        description: description,
      });
      
      safeLog(`Subscription connection attempt: ${connectionAttempts}`);
    }
  }, [connectionAttempts, toast]);

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
  return <DefaultCard selectedPlan={selectedPlan} />;
}
