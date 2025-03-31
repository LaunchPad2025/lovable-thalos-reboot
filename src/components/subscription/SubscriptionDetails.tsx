
import React, { useState } from 'react';
import { useSubscription } from '@/hooks/useSubscription';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Loader2, Shield, Calendar, CheckCircle, BarChart3 } from 'lucide-react';
import { plans } from '@/data/subscriptionPlans';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatDate } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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

const SubscriptionDetails = () => {
  const { subscription, isLoading, cancelSubscription, isActive, isCanceled } = useSubscription();
  const [cancellationPending, setCancellationPending] = useState(false);
  
  const handleCancelSubscription = async () => {
    setCancellationPending(true);
    try {
      await cancelSubscription.mutateAsync();
    } finally {
      setCancellationPending(false);
    }
  };
  
  // For demo purposes, we'll use a mock subscription if none exists
  const mockSubscription = {
    plan_id: 'pro',
    status: 'active',
    current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    cancel_at_period_end: false,
    created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    analyses_remaining: 64,
    analyses_total: 100
  };
  
  const activeSub = subscription || mockSubscription;
  const currentPlan = plans.find(p => p.id === activeSub?.plan_id) || plans[1]; // Default to Pro plan
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }
  
  const renewalDate = activeSub?.current_period_end 
    ? formatDate(new Date(activeSub.current_period_end))
    : 'Unknown';
    
  const analysesUsed = activeSub?.analyses_total 
    ? activeSub.analyses_total - (activeSub.analyses_remaining || 0)
    : 36; // Mock value
    
  const analysesTotal = activeSub?.analyses_total || 100;
  const analysesRemaining = activeSub?.analyses_remaining || 64;
  const analysesPercentage = Math.round((analysesRemaining / analysesTotal) * 100);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3 pt-5">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Current Plan: {currentPlan.name}</CardTitle>
              <CardDescription>
                {isCanceled ? "Cancels at end of billing period" : "Active subscription"}
              </CardDescription>
            </div>
            <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium dark:bg-blue-900 dark:text-blue-200">
              {currentPlan.name}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="grid gap-4">
            <div className="flex flex-col space-y-1.5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Analyses Used</span>
                <span className="text-sm font-semibold">{analysesUsed} of {analysesTotal}</span>
              </div>
              <Progress value={analysesPercentage} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>{analysesRemaining} analyses remaining</span>
                <span>{analysesPercentage}%</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Renewal Date</p>
                  <p className="text-sm text-muted-foreground">{renewalDate}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <p className="text-sm text-muted-foreground">
                    {isCanceled 
                      ? "Cancels on " + renewalDate 
                      : isActive 
                        ? "Active" 
                        : "Inactive"}
                  </p>
                </div>
              </div>
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
      
      {isCanceled && (
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
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Current Plan Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {currentPlan.features
                .filter(f => f.included)
                .map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span>{feature.text}</span>
                  </li>
                ))
              }
            </ul>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Need More Analyses?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              If you're running low on analyses for this billing period, you have several options:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                <span>Upgrade to a higher plan with more monthly analyses</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                <span>Purchase additional analysis packs (contact sales)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-4 w-4 text-blue-500 mr-2 mt-0.5" />
                <span>Wait until your next billing cycle when analyses reset</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full sm:w-auto" onClick={() => window.location.href = "/subscription"}>
              Explore Upgrade Options
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SubscriptionDetails;
