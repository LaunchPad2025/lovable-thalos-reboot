
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, HardHat } from "lucide-react";

const DefaultCard: React.FC = () => {
  const navigate = useNavigate();
  
  const handleStartFree = () => {
    window.location.href = "https://thalostech.replit.app/";
  };
  
  const handleTalkToSales = () => {
    window.open("https://cal.com/annieeser/30min", "_blank", "noopener");
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0b0f14]">
      <Card className="w-full max-w-md border-gray-800 bg-[#131920]">
        <CardHeader className="pb-4">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-600/20 rounded-full">
              <HardHat className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-white text-center">
            Thalos Safety Compliance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <p className="text-gray-400 text-center">
              Ready to get started with Thalos? Start with 15 free analyses or talk to our sales team.
            </p>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 flex items-center w-full justify-center"
              onClick={handleStartFree}
              size="lg"
            >
              Start Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              className="text-gray-300 hover:text-white w-full border-gray-700"
              onClick={handleTalkToSales}
            >
              Talk to Sales
            </Button>
            <Button 
              variant="ghost" 
              className="text-gray-300 hover:text-white"
              onClick={() => navigate('/')}
            >
              Go to Homepage
            </Button>
            <p className="text-xs text-gray-500 text-center max-w-xs">
              No credit card required. Start with 15 free AI-powered safety analyses.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DefaultCard;
