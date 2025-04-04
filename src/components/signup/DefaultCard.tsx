
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const DefaultCard: React.FC = () => {
  const navigate = useNavigate();
  
  const handleStartFree = () => {
    window.open("https://thalostech.replit.app/", "_blank", "noopener");
  };
  
  const handleTalkToSales = () => {
    window.open("https://cal.com/annie-eser/thalos", "_blank", "noopener");
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0b0f14]">
      <Card className="w-full max-w-md border-gray-800 bg-[#131920]">
        <CardHeader>
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
            >
              Start Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              className="text-gray-300 hover:text-white w-full"
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DefaultCard;
