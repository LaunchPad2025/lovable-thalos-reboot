
import React from 'react';
import SubscriptionDetails from '@/components/subscription/SubscriptionDetails';

const SubscriptionSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Subscription Management</h3>
        <p className="text-sm text-gray-500">
          View and manage your current subscription plan.
        </p>
      </div>
      
      <SubscriptionDetails />
    </div>
  );
};

export default SubscriptionSettings;
