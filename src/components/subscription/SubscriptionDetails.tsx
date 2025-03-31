
import React from 'react';
import { useSubscription } from '@/hooks/useSubscription';
import { Loader2 } from 'lucide-react';
import { plans } from '@/data/subscriptionPlans';
import SubscriptionCard from './SubscriptionCard';
import CancellationAlert from './CancellationAlert';
import PlanFeatures from './PlanFeatures';
import AnalysisUpgrade from './AnalysisUpgrade';
import { formatDate } from '@/lib/utils';

const SubscriptionDetails = () => {
  const { subscription, isLoading, cancelSubscription, isActive, isCanceled } = useSubscription();
  
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
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }
  
  const activeSub = subscription || mockSubscription;
  const currentPlan = plans.find(p => p.id === activeSub?.plan_id) || plans[1]; // Default to Pro plan
  
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
      <SubscriptionCard
        planName={currentPlan.name}
        currentPeriodEnd={activeSub.current_period_end}
        isCanceled={isCanceled}
        isActive={isActive}
        analysesUsed={analysesUsed}
        analysesTotal={analysesTotal}
        analysesRemaining={analysesRemaining}
        analysesPercentage={analysesPercentage}
        onCancelSubscription={cancelSubscription.mutateAsync}
      />
      
      {isCanceled && (
        <CancellationAlert renewalDate={renewalDate} />
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PlanFeatures features={currentPlan.features} />
        <AnalysisUpgrade />
      </div>
    </div>
  );
};

export default SubscriptionDetails;
