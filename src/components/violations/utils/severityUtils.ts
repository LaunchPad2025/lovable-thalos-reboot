
/**
 * Returns the appropriate CSS class for a violation severity level badge
 */
export const getSeverityBadgeClass = (severity: string): string => {
  switch (severity.toLowerCase()) {
    case 'low':
      return 'bg-blue-100 text-blue-800';
    case 'medium':
      return 'bg-blue-500 text-white';
    case 'high':
      return 'bg-orange-500 text-white';
    case 'critical':
      return 'bg-red-500 text-white';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
