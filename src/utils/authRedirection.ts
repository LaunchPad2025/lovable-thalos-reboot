
/**
 * Utility functions for redirecting users to Replit authentication
 */

/**
 * Redirects the user to the appropriate Replit authentication endpoint
 * @param isSignup Whether to redirect to signup or login
 * @param returnUrl URL to return to after authentication (optional)
 * @param plan Selected subscription plan (optional)
 */
export const redirectToReplitAuth = (isSignup = false, returnUrl?: string, plan?: string) => {
  // Build the Replit URL with appropriate query parameters
  let redirectUrl = "https://thalostech.replit.app/api/auth";
  
  // Add query parameters if provided
  const params = new URLSearchParams();
  
  if (isSignup) {
    params.append("signup", "true");
  }
  
  if (returnUrl) {
    params.append("return_url", returnUrl);
  }
  
  if (plan) {
    params.append("plan", plan);
  }
  
  // Append parameters if any were set
  const queryString = params.toString();
  if (queryString) {
    redirectUrl += `?${queryString}`;
  }
  
  // Redirect to Replit
  window.location.href = redirectUrl;
};

/**
 * Redirects the user to the Replit subscription flow
 * @param planId The subscription plan ID
 * @param email User email (optional)
 * @param returnUrl Return URL after subscription (optional)
 */
export const redirectToReplitSubscription = (planId: string, email?: string, returnUrl?: string) => {
  // Build the subscription URL
  let subscriptionUrl = "https://thalostech.replit.app/api/subscribe";
  
  // Add query parameters
  const params = new URLSearchParams();
  
  // Add plan ID
  params.append("planId", planId);
  
  // Add email if provided
  if (email) {
    params.append("email", email);
  }
  
  // Add return URL if provided
  if (returnUrl) {
    params.append("returnUrl", encodeURIComponent(returnUrl));
  }
  
  // Append parameters
  subscriptionUrl += `?${params.toString()}`;
  
  // Redirect to Replit subscription
  window.location.href = subscriptionUrl;
};
