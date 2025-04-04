
/**
 * Validates if a return URL is from an allowed domain
 * @param url The URL to validate
 * @returns Boolean indicating if the URL is valid
 */
export const validateReturnUrl = (url: string | null): boolean => {
  if (!url) return true; // No URL is valid (will use default)
  
  const allowedDomains = [
    'localhost',
    'thalos-safety.com',
    'lovable-website.com',
    'thalostech.io'
  ];
  
  try {
    const parsedUrl = new URL(url);
    return allowedDomains.some(domain => parsedUrl.hostname.includes(domain));
  } catch (e) {
    return false;
  }
};
