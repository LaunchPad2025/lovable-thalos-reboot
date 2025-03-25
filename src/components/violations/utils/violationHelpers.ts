
/**
 * Returns the appropriate CSS class for a violation severity
 */
export const getSeverityClass = (severity: string): string => {
  switch (severity) {
    case 'low': return 'bg-blue-100 text-blue-800';
    case 'medium': return 'bg-blue-500 text-white';
    case 'high': return 'bg-orange-500 text-white';
    case 'critical': return 'bg-red-500 text-white';
    default: return 'bg-gray-100 text-gray-800';
  }
};

// Added for TestResult type to support location property
export interface TestResult {
  id: string;
  violation: string;
  confidence: number;
  location: string;
  severity: string;
  description?: string;
  regulation?: string;
}

// Helper function to get the severity class for badges
export const getSeverityBadgeClass = (severity: string): string => {
  switch (severity) {
    case 'low': return 'bg-blue-900/50 text-blue-300 border border-blue-800';
    case 'medium': return 'bg-yellow-900/50 text-yellow-300 border border-yellow-800';
    case 'high': return 'bg-orange-900/50 text-orange-300 border border-orange-800';
    case 'critical': return 'bg-red-900/50 text-red-300 border border-red-800';
    default: return 'bg-gray-900/50 text-gray-300 border border-gray-800';
  }
};
