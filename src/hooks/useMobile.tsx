
import { useMediaQuery } from '@/hooks/use-mobile';

export const useMobile = () => {
  return useMediaQuery('(max-width: 768px)');
};

export default useMobile;
