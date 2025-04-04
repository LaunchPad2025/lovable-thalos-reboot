
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from "lucide-react";

interface ErrorCardProps {
  error: string;
  onRetry?: () => void;
}

const ErrorCard: React.FC<ErrorCardProps> = ({ error, onRetry }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0b0f14] p-4">
      <Card className="w-full max-w-md border-gray-800 bg-[#131920]">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            <AlertTriangle className="h-12 w-12 text-amber-500" />
          </div>
          <CardTitle className="text-xl sm:text-2xl font-bold text-red-500 text-center">
            Connection Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <p className="text-gray-400 text-center text-sm sm:text-base">
              {error}
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full justify-center">
              {onRetry && (
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto flex items-center justify-center"
                  onClick={onRetry}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              )}
              <Button 
                variant="outline"
                className="w-full sm:w-auto flex items-center justify-center"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
              <Button 
                className="bg-gray-600 hover:bg-gray-700 w-full sm:w-auto flex items-center justify-center"
                onClick={() => navigate('/')}
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </div>
            <p className="text-xs text-gray-500 text-center mt-4">
              If this issue persists, please try again later or contact support.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorCard;
