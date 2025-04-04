
/**
 * Validates if a return URL is from an allowed domain
 * @param url The URL to validate
 * @returns Boolean indicating if the URL is valid
 */
export const validateReturnUrl = (url: string | null): boolean => {
  if (!url) return false; // No URL should be invalid by default
  
  try {
    // Ensure URL is properly formatted by creating a URL object
    // This will throw if the URL is invalid
    const parsedUrl = new URL(url);
    
    // Check protocol - only allow http and https
    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      console.warn('Invalid protocol:', parsedUrl.protocol);
      return false;
    }
    
    const allowedDomains = [
      'localhost',
      'thalos-safety.com',
      'lovable-website.com',
      'thalostech.io',
      'thalostech.replit.app'
    ];
    
    // Check if the hostname is a direct match or a subdomain of an allowed domain
    const isDomainAllowed = allowedDomains.some(domain => 
      parsedUrl.hostname === domain || 
      parsedUrl.hostname.endsWith(`.${domain}`)
    );
    
    if (!isDomainAllowed) {
      console.warn('Domain not in allowed list:', parsedUrl.hostname);
    }
    
    return isDomainAllowed;
  } catch (e) {
    console.error('URL validation error:', e);
    return false;
  }
};
