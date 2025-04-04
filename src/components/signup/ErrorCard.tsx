
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ErrorCardProps {
  error: string;
  onRetry?: () => void;
}

const ErrorCard: React.FC<ErrorCardProps> = ({ error, onRetry }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0b0f14]">
      <Card className="w-full max-w-md border-gray-800 bg-[#131920]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-red-500 text-center">
            Connection Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <p className="text-gray-400 text-center">{error}</p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full justify-center">
              {onRetry && (
                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={onRetry}
                >
                  Try Again
                </Button>
              )}
              <Button 
                variant="outline"
                onClick={() => window.history.back()}
              >
                Go Back
              </Button>
              <Button 
                className="bg-gray-600 hover:bg-gray-700"
                onClick={() => navigate('/')}
              >
                Return Home
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorCard;
