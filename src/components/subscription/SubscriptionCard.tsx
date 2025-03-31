
import React, { useState } from 'react';
import { 
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Calendar, Loader2 } from 'lucide-react';
import AnalysisUsage from './AnalysisUsage';
import SubscriptionStatusBadge from './SubscriptionStatusBadge';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { formatDate } from '@/lib/utils';

interface SubscriptionCardProps {
  planName: string;
  currentPeriodEnd: string;
  isCanceled: boolean;
  isActive: boolean;
  analysesUsed: number;
  analysesTotal: number;
  analysesRemaining: number;
  analysesPercentage: number;
  onCancelSubscription: () => Promise<void>;
}

const SubscriptionCard = ({
  planName,
  currentPeriodEnd,
  isCanceled,
  isActive,
  analysesUsed,
  analysesTotal,
  analysesRemaining,
  analysesPercentage,
  onCancelSubscription
}: SubscriptionCardProps) => {
  const [cancellationPending, setCancellationPending] = useState(false);
  
  const handleCancelSubscription = async () => {
    setCancellationPending(true);
    try {
      await onCancelSubscription();
    } finally {
      setCancellationPending(false);
    }
  };

  const renewalDate = formatDate(new Date(currentPeriodEnd));

  return (
    <Card>
      <CardHeader className="pb-3 pt-5">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Current Plan: {planName}</CardTitle>
            <CardDescription>
              {isCanceled ? "Cancels at end of billing period" : "Active subscription"}
            </CardDescription>
          </div>
          <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium dark:bg-blue-900 dark:text-blue-200">
            {planName}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid gap-4">
          <AnalysisUsage 
            analysesUsed={analysesUsed}
            analysesTotal={analysesTotal}
            analysesRemaining={analysesRemaining}
            analysesPercentage={analysesPercentage}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Renewal Date</p>
                <p className="text-sm text-muted-foreground">{renewalDate}</p>
              </div>
            </div>
            
            <SubscriptionStatusBadge 
              isActive={isActive} 
              isCanceled={isCanceled} 
              renewalDate={renewalDate}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button 
          variant="outline" 
          onClick={() => window.location.href = "/subscription"}
          className="sm:flex-1"
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          Manage Plan
        </Button>
        
        {!isCanceled && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="outline" 
                className="text-destructive border-destructive hover:bg-destructive/10 sm:flex-1"
              >
                Cancel Subscription
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to cancel?</AlertDialogTitle>
                <AlertDialogDescription>
                  Your subscription will remain active until the end of your current billing period on {renewalDate}.
                  After that, you'll lose access to your current plan features.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleCancelSubscription}
                  disabled={cancellationPending}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {cancellationPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {cancellationPending ? "Processing..." : "Yes, Cancel Subscription"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </CardFooter>
    </Card>
  );
};

export default SubscriptionCard;
