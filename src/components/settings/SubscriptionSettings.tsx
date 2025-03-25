
import React from 'react';
import SubscriptionDetails from '@/components/subscription/SubscriptionDetails';
import { Timer } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="info" className="bg-blue-500/20 text-blue-300 border-blue-400">
                <Timer className="h-3 w-3 mr-1" />
                Coming Soon
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Simulation Only - Coming Soon</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="opacity-90 filter-none border border-blue-500/20 rounded-lg p-4">
        <SubscriptionDetails />
      </div>
    </div>
  );
};

export default SubscriptionSettings;
