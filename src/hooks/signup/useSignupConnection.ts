
import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { safeLog } from "@/utils/environmentUtils";

/**
 * Manages connection retries, timeouts, and error handling for signup flow
 */
export function useSignupConnection() {
  const { toast } = useToast();
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  const [timerExpired, setTimerExpired] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  
  /**
   * Calculate timeout duration based on connection attempts
   * Uses exponential backoff strategy with a maximum cap
   */
  const calculateTimeout = (attempts: number): number => {
    const baseTimeout = 15000; // 15 seconds base
    const maxTimeout = 45000;  // 45 seconds max
    return Math.min(
      baseTimeout * Math.pow(1.5, attempts), 
      maxTimeout
    );
  };
  
  /**
   * Sets up a timeout to detect connection issues
   * @param onTimeout - Callback function to execute when timeout occurs
   * @returns Cleanup function to clear timeout
   */
  const setupConnectionTimeout = (onTimeout: () => void) => {
    // Clear any existing timeout
    clearTimeout(timeoutRef.current as number);
    
    const timeoutMs = calculateTimeout(connectionAttempts);
    safeLog(`Setting connection timeout to ${timeoutMs}ms for attempt ${connectionAttempts}`);
    
    // Set timeout to detect connection issues
    timeoutRef.current = window.setTimeout(() => {
      setTimerExpired(true);
      onTimeout();
    }, timeoutMs);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  };
  
  /**
   * Generates an appropriate error message based on connection attempts
   */
  const getConnectionErrorMessage = (): string => {
    if (connectionAttempts >= 3) {
      return 'Multiple connection attempts failed. The subscription service may be temporarily unavailable. Please try again later.';
    } else if (connectionAttempts >= 1) {
      return 'Connection issue detected. Replit services may be starting up. Please try again.';
    } 
    return 'Unable to connect to the subscription service. This might be temporary.';
  };
  
  /**
   * Initializes a new connection attempt
   */
  const initiateConnectionAttempt = () => {
    const newAttempt = connectionAttempts + 1;
    safeLog("Initiating connection attempt:", newAttempt);
    
    setConnectionAttempts(newAttempt);
    setTimerExpired(false);
    
    // Show toast when retrying
    if (newAttempt > 1) {
      toast({
        title: "Retrying connection",
        description: `Attempting to reconnect to subscription service (attempt ${newAttempt})...`,
      });
    }
    
    return newAttempt;
  };
  
  return {
    connectionAttempts,
    timerExpired,
    setTimerExpired,
    setupConnectionTimeout,
    getConnectionErrorMessage,
    initiateConnectionAttempt
  };
}
