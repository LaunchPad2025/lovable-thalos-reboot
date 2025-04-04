
/**
 * Validates if a return URL is from an allowed domain
 * @param url The URL to validate
 * @returns Boolean indicating if the URL is valid
 */
export const validateReturnUrl = (url: string | null): boolean => {
  if (!url) return false; // No URL should be invalid by default
  
  // Ensure URL is properly formatted
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return false;
  }
  
  const allowedDomains = [
    'localhost',
    'thalos-safety.com',
    'lovable-website.com',
    'thalostech.io'
  ];
  
  try {
    const parsedUrl = new URL(url);
    // Check if the hostname is a direct match or a subdomain of an allowed domain
    return allowedDomains.some(domain => 
      parsedUrl.hostname === domain || 
      parsedUrl.hostname.endsWith(`.${domain}`)
    );
  } catch (e) {
    console.error('URL validation error:', e);
    return false;
  }
};
