
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface MockDataAlertProps {
  featureName: string;
}

const MockDataAlert: React.FC<MockDataAlertProps> = ({ featureName }) => {
  return (
    <Alert className="mb-6 border-blue-500/20 bg-blue-500/5">
      <div className="flex items-center">
        <Info className="h-4 w-4 text-blue-500 mr-2" />
        <AlertTitle className="text-blue-500 flex items-center">
          Simulation Mode
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="info" className="ml-2 text-xs">Simulation Only</Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Simulation Only - Coming Soon</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </AlertTitle>
      </div>
      <AlertDescription>
        The {featureName} feature is currently in simulation mode and displays mock data. 
        This is a preview of functionality that will be available in a future release.
      </AlertDescription>
    </Alert>
  );
};

export default MockDataAlert;
