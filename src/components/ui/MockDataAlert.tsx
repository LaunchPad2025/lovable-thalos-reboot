
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

interface MockDataAlertProps {
  featureName: string;
}

const MockDataAlert: React.FC<MockDataAlertProps> = ({ featureName }) => {
  return (
    <Alert className="mb-6 border-blue-500/20 bg-blue-500/5">
      <Info className="h-4 w-4 text-blue-500" />
      <AlertTitle className="text-blue-500">Simulation Mode</AlertTitle>
      <AlertDescription>
        The {featureName} feature is currently in simulation mode and displays mock data. 
        This is a preview of functionality that will be available in a future release.
      </AlertDescription>
    </Alert>
  );
};

export default MockDataAlert;
