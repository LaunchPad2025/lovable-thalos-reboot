
import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

const IntegrationAlerts = () => {
  return (
    <>
      <Alert className="bg-blue-500/10 border-blue-500/20 mt-6 mb-6">
        <InfoIcon className="h-5 w-5 text-blue-500" />
        <AlertDescription className="text-blue-100">
          <strong>Important:</strong> Users do NOT need to create a Thalos account before subscribing. The API handles account creation automatically during checkout.
        </AlertDescription>
      </Alert>

      <Alert className="bg-blue-500/10 border-blue-500/20 mt-6">
        <InfoIcon className="h-5 w-5 text-blue-500" />
        <AlertDescription className="text-blue-100">
          The Enterprise plan links redirect to a contact form instead of direct checkout, allowing for custom pricing and feature discussions.
        </AlertDescription>
      </Alert>
    </>
  );
};

export default IntegrationAlerts;
