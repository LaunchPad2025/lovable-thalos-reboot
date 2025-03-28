
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { useSubscription } from '@/hooks/useSubscription';
import { CalendarDays } from 'lucide-react';
import { useAuthStatus } from '@/hooks/useAuthStatus';
import { plans } from '@/data/subscriptionPlans';

const FreeTrial = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { subscription } = useSubscription();
  const { isFreeTrial, trialDaysLeft, planId } = useAuthStatus();
  
  const handleUpgrade = () => {
    navigate('/subscription');
  };

  // If subscription is active (not in trial mode), don't show free trial banner
  if (!isFreeTrial) {
    return null;
  }
  
  // Get plan name
  const plan = plans.find(p => p.id === planId);
  const planName = plan?.name || 'Basic';
  
  return (
    <div className="bg-[#0d1117] border border-gray-800 rounded-lg p-6">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center">
          <div className="hidden md:block mr-4 bg-blue-900/30 p-2 rounded-full">
            <CalendarDays className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-white font-medium mb-1">
              {planName} Plan Free Trial {trialDaysLeft > 0 && `(${trialDaysLeft} days left)`}
            </h2>
            <p className="text-gray-400 text-sm">
              {trialDaysLeft > 0 
                ? `Enjoy full access to the ${planName} plan features during your trial period` 
                : "Your free trial has ended. Subscribe now to continue using all features"}
            </p>
          </div>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white mt-4 md:mt-0" onClick={handleUpgrade}>
          {trialDaysLeft > 0 ? "Upgrade Now" : "Subscribe Now"}
        </Button>
      </div>
    </div>
  );
};

export default FreeTrial;
