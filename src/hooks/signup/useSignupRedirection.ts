
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
    
    // For all plans, redirect to the booking page
    window.open("https://cal.com/annieeser/30min", "_blank", "noopener");
    
    // Show the redirect toast
    toast({
      title: "Opening scheduling page",
      description: "You're being redirected to our calendar booking system...",
    });
    
    return;
  };
  
  return {
    isRedirecting,
    setIsRedirecting,
    redirectToSignup
  };
}
