
import React from 'react';
import { format } from 'date-fns';
import { useSubscription } from '@/hooks/useSubscription';
import { Loader2, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { plans } from '@/data/subscriptionPlans';

const SubscriptionDetails = () => {
  const { 
    subscription, 
    isLoading, 
    error, 
    cancelSubscription, 
    isActive,
    isCanceled
  } = useSubscription();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-3xl mx-auto my-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load subscription details. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (!subscription) {
    return (
      <div className="max-w-3xl mx-auto my-6 space-y-6">
        <Alert className="bg-amber-50 border-amber-200">
          <AlertCircle className="h-4 w-4 text-amber-500" />
          <AlertTitle>No Active Subscription</AlertTitle>
          <AlertDescription>
            You don't have an active subscription. Subscribe to a plan to access premium features.
          </AlertDescription>
        </Alert>
        <Button 
          onClick={() => navigate('/subscription')}
          className="bg-blue-600 hover:bg-blue-700"
        >
          View Subscription Plans
        </Button>
      </div>
    );
  }

  const planDetails = plans.find(p => p.id === subscription.plan_id) || {
    name: 'Custom Plan',
    description: 'Your custom subscription plan'
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMMM dd, yyyy');
    } catch (e) {
      return 'Unknown date';
    }
  };

  const handleCancelSubscription = async () => {
    if (window.confirm('Are you sure you want to cancel your subscription? You will still have access until the end of your billing period.')) {
      cancelSubscription.mutate();
    }
  };

  return (
    <Card className="max-w-3xl mx-auto my-6">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-bold">{planDetails.name} Plan</CardTitle>
            <CardDescription>{planDetails.description}</CardDescription>
          </div>
          <Badge className={
            isActive 
              ? (isCanceled ? 'bg-amber-500' : 'bg-green-500') 
              : 'bg-gray-500'
          }>
            {isActive 
              ? (isCanceled ? 'Canceling' : 'Active') 
              : subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)
            }
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Billing Period</h3>
            <p className="mt-1">
              {subscription.current_period_start && subscription.current_period_end ? (
                `${formatDate(subscription.current_period_start)} to ${formatDate(subscription.current_period_end)}`
              ) : (
                'Unknown billing period'
              )}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Status</h3>
            <p className="mt-1 flex items-center">
              {isActive ? (
                <>
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  {isCanceled ? 'Active until period end' : 'Active'}
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4 text-red-500 mr-1" />
                  {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                </>
              )}
            </p>
          </div>
        </div>

        {isCanceled && (
          <Alert className="bg-amber-50 border-amber-200">
            <AlertCircle className="h-4 w-4 text-amber-500" />
            <AlertTitle>Subscription Ending</AlertTitle>
            <AlertDescription>
              Your subscription has been canceled and will end on {formatDate(subscription.current_period_end)}. 
              You'll continue to have access until that date.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => navigate('/subscription')}
        >
          Change Plan
        </Button>
        
        {isActive && !isCanceled && (
          <Button 
            variant="destructive"
            onClick={handleCancelSubscription}
            disabled={cancelSubscription.isPending}
          >
            {cancelSubscription.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Cancel Subscription'
            )}
          </Button>
        )}
        
        {isCanceled && (
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate('/subscription')}
          >
            Renew Subscription
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default SubscriptionDetails;
