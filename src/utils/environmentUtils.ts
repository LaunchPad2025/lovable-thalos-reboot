
/**
 * Utility functions for environment-specific behaviors
 */

/**
 * Check if the application is running in production mode
 * This checks both the deployment environment and domain
 */
export const isProduction = (): boolean => {
  const hostname = window.location.hostname;
  
  // Production domains
  const productionDomains = [
    'thalos.tech',
    'www.thalos.tech'
  ];
  
  // Check if we're on a production domain
  const isProductionDomain = 
    productionDomains.includes(hostname) || 
    hostname.endsWith('.thalos.tech');
    
  // Also check for production environment
  const isProductionEnv = import.meta.env.PROD;
  
  return isProductionDomain || isProductionEnv;
};

/**
 * Safe console logging that doesn't log in production
 */
export const safeLog = (...args: any[]): void => {
  if (!isProduction()) {
    console.log(...args);
  }
};
