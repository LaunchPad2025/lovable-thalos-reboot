
/**
 * Validates if a return URL is from an allowed domain
 * @param url The URL to validate
 * @returns Boolean indicating if the URL is valid
 */
export const validateReturnUrl = (url: string | null): boolean => {
  if (!url) return false; // No URL should be invalid by default
  
  try {
    // Check for basic sanity - if it looks like a URL
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      console.warn('Invalid URL protocol, must start with http:// or https://', url);
      return false;
    }
    
    // Ensure URL is properly formatted by creating a URL object
    // This will throw if the URL is invalid
    const parsedUrl = new URL(url);
    
    // Check protocol - only allow http and https
    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      console.warn('Invalid protocol:', parsedUrl.protocol);
      return false;
    }
    
    // Check for localhost ports and development scenarios
    if (parsedUrl.hostname === 'localhost' || parsedUrl.hostname === '127.0.0.1') {
      return true;
    }
    
    const allowedDomains = [
      'localhost',
      'thalos-safety.com',
      'lovable-website.com',
      'thalostech.io',
      'thalostech.replit.app',
      'replit.app', // Allow all replit subdomains
      'repl.co',    // Allow all replit.co domains
      'repl.run',   // Allow all repl.run domains
      'replit.dev', // Add replit.dev domains
      'lovable.app',
      'lovableproject.com' // Allow Lovable preview domains
    ];
    
    // Check if the hostname is a direct match or a subdomain of an allowed domain
    const isDomainAllowed = allowedDomains.some(domain => {
      // Direct match
      if (parsedUrl.hostname === domain) return true;
      
      // Check for subdomains
      if (parsedUrl.hostname.endsWith(`.${domain}`)) return true;
      
      return false;
    });
    
    if (!isDomainAllowed) {
      console.warn('Domain not in allowed list:', parsedUrl.hostname);
    }
    
    return isDomainAllowed;
  } catch (e) {
    console.error('URL validation error:', e);
    return false;
  }
};

/**
 * Safely builds a URL with query parameters
 * @param baseUrl The base URL
 * @param params Object containing query parameters
 * @returns Properly formatted URL string
 */
export const buildSafeUrl = (baseUrl: string, params: Record<string, string>): string => {
  try {
    // Validate base URL
    const url = new URL(baseUrl);
    
    // Add query parameters
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        url.searchParams.append(key, value);
      }
    });
    
    return url.toString();
  } catch (e) {
    console.error('Error building URL:', e);
    // Return the base URL as fallback
    return baseUrl;
  }
};

/**
 * Checks if the current environment is running on a mobile device
 * @returns Boolean indicating if the current device is mobile
 */
export const isMobileDevice = (): boolean => {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  
  // Regular expressions for mobile devices
  const mobileRegex = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i
  ];
  
  return mobileRegex.some(regex => userAgent.match(regex));
};

/**
 * Gets a more detailed error message based on connection issues
 * @param attempt The connection attempt number
 * @returns A user-friendly error message
 */
export const getConnectionErrorMessage = (attempt: number): string => {
  if (attempt >= 3) {
    return 'Multiple connection attempts failed. The subscription service may be temporarily unavailable or experiencing high traffic. Please try again later.';
  } else if (attempt >= 1) {
    return 'Connection issue detected. Replit services may be starting up from an idle state. Please try again.';
  } 
  return 'Unable to connect to the subscription service. This might be temporary.';
};
