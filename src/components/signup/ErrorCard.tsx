
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home, ArrowLeft, WifiOff, Shield } from "lucide-react";
import useMobile from "@/hooks/useMobile";
import { safeLog } from "@/utils/environmentUtils";

interface ErrorCardProps {
  error: string;
  onRetry?: () => void;
  connectionAttempts?: number;
}

const ErrorCard: React.FC<ErrorCardProps> = ({ error, onRetry, connectionAttempts = 0 }) => {
  const navigate = useNavigate();
  const isMobile = useMobile();
  
  // Determine error type for better user messaging
  const isNetworkError = error.toLowerCase().includes('connection') || 
                         error.toLowerCase().includes('timeout') ||
                         error.toLowerCase().includes('network') ||
                         error.toLowerCase().includes('unavailable');
                         
  const isSecurityError = error.toLowerCase().includes('security') ||
                         error.toLowerCase().includes('invalid') ||
                         error.toLowerCase().includes('url') ||
                         error.toLowerCase().includes('parameter');
  
  const handleRetry = () => {
    safeLog('User initiated retry from error card');
    if (onRetry) {
      onRetry();
    }
  };
  
  const handleGoBack = () => {
    safeLog('User navigating back from error card');
    window.history.back();
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0b0f14] p-4">
      <Card className="w-full max-w-md border-gray-800 bg-[#131920]">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            {isNetworkError ? (
              <WifiOff className="h-12 w-12 text-amber-500" />
            ) : isSecurityError ? (
              <Shield className="h-12 w-12 text-red-500" />
            ) : (
              <AlertTriangle className="h-12 w-12 text-amber-500" />
            )}
          </div>
          <CardTitle className="text-xl sm:text-2xl font-bold text-red-500 text-center">
            {isNetworkError ? "Connection Error" : isSecurityError ? "Security Error" : "Error"}
          </CardTitle>
          <CardDescription className="text-gray-400 text-center">
            {isNetworkError ? 
              "We're having trouble connecting to our subscription service" : 
              isSecurityError ?
              "We detected an issue with the request parameters" :
              "An unexpected error occurred"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <p className="text-gray-400 text-center text-sm sm:text-base">
              {error}
            </p>
            
            {connectionAttempts > 1 && (
              <p className="text-amber-400/80 text-center text-xs">
                We've tried connecting {connectionAttempts} {connectionAttempts === 1 ? 'time' : 'times'} without success.
                {connectionAttempts >= 3 && " The service might be temporarily down or experiencing high traffic."}
              </p>
            )}
            
            {isNetworkError && (
              <div className="bg-blue-900/20 rounded-md p-3 text-xs text-gray-300 w-full">
                <p className="font-medium mb-1">Connection Troubleshooting:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Replit services might be waking up from idle state</li>
                  <li>The service might be experiencing high traffic</li>
                  <li>There could be temporary network issues</li>
                </ul>
              </div>
            )}
            
            <div className={`flex ${isMobile ? 'flex-col w-full' : 'flex-row'} gap-3`}>
              {onRetry && (
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 w-full flex items-center justify-center"
                  onClick={handleRetry}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              )}
              <Button 
                variant="outline"
                className="w-full flex items-center justify-center"
                onClick={handleGoBack}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
              <Button 
                className="bg-gray-600 hover:bg-gray-700 w-full flex items-center justify-center"
                onClick={() => navigate('/')}
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-center pt-0">
          <p className="text-xs text-gray-500 text-center">
            {isNetworkError 
              ? "Replit services may take a moment to start up if they've been idle. Your patience is appreciated."
              : "If this issue persists, please try again later or contact support."}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ErrorCard;
