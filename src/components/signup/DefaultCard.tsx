
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const DefaultCard: React.FC = () => {
  const navigate = useNavigate();
  
  const handleScheduleCall = () => {
    window.open("https://cal.com/annieeser/30min", "_blank", "noopener");
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
              Ready to get started with Thalos? Book a setup call with our team.
            </p>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 flex items-center"
              onClick={handleScheduleCall}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Book a 30-Minute Setup Call
            </Button>
            <Button 
              variant="outline" 
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
