
import React from 'react';
import SubscriptionDetails from '@/components/subscription/SubscriptionDetails';
import { Timer } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import MockDataAlert from "@/components/ui/MockDataAlert";

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
              <Badge variant="simulation" className="flex items-center">
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
      
      <MockDataAlert featureName="Subscription Management" />
      
      <div className="border border-blue-500/20 rounded-lg p-4">
        <SubscriptionDetails />
      </div>
      
      <div className="mt-8">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-lg font-medium">Organization Roles & Permissions</h3>
            <p className="text-sm text-gray-500">
              Manage user roles and access permissions within your organization.
            </p>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="simulation" className="flex items-center">
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
        
        <div className="border border-blue-500/20 rounded-lg p-4">
          <div className="grid gap-4">
            <div className="rounded-md border border-blue-500/20 bg-card p-4">
              <h4 className="text-md font-medium mb-2">Available User Roles</h4>
              <dl className="space-y-4">
                <div>
                  <dt className="font-medium text-blue-400">Admin</dt>
                  <dd className="text-sm text-gray-500">Full access to all platform features, user management, and billing.</dd>
                </div>
                <div>
                  <dt className="font-medium text-blue-400">Safety Manager</dt>
                  <dd className="text-sm text-gray-500">Can manage safety tasks, view violations, and generate reports.</dd>
                </div>
                <div>
                  <dt className="font-medium text-blue-400">Contributor</dt>
                  <dd className="text-sm text-gray-500">Can report violations, complete assigned tasks, and view basic reports.</dd>
                </div>
              </dl>
            </div>
            
            <div className="text-sm text-blue-300 bg-blue-500/10 rounded-md p-3">
              <p>User roles are assigned during the invitation process. Contact your account administrator to change roles.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSettings;
