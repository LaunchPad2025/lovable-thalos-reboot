
import { useMediaQuery } from '@/hooks/use-mobile';

// Fix the import and usage
export const useMobile = () => {
  return useMediaQuery('(max-width: 768px)');
};

export default useMobile;
