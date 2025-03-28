
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { useSubscription } from '@/hooks/useSubscription';
import { CalendarDays } from 'lucide-react';

const FreeTrial = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { subscription, isLoading } = useSubscription();
  
  const handleContactSales = () => {
    navigate('/subscription');
  };

  // If subscription is active, don't show free trial banner
  if (!isLoading && subscription?.status === 'active') {
    return null;
  }
  
  // Calculate days left in trial (default to 14 days from onboarding date)
  const onboardedDate = user?.user_metadata?.onboardedAt || user?.created_at;
  const trialEndDate = onboardedDate ? new Date(new Date(onboardedDate).getTime() + 14 * 24 * 60 * 60 * 1000) : new Date();
  const today = new Date();
  const daysLeft = Math.max(0, Math.ceil((trialEndDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
  
  return (
    <div className="bg-[#0d1117] border border-gray-800 rounded-lg p-6">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center">
          <div className="hidden md:block mr-4 bg-blue-900/30 p-2 rounded-full">
            <CalendarDays className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-white font-medium mb-1">Free Trial Mode {daysLeft > 0 && `(${daysLeft} days left)`}</h2>
            <p className="text-gray-400 text-sm">Unlock all safety compliance features by subscribing to a paid plan</p>
          </div>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white mt-4 md:mt-0" onClick={handleContactSales}>
          Upgrade Now
        </Button>
      </div>
    </div>
  );
};

export default FreeTrial;
