
import React, { useEffect, useState } from "react";
import { Loader2, Check, WifiOff, WifiHigh, Clock } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { PlanData } from "@/data/subscriptionPlans";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useMobile from "@/hooks/useMobile";

interface LoadingCardProps {
  processingState: 'validating' | 'redirecting';
  selectedPlan: PlanData;
  connectionAttempts?: number;
}

const LoadingCard: React.FC<LoadingCardProps> = ({ 
  processingState, 
  selectedPlan, 
  connectionAttempts = 0 
}) => {
  const navigate = useNavigate();
  const isMobile = useMobile();
  const [loadingTime, setLoadingTime] = useState(0);
  const [showNetworkHelp, setShowNetworkHelp] = useState(false);
  const [showTimeout, setShowTimeout] = useState(false);

  // Count loading time to show appropriate feedback
  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingTime(prev => {
        const newTime = prev + 1;
        if (newTime >= 8 && !showNetworkHelp) {
          setShowNetworkHelp(true);
        }
        if (newTime >= 20 && !showTimeout) {
          setShowTimeout(true);
        }
        return newTime;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [showNetworkHelp, showTimeout]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0b0f14] p-4">
      <Card className="w-full max-w-md border-gray-800 bg-[#131920]">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl font-bold text-white text-center">
            {processingState === 'validating' && "Validating your request..."}
            {processingState === 'redirecting' && "Setting up your subscription..."}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              {showTimeout && loadingTime >= 30 ? (
                <Clock className="h-12 w-12 text-amber-500 animate-pulse" />
              ) : (
                <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
              )}
              {processingState === 'redirecting' && (
                <div className="absolute bottom-0 right-0">
                  {loadingTime < 8 ? (
                    <WifiHigh className="h-5 w-5 text-green-500" />
                  ) : (
                    <WifiOff className="h-5 w-5 text-amber-500 animate-pulse" />
                  )}
                </div>
              )}
            </div>
            
            <p className="text-gray-400 text-center text-sm sm:text-base">
              {processingState === 'validating' && "We're validating your request parameters..."}
              {processingState === 'redirecting' && "We're setting up your subscription to the " + selectedPlan.name + " plan..."}
            </p>
            
            {connectionAttempts > 1 && (
              <p className="text-blue-400 text-center text-xs">
                Connection attempt: {connectionAttempts}
              </p>
            )}
            
            {showNetworkHelp && (
              <div className={`mt-4 bg-blue-900/20 p-3 rounded-md text-xs sm:text-sm text-gray-300 ${isMobile ? 'w-full' : 'max-w-xs mx-auto'}`}>
                <p className="font-medium mb-1">Taking longer than expected?</p>
                <p>This might be due to Replit wake-up time or network connectivity. Please wait a moment...</p>
                {showTimeout && (
                  <p className="mt-2 text-amber-400">
                    The connection is taking unusually long. You may want to try again in a moment.
                  </p>
                )}
              </div>
            )}
          </div>
        </CardContent>
        {(showNetworkHelp || showTimeout) && (
          <CardFooter className="flex justify-center pt-0">
            <div className={`flex ${isMobile ? 'flex-col w-full' : 'flex-row'} gap-2`}>
              <Button 
                variant="outline" 
                className="text-xs"
                onClick={() => window.location.reload()}
              >
                Retry
              </Button>
              <Button 
                variant="outline" 
                className="text-xs"
                onClick={() => navigate('/')}
              >
                Return Home
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default LoadingCard;
