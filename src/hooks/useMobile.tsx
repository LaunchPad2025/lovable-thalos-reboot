
import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Set initial state
    const media = window.matchMedia(query);
    setMatches(media.matches);
    
    // Define callback for media query change
    const listener = () => setMatches(media.matches);
    
    // Add event listener
    media.addEventListener('change', listener);
    
    // Clean up
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

export const useMobile = () => {
  return useMediaQuery('(max-width: 768px)');
};

export const useTablet = () => {
  return useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
};

export const useDesktop = () => {
  return useMediaQuery('(min-width: 1025px)');
};

export default useMobile;
