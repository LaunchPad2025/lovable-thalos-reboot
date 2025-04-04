
import React, { useEffect, useState } from "react";
import { Loader2, Check, WifiOff, WifiHigh } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { PlanData } from "@/data/subscriptionPlans";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface LoadingCardProps {
  processingState: 'validating' | 'redirecting';
  selectedPlan: PlanData;
}

const LoadingCard: React.FC<LoadingCardProps> = ({ processingState, selectedPlan }) => {
  const navigate = useNavigate();
  const [loadingTime, setLoadingTime] = useState(0);
  const [showNetworkHelp, setShowNetworkHelp] = useState(false);

  // Count loading time to show network help after 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingTime(prev => {
        const newTime = prev + 1;
        if (newTime >= 10 && !showNetworkHelp) {
          setShowNetworkHelp(true);
        }
        return newTime;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [showNetworkHelp]);

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
              <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
              {processingState === 'redirecting' && (
                <div className="absolute bottom-0 right-0">
                  {loadingTime < 8 ? (
                    <WifiHigh className="h-5 w-5 text-green-500" />
                  ) : (
                    <WifiOff className="h-5 w-5 text-amber-500" />
                  )}
                </div>
              )}
            </div>
            
            <p className="text-gray-400 text-center text-sm sm:text-base">
              {processingState === 'validating' && "We're validating your request parameters..."}
              {processingState === 'redirecting' && "We're setting up your subscription to the " + selectedPlan.name + " plan..."}
            </p>
            
            {showNetworkHelp && (
              <div className="mt-4 bg-blue-900/20 p-3 rounded-md text-xs sm:text-sm text-gray-300 max-w-xs mx-auto">
                <p className="font-medium mb-1">Taking longer than expected?</p>
                <p>This might be due to Replit wake-up time or network connectivity. Please wait a moment...</p>
              </div>
            )}
          </div>
        </CardContent>
        {showNetworkHelp && (
          <CardFooter className="flex justify-center pt-0">
            <Button 
              variant="outline" 
              className="text-xs mt-2"
              onClick={() => navigate('/')}
            >
              Return Home
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default LoadingCard;
