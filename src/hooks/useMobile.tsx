
import { useEffect, useState } from 'react';
import { useMobileDetection } from './useMobileDetection';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

export const useMobile = () => {
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  const { isMobileApp } = useMobileDetection();
  
  // Consider the app as in mobile mode if either it's on a small screen
  // or running in the Capacitor container
  return isSmallScreen || isMobileApp;
};

export default useMobile;
