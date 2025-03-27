
import { isProduction as checkProduction } from '@/utils/environmentUtils';

/**
 * A hook to detect if the app is running on a production domain
 */
export function useIsProduction() {
  return checkProduction();
}

export default useIsProduction;
