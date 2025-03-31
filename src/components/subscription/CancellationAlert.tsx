
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CancellationAlertProps {
  renewalDate: string;
}

const CancellationAlert = ({ renewalDate }: CancellationAlertProps) => {
  return (
    <Alert className="bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800/30">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Subscription Scheduled for Cancellation</AlertTitle>
      <AlertDescription>
        Your subscription will remain active until {renewalDate}. To continue your service,
        you can reactivate your subscription before that date.
      </AlertDescription>
      <Button
        variant="outline"
        size="sm"
        className="mt-2 bg-amber-100 border-amber-300 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/30 dark:border-amber-700 dark:text-amber-300 dark:hover:bg-amber-900/50"
        onClick={() => window.location.href = "/subscription"}
      >
        <CheckCircle className="h-4 w-4 mr-2" />
        Reactivate Subscription
      </Button>
    </Alert>
  );
};

export default CancellationAlert;
