
import React from "react";
import { useSignupFlow } from "@/hooks/useSignupFlow";
import LoadingCard from "@/components/signup/LoadingCard";
import ErrorCard from "@/components/signup/ErrorCard";
import DefaultCard from "@/components/signup/DefaultCard";

export default function LovableSignup() {
  const { processingState, error, selectedPlan } = useSignupFlow();

  // Show loading state while processing
  if (processingState !== 'done' && !error) {
    return <LoadingCard processingState={processingState} selectedPlan={selectedPlan} />;
  }

  // Show error state if there's an error
  if (error) {
    return <ErrorCard error={error} />;
  }

  // Default view (should rarely be shown as user will be redirected)
  return <DefaultCard selectedPlan={selectedPlan} />;
}
