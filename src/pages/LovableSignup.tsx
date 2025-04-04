
import React from "react";
import { useSignupFlow } from "@/hooks/useSignupFlow";
import LoadingCard from "@/components/signup/LoadingCard";
import ErrorCard from "@/components/signup/ErrorCard";
import DefaultCard from "@/components/signup/DefaultCard";

export default function LovableSignup() {
  const { processingState, error, selectedPlan, retryConnection } = useSignupFlow();

  // Show loading state while processing
  if ((processingState === 'validating' || processingState === 'redirecting') && !error) {
    return <LoadingCard processingState={processingState} selectedPlan={selectedPlan} />;
  }

  // Show error state if there's an error
  if (error || processingState === 'error') {
    return <ErrorCard error={error || "Unexpected error occurred"} onRetry={retryConnection} />;
  }

  // Default view (should rarely be shown as user will be redirected)
  return <DefaultCard selectedPlan={selectedPlan} />;
}
