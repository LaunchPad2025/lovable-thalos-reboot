
import React from 'react';
import SubscriptionDetails from '@/components/subscription/SubscriptionDetails';
import { Timer } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const SubscriptionSettings = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-lg font-medium">Subscription Management</h3>
          <p className="text-sm text-gray-500">
            View and manage your current subscription plan.
          </p>
        </div>
        <Badge variant="outline" className="bg-purple-900/30 text-purple-300 border-purple-800">
          <Timer className="h-3 w-3 mr-1" />
          Coming Soon
        </Badge>
      </div>
      
      <div className="opacity-75 filter grayscale">
        <SubscriptionDetails />
      </div>
    </div>
  );
};

export default SubscriptionSettings;
