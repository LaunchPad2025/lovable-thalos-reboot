
import { validateReturnUrl } from "@/utils/urlValidation";
import { safeLog } from "@/utils/environmentUtils";

/**
 * Validates the plan ID and return URL for the signup flow
 */
export function useSignupValidation() {
  /**
   * Validates the plan parameter
   * @param planId - The plan ID to validate
   * @returns Whether the plan is valid
   */
  const validatePlan = (planId: string): boolean => {
    const validPlans = ['basic', 'pro', 'premium', 'enterprise'];
    return validPlans.includes(planId);
  };
  
  /**
   * Validates parameters for the signup flow
   * @param planId - The plan ID to validate
   * @param returnUrl - The return URL to validate
   * @returns An error message if validation fails, null otherwise
   */
  const validateParameters = (planId: string, returnUrl: string | null): string | null => {
    // Validate plan parameter
    if (!validatePlan(planId)) {
      safeLog("Invalid plan ID:", planId);
      return `Invalid plan: '${planId}'. Please use one of: basic, pro, premium, enterprise.`;
    }
    
    // Validate return URL if provided
    if (returnUrl && !validateReturnUrl(returnUrl)) {
      safeLog("Invalid return URL:", returnUrl);
      return `Invalid return URL. For security reasons, only approved domains are allowed.`;
    }
    
    return null;
  };
  
  return {
    validateParameters,
    validatePlan
  };
}
