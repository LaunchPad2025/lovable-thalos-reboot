
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, Shield } from 'lucide-react';

interface SubscriptionStatusBadgeProps {
  isActive: boolean;
  isCanceled: boolean;
  renewalDate: string;
}

const SubscriptionStatusBadge = ({ isActive, isCanceled, renewalDate }: SubscriptionStatusBadgeProps) => {
  if (isCanceled) {
    return (
      <div className="flex items-center space-x-2">
        <AlertTriangle className="h-5 w-5 text-amber-500" />
        <div>
          <p className="text-sm font-medium">Status</p>
          <p className="text-sm text-muted-foreground">
            Cancels on {renewalDate}
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex items-center space-x-2">
      <Shield className="h-5 w-5 text-green-500" />
      <div>
        <p className="text-sm font-medium">Status</p>
        <p className="text-sm text-muted-foreground">
          {isActive ? "Active" : "Inactive"}
        </p>
      </div>
    </div>
  );
};

export default SubscriptionStatusBadge;
