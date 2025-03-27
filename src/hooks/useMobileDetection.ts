
import { useEffect, useState } from 'react';

export function useMobileDetection() {
  const [isMobileApp, setIsMobileApp] = useState<boolean>(false);
  
  useEffect(() => {
    // Check if running in Capacitor (mobile app)
    const checkCapacitor = () => {
      // @ts-ignore - Capacitor adds this object to window
      const isCapacitor = !!(window.Capacitor?.isPluginAvailable);
      setIsMobileApp(isCapacitor);
    };
    
    checkCapacitor();
    
    // Add listener for platform ready event
    document.addEventListener('deviceready', () => {
      checkCapacitor();
    });
    
    return () => {
      document.removeEventListener('deviceready', checkCapacitor);
    };
  }, []);
  
  return { isMobileApp };
}
