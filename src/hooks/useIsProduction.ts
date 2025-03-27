
/**
 * A hook to detect if the app is running on a production domain
 */
export function useIsProduction() {
  const hostname = window.location.hostname;
  
  // Check if we're on a production domain
  const isProduction = 
    hostname === 'thalos.tech' || 
    hostname === 'www.thalos.tech' ||
    hostname.endsWith('.thalos.tech');
    
  return isProduction;
}

export default useIsProduction;
