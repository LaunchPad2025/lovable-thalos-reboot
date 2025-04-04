
import React from "react";
import { Loader2 } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { PlanData } from "@/data/subscriptionPlans";

interface LoadingCardProps {
  processingState: 'validating' | 'redirecting';
  selectedPlan: PlanData;
}

const LoadingCard: React.FC<LoadingCardProps> = ({ processingState, selectedPlan }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0b0f14]">
      <Card className="w-full max-w-md border-gray-800 bg-[#131920]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white text-center">
            {processingState === 'validating' && "Validating your request..."}
            {processingState === 'redirecting' && "Setting up your subscription..."}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
            <p className="text-gray-400 text-center">
              {processingState === 'validating' && "We're validating your request parameters..."}
              {processingState === 'redirecting' && "We're setting up your subscription to the " + selectedPlan.name + " plan..."}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadingCard;
