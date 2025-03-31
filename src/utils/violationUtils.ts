
import { TestResult } from "@/hooks/model-testing/types";

// Helper for ensuring severity is one of the allowed values
export const normalizeSeverity = (severity: string): "high" | "low" | "medium" | "critical" => {
  const allowedSeverities = ["high", "low", "medium", "critical"];
  
  if (allowedSeverities.includes(severity.toLowerCase())) {
    return severity.toLowerCase() as "high" | "low" | "medium" | "critical";
  }
  
  // Default to medium if it's an invalid severity
  return "medium";
};

// Type guard for TestResult
export function isTestResult(obj: any): obj is TestResult {
  return (
    typeof obj === 'object' &&
    obj !== null && 
    'id' in obj &&
    'confidence' in obj &&
    'severity' in obj
  );
}
