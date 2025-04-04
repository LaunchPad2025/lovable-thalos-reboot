
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { PlanData } from "@/data/subscriptionPlans";
import { safeLog } from "@/utils/environmentUtils";

/**
 * Manages the redirection process for signup flow
 */
export function useSignupRedirection() {
  const { toast } = useToast();
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  /**
   * Redirects the user to the appropriate signup URL
   * @param planId - The plan ID to sign up for
   * @param email - The email address to pre-fill
   * @param returnUrl - The URL to return to after signup
   * @param selectedPlan - The selected plan object
   */
  const redirectToSignup = async (
    planId: string,
    email: string,
    returnUrl: string | null,
    selectedPlan: PlanData
  ) => {
    safeLog("Redirecting to signup, plan:", planId);
    setIsRedirecting(true);
    
    // If enterprise plan, redirect to contact page
    if (planId === 'enterprise') {
      window.location.href = "https://cal.com/annieeser/30min";
      return;
    }
    
    // Build the subscription URL with all parameters
    const subscriptionUrl = `https://thalostech.replit.app/api/subscribe?planId=${planId}_monthly${
      email ? `&email=${encodeURIComponent(email)}` : ''
    }${returnUrl ? `&return_url=${encodeURIComponent(returnUrl)}` : ''}`;
    
    // Show the redirect toast
    toast({
      title: "Redirecting to subscription service",
      description: `Setting up ${selectedPlan.name} plan...`,
    });
    
    // Add a small delay to ensure the user sees the loading state
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Log the redirect URL for debugging
    safeLog("Redirecting to:", subscriptionUrl);
    
    // Redirect to subscription URL
    window.location.href = subscriptionUrl;
  };
  
  return {
    isRedirecting,
    setIsRedirecting,
    redirectToSignup
  };
}
